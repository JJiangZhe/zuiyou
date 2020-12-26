<template>
  <div
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend.stop="touchEnd"
    :style="refStyle"
  >
    <div class="prompt">{{ status }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "PullRefresh",
  emits: ["reload"],
  setup(props, context) {
    // 起始点
    const startY = ref(0);
    // 距离顶部高度
    const scrollTop = ref(0);
    // 状态
    const status = ref("下拉即可刷新");
    const touchStart = (e: TouchEvent) => {
      if (document.body.scrollTop) return;
      startY.value = e.targetTouches[0].clientY;
    };

    const touchMove = (e: TouchEvent) => {
      if (document.body.scrollTop || startY.value > e.targetTouches[0].clientY)
        return;
      // 距离顶部的距离
      const clientY = e.touches[0].clientY;
      // clientY - startY(起始点) = 实际下拉的高度
      scrollTop.value =
        clientY - startY.value > 80 ? 80 : clientY - startY.value;
      status.value = scrollTop.value === 80 ? "释放即可刷新" : "下拉即可刷新";
    };

    const touchEnd = () => {
      if (document.body.scrollTop) return;
      context.emit("reload");
    };

    const reload = () => {
      scrollTop.value = 0;
    };

    const setScrollTop = () => {
      scrollTop.value = 80;
      status.value = "刷新中";
    };

    const refStyle = computed(() => {
      return {
        transform: `translate3d(0px,${scrollTop.value}px,0px)`,
        transition: "all .2s",
        position: "relative"
      };
    });

    return {
      startY,
      scrollTop,
      touchStart,
      touchMove,
      touchEnd,
      refStyle,
      reload,
      setScrollTop,
      status
    };
  }
});
</script>

<style lang="less" scoped>
@import "~@/common/css/mixin.less";
.prompt {
  position: absolute;
  transform: translateY(-100%);
  left: 0;
  right: 0;
  height: 120px;
  font-size: 32px;
  line-height: 120px;
  text-align: center;
}

.theme-dark {
  .prompt {
    color: @dark-sed-color;
  }
}

.theme-light {
  .prompt {
    color: @light-sed-color;
  }
}
</style>
