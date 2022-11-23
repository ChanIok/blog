import * as VueRouter from "vue-router";
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

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
