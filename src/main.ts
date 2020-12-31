import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/common/css/base.less";
import "@/assets/icon/iconfont.css";

const app = createApp(App);

import { Icon, Switch, Image as VanImage, Lazyload, ActionSheet } from "vant";

app
  .use(Icon)
  .use(Switch)
  .use(VanImage)
  .use(Lazyload)
  .use(ActionSheet);

app
  .use(store)
  .use(router)
  .mount("#app");
