<template>
  <button class="btn-color" :style="style" @click="btnClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "IzButton",
  emits: ["click"],
  props: {
    radius: Number,
    height: Number
  },
  setup(props, context) {
    const style = computed(() => {
      return {
        borderRadius: (props.radius || 50) + "px",
        height: (props.height || 36) + "px"
      };
    });

    const btnClick = () => {
      context.emit("click");
    };
    return { btnClick, style };
  }
});
</script>

<style lang="less" scoped>
button {
  width: 100%;
  height: 80px;
  font-family: "PingFangfi";
}
</style>
