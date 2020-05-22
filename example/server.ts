import { URLHandlerMap, listen } from "./src/mod.ts";
import { contentRoute, staticRoute } from "./src/helpers.ts";
import IndexRoute from "./content/index.ts";

const hostname: string = Deno.env.get("HOST") ?? "0.0.0.0";
const port: number = Number.parseInt(Deno.env.get("PORT") ?? "3000");

const handlers: URLHandlerMap = new Map();

handlers.set(/^\/static\/(?<path>.+)$/, staticRoute("example/static"));
handlers.set(/^(?<path>\/.*)$/, contentRoute({ entry: IndexRoute }));

listen({ handlers, hostname, port });
