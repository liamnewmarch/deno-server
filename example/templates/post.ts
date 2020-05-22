import { Context } from "../../pages.ts";
import base from "./base.ts";

interface PostContext extends Context {
  date: string;
  content: string;
}

export default ({ content, date, page, title }: PostContext) => {
  const body = `
    <article>
      <header>
        <h1>${title}</h1>
        <p>${date}</p>
      </header>
      ${content}
    </article>
  `;
  return base({ body, page, title });
};
