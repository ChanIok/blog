import { createRouter, createWebHashHistory } from "vue-router";
import WelcomePage from "@/views/WelcomePage.vue";
import Layout from "@/views/Layout.vue";
import Writings from "@/views/Writings.vue";
import Comments from "@/views/Comments.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/",
    children: [
      { path: "", component: WelcomePage },
      { path: "writings/:txId?", component: Writings },
      { path: "comments", component: Comments },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
