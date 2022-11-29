import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "@/views/WelcomePage.vue";
import Layout from "@/views/Layout.vue";
import Writings from "@/views/Writings.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/",
    children: [
      { path: "", component: WelcomePage },
      { path: "writings", component: Writings },
    ],
  },
];

const router = createRouter({
  // history: VueRouter.createWebHashHistory(),
  history: createWebHistory(),
  routes,
});

export default router;
