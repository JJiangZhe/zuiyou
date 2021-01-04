<template>
  <div>
    <van-icon
      name="guanbi"
      class="iconfont"
      class-prefix="icon"
      @click="back"
    />
    <span @click="onClick">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
  name: "IzPageHead",
  props: {
    title: String
  },
  emits: ["click"],
  setup(props, context) {
    const back = () => {
      router.back();
    };

    const onClick = () => {
      context.emit("click");
    };

    return { back, onClick };
  }
});
</script>
<style lang="less" scoped>
div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 20px;

  .iconfont {
    font-weight: bold;
    font-size: 32px;
  }

  span {
    padding: 10px 30px;
    font-size: 22px;
    color: #ffffff;
    border-radius: 30px;
    background-color: #8aceff;
  }
}
</style>
