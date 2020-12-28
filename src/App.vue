<template>
  <div id="app" ref="appRef">
    <router-view #="{ Component }">
      <keep-alive include="Home">
        <transition mode="out-in">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { getLocal } from "@/utils/index";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
export default {
  setup() {
    onBeforeRouteUpdate((to, from, next) => {
      console.log(to, from, next);
    });

    const theme = getLocal("theme");
    const app = document.getElementById("app") as HTMLElement;
    app.className = theme ? theme : "theme-light";

    const meta = useRoute().meta;

    return {
      meta
    };
  }
};
</script>

<style lang="less"></style>
