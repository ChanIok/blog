import { createApp } from "vue";
import { createPinia } from 'pinia'

import App from "./App.vue";
import router from "./router";

import "./style/index.css";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";


const pinia = createPinia();

createApp(App).use(router).use(pinia).use(VueViewer).mount("#app");
