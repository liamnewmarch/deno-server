import { URLHandler } from "./mod.ts";
import { parsePage, Route } from "./pages.ts";
import { guessMimeType } from "./mime-types.ts";

export function contentRoute({ entry }: { entry: Route }): URLHandler {
  const pages = parsePage(entry);
  return async ({ params = {} }) => {
    try {
      if (!(params.path in pages)) return { status: 404 };
      return {
        body: await pages[params.path].render(),
        headers: new Headers({
          "Content-Type": "text/html; charset=utf-8",
        }),
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return { status: 404 };
    }
  };
}

export function staticRoute(staticPath: string): URLHandler {
  return async ({ params = {} }) => {
    try {
      return {
        body: await Deno.readTextFile(`${staticPath}/${params.path}`),
        headers: new Headers({
          "Content-Type": guessMimeType(params.path),
        }),
        status: 200,
      };
    } catch (error) {
      console.error(error);
      return { status: 404 };
    }
  };
}
