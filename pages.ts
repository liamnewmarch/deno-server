export interface Context {
  page: Page;
  [key: string]: any;
}

export interface PageDraft extends Route {
  context?: any;
  template(context: Context): string;
}

export interface PageFinal extends PageDraft {
  render(): string;
  url: string;
}

export type Page = PageDraft | PageFinal;

export interface PageMap {
  [url: string]: PageFinal;
}

export interface Route {
  children?: Array<Route | Page>;
  slug: string;
}

export function parsePage(page: Page | Route, basePath = "/"): PageMap {
  const pageMap: PageMap = {};
  const url = page.slug ? basePath + page.slug + "/" : basePath;
  if ("template" in page) {
    const render = () => page.template({ ...page.context, page });
    pageMap[url] = Object.assign(page, { render, url });
  }
  for (const child of page.children ?? []) {
    Object.assign(pageMap, parsePage(child, url));
  }
  return pageMap;
}
