<template>
  <div id="app" ref="appRef">
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
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const theme = getLocal("theme");
    const app = document.getElementById("app") as HTMLElement;
    app.className = theme ? theme : "theme-light";

    onMounted(async () => {
      const store = useStore();
      store.commit("initUser");
    });

    const meta = computed(() => useRoute().meta);

    return { meta };
  }
};
</script>

<style lang="less"></style>
