<template>
  <div class="Topic">
    <iz-top-bar
      fixed
      :list="bars"
      :crt="activeBarId"
      center
      icon="sousuo"
      @clickItem="barItemClick"
    />
    <div class="bars_placeholder" />

    <router-view v-slot="{ Component }">
      <transition :name="meta.transition">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view> -->

    <div class="bars_placeholder" />
    <iz-nav-bar />
  </div>
</template>

<script lang="ts">
import IzNavBar from "@/components/IzNavBar.vue";
import IzTopBar from "@/components/IzTopBar.vue";
import { computed, defineComponent, onActivated, reactive, toRefs } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "Topic",
  components: {
    IzNavBar,
    IzTopBar
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

    const meta = computed(() => {
      return useRoute().meta;
    });

    topBar.activeBarId = useRoute().name === "Tab1" ? 1 : 2;

    onActivated(() => {
      topBar.barItemClick(topBar.activeBarId);
    });

    return {
      ...toRefs(topBar),
      meta
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
