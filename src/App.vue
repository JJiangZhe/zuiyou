<template>
  <div id="app" ref="appRef">
    <!-- <keep-alive include="Home">
      <router-view #="{ Component }">
        <transition :name="transtion">
          <component :is="Component" />
        </transition>
      </router-view>
    </keep-alive> -->

    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { getLocal } from "@/utils/index";
// import { userInfo } from "./api/user";
export default {
  setup() {
    const theme = getLocal("theme");
    const app = document.getElementById("app") as HTMLElement;
    app.className = theme ? theme : "theme-light";

    return {};
  }
};
</script>

<style lang="less"></style>
