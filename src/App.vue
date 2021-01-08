<template>
  <div id="app" ref="appRef">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { getLocal } from "@/utils/index";
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const theme = getLocal("theme");
    const app = document.getElementById("app") as HTMLElement;
    app.className = theme ? theme : "theme-light";

    onMounted(async () => {
      const store = useStore();
      store.commit("initUser");
    });

    return {};
  }
};
</script>

<style lang="less"></style>
