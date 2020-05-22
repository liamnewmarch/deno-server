import {
  serve,
  Server,
  ServerRequest,
  Response,
} from "https://deno.land/std@0.50.0/http/server.ts";

import {
  blue,
  green,
  red,
  yellow,
  getColorEnabled,
} from "https://deno.land/std@0.50.0/fmt/colors.ts";

type ColorMap = Map<number, Function>;

const colorMap: ColorMap = new Map([
  [100, blue],
  [200, green],
  [300, yellow],
  [400, red],
  [500, red],
]);

function formatStatus({ status = 0 }: Response): string {
  const stringStatus = String(status);
  if (!getColorEnabled()) return stringStatus;
  for (const [range, color] of colorMap) {
    if (status >= range && status < range + 100) {
      return color(stringStatus);
    }
  }
  return stringStatus;
}

export type URLHandler = (request: Request) => Response | Promise<Response>;
export type URLHandlerMap = Map<RegExp, URLHandler>;

export interface Request extends ServerRequest {
  params?: {
    [key: string]: string;
  };
}

export function getHandlerOr404(
  handlers: URLHandlerMap,
  request: Request,
): Response | Promise<Response> {
  for (const [regex, fn] of handlers) {
    const match = request.url.match(regex);
    if (match) {
      request.params = match.groups ?? {};
      return fn(request);
    }
  }
  return { status: 404 };
}

export interface ListenOptions extends Deno.ListenOptions {
  handlers: URLHandlerMap;
}

export async function listen({ handlers, ...options }: ListenOptions) {
  const app: Server = serve(options);

  console.log(green("Serving"), `http://localhost:${options.port}`);

  for await (const request of app) {
    const response: Response = await getHandlerOr404(handlers, request);
    console.log(formatStatus(response), request.method, request.url);
    request.respond(response);
  }
}
