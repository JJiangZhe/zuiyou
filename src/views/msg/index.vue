<template>
  <div class="Msg">
    <iz-tabs :list="bars" :crt="activeBarId" @clickItem="barItemClick" />
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
    <iz-nav-bar />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import IzNavBar from "@/components/IzNavBar/index.vue";
import IzTabs from "@/components/IzTabs/index.vue";
import router from "@/router";
export default defineComponent({
  components: { IzNavBar, IzTabs },
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
        item && router.push({ path: "/msg/" + item.url });
      }
    });

    const meta = computed(() => {
      return useRoute().meta;
    });

    topBar.activeBarId = useRoute().name === "Caution" ? 1 : 2;

    onActivated(() => {
      topBar.barItemClick(topBar.activeBarId);
    });

    return { ...toRefs(topBar), meta };
  }
});
</script>
