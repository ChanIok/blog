import { marked } from "marked";

const render = new marked.Renderer();
marked.setOptions({
  renderer: render,
  gfm: true,
  pedantic: false,
});
export const getMarkedContent = (value: string) => {
  return marked(value);
};
