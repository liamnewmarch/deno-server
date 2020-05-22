import { Context, PageFinal } from "../src/pages.ts";
import base from "./base.ts";

interface IndexContext extends Context {
  subtitle: string;
  title: string;
  heading: string;
  posts: PageFinal[];
}

interface PostContext extends Context {
  title: string;
}

function link({ context: { title }, url }: PageFinal): string {
  return `
    <li>
      <a href="${url}">${title}</a>
    </li>
  `;
}

export default ({ subtitle, title, heading, posts, page }: IndexContext) => {
  const body = `
    <main>
      <h1>${title}</h1>
      <p>${subtitle}</p>
      <h2>${heading}</h2>
      <ul>
        ${posts.map(link).join("")}
      </ul>
    </main>
  `;
  return base({ body, page, title });
};
