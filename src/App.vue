<template>
  <div id="app" ref="appRef">
    <router-view #="{ Component }">
      <keep-alive include="Home">
        <transition :name="transtion">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { getLocal } from "@/utils/index";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  setup() {
    const theme = getLocal("theme");
    const app = document.getElementById("app") as HTMLElement;
    app.className = theme ? theme : "theme-light";

    // 无用
    const transtion = computed(() => {
      // console.log(useRoute().meta);
      // console.log(useRoute().meta.transtion);
      return useRoute().meta.transtion;
    });

    return {
      transtion
    };
  }
};
</script>

<style lang="less"></style>
