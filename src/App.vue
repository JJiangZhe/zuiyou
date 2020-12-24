<template>
  <div id="app">
    <router-view #="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { getLocal } from "@/common/js/utils";
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
