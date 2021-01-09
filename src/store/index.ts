import { userInfo } from "@/api/user";
import { getLocal, removeLocal, setLocal } from "@/utils";
import { createStore } from "vuex";
import router from "@/router";

export default createStore({
  state: {
    user: false || {},
    token: "",
    topic: {}
  },
  mutations: {
    // 初始化用户
    initUser(state) {
      const token = getLocal("token");
      const user = getLocal("user") as string;
      state.token = token as string;
      state.user = JSON.parse(user);
      if (!token || user) return;
      userInfo().then(res => {
        state.user = res.data;
        setLocal("user", JSON.stringify(res.data));
        router.back();
      });
    },
    // 设置token
    setToken(state, token) {
      state.token = token;
      setLocal("token", token);
    },
    setTopic(state, topic) {
      state.topic = topic;
    },
    // 退出登陆
    logout(state) {
      state.user = false;
      state.token = "";
      removeLocal("token");
      removeLocal("user");
      router.push({
        path: "/user",
        query: {
          init: 1
        }
      });
    }
  },
  actions: {
    login({ commit }, value) {
      commit("setToken", value);
      commit("initUser");
    }
  },
  modules: {}
});
