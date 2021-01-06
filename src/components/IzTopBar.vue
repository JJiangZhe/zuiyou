<template>
  <!-- 顶部导航栏组件 -->
  <div class="TopBar" :class="[fixed && 'fixed', Style]">
    <div class="isCenter" v-show="scrollTop > 100">
      <slot name="center" />
    </div>
    <!-- isDefault 数量多可滑动  isCenter 数量少居中  isPrimary 点击颜色蓝色 -->
    <div
      v-if="list.length"
      :class="{ isCenter: center, isDefault: !center, isPrimary: !icon }"
      :style="{ width: !center && icon && '84%' }"
    >
      <div
        class="item"
        :class="{ active: item.id === crt }"
        :style="{ marginTop: !center && item.id === crt ? '-1px' : '0' }"
        v-for="item in list"
        :key="item.id"
        @click="clickItem(item.id)"
      >
        {{ item.category_name || item.title }}
      </div>
    </div>
    <van-icon
      v-if="icon"
      :name="icon"
      :color="iconColor"
      size="24"
      class="iconfont"
      class-prefix="icon"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "TopBar",
  props: {
    // 数据
    list: {
      type: Array,
      default: () => []
    },
    // 点击值
    crt: {
      type: Number,
      default: 1
    },
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
    // 是否居中
    center: {
      type: Boolean,
      default: false
    },
    // 是否固定顶部
    fixed: {
      type: Boolean,
      default: false
    },
    // 距离顶部 变色
    scrollTop: {
      type: Number,
      default: -1
    }
  },
  emits: ["clickItem"],
  setup(props, context) {
    const clickItem = (id: number) => {
      context.emit("clickItem", id);
    };

    const Style = computed(() => {
      if (props.scrollTop === -1) return;
      return props.scrollTop > 100 ? "" : "bg0";
    });

    return { clickItem, Style };
  }
});
</script>

<style lang="less" scoped>
@import "~@/common/css/mixin.less";
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.TopBar {
  z-index: 999;

  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 120px;

  .isDefault {
    display: flex;
    align-items: center;
    overflow-x: auto;
    height: 100%;
    width: 100%;

    .item {
      position: relative;
      font-size: 42px;
      padding: 0 20px;
      white-space: nowrap;

      &.active {
        color: #149eff;
        font-size: 50px;
        font-weight: bold;
      }
    }
  }

  .isCenter {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;
    font-size: 50px;

    .item {
      position: relative;
      margin: 0 60px;
      font-size: 50px;

      &.active {
        color: #159efc;
      }
    }

    .active::after {
      content: "";
      position: absolute;
      width: 30px;
      height: 10px;

      left: 50%;
      bottom: -25px;
      border-radius: 20%;

      transform: translateX(-50%);
      background-color: #159efc;
    }

    .item:nth-child(2).active {
      color: #ac3c4f;

      &::after {
        background-color: #ac3c4f;
      }
    }
  }

  .isPrimary {
    .item.active {
      color: #149eff !important;

      &::after {
        background-color: #149eff !important;
      }
    }
  }

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
