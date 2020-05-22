import marked from "https://unpkg.com/marked@1.0.0/lib/marked.esm.js";
import { Page } from "../src/pages.ts";
import template from "../templates/post.ts";

async function getPost(path: string): Promise<string> {
  const markdown = await Deno.readTextFile(`./example/content/posts/${path}.md`);
  return marked(markdown, null, null);
}

export const posts: Page[] = [
  {
    context: {
      content: await getPost("first-post"),
      date: "1970-01-01",
      title: "First post",
    },
    template,
    slug: "first-post",
  },
];

export default {
  children: posts,
  slug: "posts",
};
