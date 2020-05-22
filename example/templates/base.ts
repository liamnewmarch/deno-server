import { Context } from "../../pages.ts";

interface BaseContext extends Context {
  body: string;
  head?: string;
  title: string;
}

export default ({ body, head = "", title }: BaseContext) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link href="/static/style.css" rel="stylesheet">
        ${head}
      </head>
      <body>
        ${body}
      </body>
    </html>
  `;
};
