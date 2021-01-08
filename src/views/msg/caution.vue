<template>
  <div>
    <iz-grid :list="gridList" :size="30" />
    <iz-divider />
    <iz-nologin msg="登陆后才能查看消息提醒哦~" />
  </div>
</template>

<script lang="ts">
import IzDivider from "@/components/IzDivider/index.vue";
import IzGrid from "@/components/IzGrid/index.vue";
import IzNologin from "@/components/IzNologin/index.vue";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  components: { IzGrid, IzDivider, IzNologin },
  name: "Caution",
  setup() {
    const grids = reactive({
      gridList: [
        {
          id: 1,
          image: "tongzhi",
          title: "小右通知"
        },
        {
          id: 2,
          image: "xiaoxi",
          title: "收到的@"
        },
        {
          id: 3,
          image: "fans",
          title: "新增粉丝"
        },
        {
          id: 4,
          image: "shenqing",
          title: "好友请求"
        }
      ]
    });
    return { ...toRefs(grids) };
  }
});
</script>
