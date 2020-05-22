import template from "../templates/index.ts";
import PostsRoute, { posts } from "./posts.ts";

export default {
  children: [
    PostsRoute,
  ],
  context: {
    title: "Hello, world",
    subtitle: "This is an example blog!",
    heading: "Posts",
    posts,
  },
  slug: "",
  template,
};
