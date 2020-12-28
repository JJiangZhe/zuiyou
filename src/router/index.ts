import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// meta.id （1,2,3,4） form > to 表示前进 反之后退
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      id: 1
    },
    component: () => import("@/views/home/index.vue")
  },
  {
    path: "/topic",
    name: "Topic",
    meta: {
      id: 2
    },
    redirect: "/topic/tab1",
    component: () => import("@/views/topic/index.vue"),
    children: [
      {
        path: "tab1",
        name: "Tab1",
        meta: {
          transition: "slide-right"
        },
        component: () => import("@/views/topic/tab1.vue")
      },
      {
        path: "tab2",
        name: "Tab2",
        meta: {
          transition: "slide-left"
        },
        component: () => import("@/views/topic/tab2.vue")
      }
    ]
  },
  {
    path: "/msg",
    name: "Msg",
    meta: {
      id: 3
    },
    component: () => import("@/views/msg/index.vue")
  },
  {
    path: "/user",
    name: "User",
    meta: {
      id: 4
    },
    component: () => import("@/views/user/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
