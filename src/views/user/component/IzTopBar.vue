<template>
  <!-- 顶部导航栏组件 -->
  <div class="TopBar theme-bg" :class="Style">
    <van-icon
      v-if="icon"
      :name="icon"
      :color="iconColor"
      size="24"
      class="iconfont"
      class-prefix="icon"
      @click="clickIcon"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "TopBar",
  props: {
    // 右边icon
    icon: {
      type: [String, Boolean],
      default: false
    },
    // icon颜色
    iconColor: {
      type: String,
      defalut: ""
    },
    // 距离顶部
    scrollTop: {
      type: Number,
      default: -1
    }
  },
  emits: ["clickIcon"],
  setup(props, context) {
    const clickIcon = () => {
      context.emit("clickIcon");
    };

    const Style = computed(() => {
      if (props.scrollTop === -1) return;
      return props.scrollTop > 80 ? "" : "bg0";
    });

    return { clickIcon, Style };
  }
});
</script>

<style lang="less" scoped>
@import "~@/common/css/mixin.less";
.TopBar {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 120px;

  .icon {
    position: absolute;
    height: 100%;
    width: 150px;
    right: 0;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
