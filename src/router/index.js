import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../layout/login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/VR",
    name: "VR",
    component: () => import("../views/VR.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../views/create.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/test.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
