<template>
  <div class="Topic">
    <top-bar
      fixed
      :list="bars"
      :crt="activeBarId"
      center
      icon="sousuo"
      @clickItem="barItemClick"
    />
    <div class="bars_placeholder" />
    <router-view></router-view>
    <div class="bars_placeholder" />
    <nav-bar />
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import TopBar from "@/components/TopBar.vue";
import { defineComponent, reactive, toRefs, toRaw } from "vue";
import router from "@/router";
export default defineComponent({
  name: "Topic",
  components: {
    NavBar,
    TopBar
  },
  setup() {
    // 顶部导航
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
        router.push({ path: "/topic/tab" + id });
      }
    });

    return {
      ...toRefs(topBar)
    };
  }
});
</script>

<style lang="less" scoped>
.pf-wrap {
  margin: 10px 40px 30px 40px;

  img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    overflow: hidden;
  }
}
</style>
