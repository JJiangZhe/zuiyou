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
    {{ meta.transition }}
    <router-view v-slot="{ Component }">
      <transition :name="meta.transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <div class="bars_placeholder" />
    <nav-bar />
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import TopBar from "@/components/TopBar.vue";
import { computed, defineComponent, reactive, toRefs } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
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

    const meta = computed(() => {
      return useRoute().meta;
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

// .right-enter-active,
// .right-leave-active,
// .left-enter-active,
// .left-leave-active {
//   will-change: transform;
//   transition: all 0.5s;
//   width: 100vw;
//   position: absolute;
// }
// .right-enter {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
// .right-leave-active {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .left-enter {
//   opacity: 0;
//   transform: translate3d(100%, 0, 0);
// }
// .left-leave-active {
//   opacity: 0;
//   transform: translate3d(-100%, 0, 0);
// }
</style>
