import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// highlightjs
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

createApp(App).use(VMdPreview).use(router).mount("#app");
