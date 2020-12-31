<template>
  <!-- 上拉刷新事件 -->
  <div
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend.stop="touchEnd"
    :style="refStyle"
  >
    <!-- 提示 -->
    <div v-if="prompt" class="prompt">{{ status }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "PullRefresh",
  emits: ["reload"],
  props: {
    // 是否显示提示
    prompt: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    // 起始点
    const startY = ref(0);
    // 距离顶部高度
    const scrollTop = ref(0);
    // 提示状态
    const status = ref("下拉即可刷新");

    // 加载完毕 父组件请求完接口调用
    const reload = () => {
      scrollTop.value = 0;
    };

    // 设置动画 父组件请求加载中调用
    const setScrollTop = () => {
      scrollTop.value = 80;
      status.value = "刷新中";
    };

    const touchStart = (e: TouchEvent) => {
      // 有滚动条高度时阻止
      if (document.body.scrollTop) return;
      // 设置起始点为点击坐标
      startY.value = e.targetTouches[0].clientY;
    };

    const touchMove = (e: TouchEvent) => {
      // 有滚动条高度时 || 起始点 > 当前坐标 (正常往下浏览) return
      if (document.body.scrollTop || startY.value > e.targetTouches[0].clientY)
        return reload();
      // 距离顶部的距离
      const clientY = e.touches[0].clientY;
      // clientY - startY(起始点) = 实际下拉的高度
      scrollTop.value =
        clientY - startY.value > 80 ? 80 : clientY - startY.value;
      status.value = scrollTop.value === 80 ? "释放即可刷新" : "下拉即可刷新";
    };

    const touchEnd = () => {
      // 有滚动条高度时 || 滑动高度小于80 return
      if (document.body.scrollTop || scrollTop.value < 80) return reload();
      // 发送加载事件
      context.emit("reload");
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
  z-index: -9;
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
