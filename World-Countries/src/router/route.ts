import { createRouter, createWebHistory } from "vue-router";

import home from "../components/Content.vue";
import detail from "../components/Details.vue";

const routes = [
  { path: "/", component: home, name: "home" },
  { path: "/detail/:id", component: detail, name: "detail" },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
