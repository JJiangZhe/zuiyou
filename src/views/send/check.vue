<template>
  <div class="check theme-bg">
    <iz-page-head icon="guanbi" center="选择话题" />
    <iz-search
      v-model="keyword"
      focusPlace="搜索话题"
      placeholder="搜索你要找的话题"
    />
    <side-bar :list="list" v-model="crt" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive } from "vue";
import { chooseTopic } from "@/api/topic";
import { Toast } from "vant";
import IzPageHead from "@/components/IzPageHead/index.vue";
import IzSearch from "@/components/IzSearch/index.vue";
import SideBar from "./component/SideBar.vue";
export default defineComponent({
  name: "check",
  components: { IzPageHead, IzSearch, SideBar },
  setup() {
    const state = reactive({
      keyword: "",
      list: [],
      crt: 0
    });

    const getTopics = async () => {
      Toast.loading();
      const { data: topics } = await chooseTopic();
      Toast.clear();
      state.list = topics;
      state.crt = topics[0]?.id;
    };

    onMounted(() => {
      getTopics();
    });

    return { ...toRefs(state) };
  }
});
</script>

<style lang="less" scoped>
.check {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
}
</style>
