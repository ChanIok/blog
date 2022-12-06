import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";

createApp(App).use(router).use(VueViewer).mount("#app");
