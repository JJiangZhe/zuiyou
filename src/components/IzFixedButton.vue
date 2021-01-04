<template>
  <div class="fixed Fixed-btn" @click="onClick">
    <van-icon
      :name="icon"
      class="iconfont"
      class-prefix="icon"
      :style="style"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "IzFixedButton",
  emits: ["click"],
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String
    }
  },
  setup(props, context) {
    const onClick = () => {
      context.emit("click");
    };

    const style = computed(() => {
      return {
        color: props.color,
        fontSize: props.size + "px"
      };
    });

    return { onClick, style };
  }
});
</script>

<style lang="less" scoped>
.fixed {
  position: absolute;
  bottom: 150px;
  right: 40px;
  width: 90px;
  height: 90px;

  border-radius: 30px;

  .iconfont {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
