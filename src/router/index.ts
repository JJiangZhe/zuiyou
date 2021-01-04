// import { getLocal } from "@/utils";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// import { Toast } from "vant";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      id: 1,
      transition: ""
    },
    component: () => import("@/views/home/index.vue")
  },
  {
    path: "/topic",
    name: "Topic",
    meta: {
      id: 2,
      transition: ""
    },
    redirect: "/topic/tab1",
    component: () => import("@/views/topic/index.vue"),
    children: [
      {
        path: "tab1",
        name: "Tab1",
        meta: {
          id: 5,
          transition: "slide-right"
        },
        component: () => import("@/views/topic/tab1.vue")
      },
      {
        path: "tab2",
        name: "Tab2",
        meta: {
          id: 6,
          transition: "slide-left"
        },
        component: () => import("@/views/topic/tab2.vue")
      }
    ]
  },
  {
    path: "/msg",
    name: "Msg",
    redirect: "caution",
    meta: {
      id: 3,
      transition: ""
    },
    component: () => import("@/views/msg/index.vue"),
    children: [
      {
        path: "caution",
        name: "Caution",
        meta: {
          id: 6,
          transition: "slide-right"
        },
        component: () => import("@/views/msg/caution.vue")
      },
      {
        path: "private",
        name: "Private",
        meta: {
          id: 7,
          transition: "slide-left"
        },
        component: () => import("@/views/msg/private.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    meta: {
      id: 4,
      transition: ""
    },
    component: () => import("@/views/user/index.vue")
  },
  {
    path: "/send",
    name: "Send",
    meta: {
      login: true
    },
    component: () => import("@/views/send/index.vue")
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // if (to.meta.login) {
  //   const token = getLocal("token");
  //   if (!token) {
  //     // router.push("/login");
  //     Toast("请先登陆");
  //     return;
  //   }
  // }

  // 暂时无用
  // const toId = to.meta.id;
  // const fromId = from.meta.id;
  //  1 2 3 4
  // if (toId > fromId) {
  //   to.meta.transition = "slide-left";
  // } else {
  //   to.meta.transition = "slide-right";
  // }
  next();
});

export default router;
