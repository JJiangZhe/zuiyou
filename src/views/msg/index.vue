<template>
  <div class="Msg">
    <top-bar
      fixed
      center
      :list="bars"
      :crt="activeBarId"
      @clickItem="barItemClick"
    />
    <!-- 占位符 -->
    <div class="bars_placeholder" />
    <router-view v-slot="{ Component }">
      <keep-alive include="Topic1,Topic2">
        <transition :name="meta.transition">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
    <!-- 占位符 -->
    <div class="bars_placeholder" />
    <nav-bar />
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import TopBar from "@/components/TopBar.vue";
import router from "@/router";
import { computed, defineComponent, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { NavBar, TopBar },
  name: "Msg",
  setup() {
    const topBar = reactive({
      bars: [
        {
          id: 1,
          title: "提醒",
          url: "caution"
        },
        {
          id: 2,
          title: "私信",
          url: "private"
        }
      ],
      activeBarId: 1,
      barItemClick(id: number) {
        topBar.activeBarId = id;
        const item = topBar.bars.find(item => item.id === id);
        item && router.push({ path: item.url });
      }
    });

    const meta = computed(() => {
      return useRoute().meta;
    });

    topBar.activeBarId = useRoute().name === "Caution" ? 1 : 2;

    return { ...toRefs(topBar), meta };
  }
});
</script>
