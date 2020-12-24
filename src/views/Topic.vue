<template>
  <div class="Topic">
    <top-bar
      :list="bars"
      :crt="activeBarId"
      center
      icon="sousuo"
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
  name: "Topic",
  components: {
    NavBar,
    TopBar
  },
  setup() {
    const topBar = reactive({
      bars: [
        {
          id: 1,
          title: "话题"
        },
        {
          id: 2,
          title: "右友"
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
