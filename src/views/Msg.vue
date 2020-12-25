<template>
  <div class="Msg">
    <top-bar
      fixed
      center
      :list="bars"
      :crt="activeBarId"
      @clickItem="barItemClick"
    />
    <nav-bar />
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import TopBar from "@/components/TopBar.vue";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  components: { NavBar, TopBar },
  name: "Msg",
  setup() {
    const topBar = reactive({
      bars: [
        {
          id: 1,
          title: "提醒"
        },
        {
          id: 2,
          title: "私信"
        }
      ],
      activeBarId: 1,
      barItemClick(id: number) {
        topBar.activeBarId = id;
      }
    });
    return { ...toRefs(topBar) };
  }
});
</script>
