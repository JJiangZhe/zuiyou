import { getLocal, removeLocal, setLocal } from "@/utils";
import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
    token: ""
  },
  mutations: {
    // 初始化用户
    initUser(state) {
      const token = getLocal("token");
      token && (state.token = token);
    },
    // 登陆
    login(state, data) {
      state.user = data.user;
      state.token = data.token;
      setLocal("token", data.token);
    },
    // 退出登陆
    logout(state) {
      state.user = {};
      state.token = "";
      removeLocal("token");
    }
  },
  actions: {},
  modules: {}
});
