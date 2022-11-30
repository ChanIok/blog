import { marked } from "marked";

const render = new marked.Renderer();
marked.setOptions({
  renderer: render, // 这是必填项
  gfm: true, // 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
});
export const getMarkedContent = (value: string) => {
  return marked(value);
};
