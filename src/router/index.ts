import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue")
  },
  {
    path: "/topic",
    name: "Topic",
    redirect: "/topic/tab1",
    component: () => import("@/views/topic/index.vue"),
    children: [
      {
        path: "tab1",
        name: "Tab1",
        meta: {
          transition: "left"
        },
        component: () => import("@/views/topic/tab1.vue")
      },
      {
        path: "tab2",
        name: "Tab2",
        meta: {
          transition: "right"
        },
        component: () => import("@/views/topic/tab2.vue")
      }
    ]
  },
  {
    path: "/msg",
    name: "Msg",
    component: () => import("@/views/msg/index.vue")
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/user/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
