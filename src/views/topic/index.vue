<template>
  <div class="Topic">
    <iz-tabs
      :list="bars"
      :crt="activeBarId"
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
    <div class="bars_placeholder" />
    <iz-nav-bar />
  </div>
</template>

<script lang="ts">
import IzNavBar from "@/components/IzNavBar/index.vue";
import IzTabs from "@/components/IzTabs/index.vue";
import { computed, defineComponent, onActivated, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
export default defineComponent({
  name: "Topic",
  components: {
    IzNavBar,
    IzTabs
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

/deep/ .item:nth-child(2).active {
  color: #ac3c4f !important;

  &::after {
    background-color: #ac3c4f !important;
  }
}
</style>
