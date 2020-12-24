import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/topic",
    name: "Topic",
    component: () => import("../views/Topic.vue")
  },
  {
    path: "/msg",
    name: "Msg",
    component: () => import("../views/Msg.vue")
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
