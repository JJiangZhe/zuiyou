<template>
  <!-- 单元格组件 -->
  <div class="call-item" @click="click">
    <div class="call-left">
      <van-icon
        v-if="leftIcon"
        :name="leftIcon"
        :color="leftIconColor"
        size="20"
        class="iconfont"
        class-prefix="icon"
      />
      <span v-if="leftTit">{{ leftTit }}</span>
      <slot name="left" />
    </div>

    <div class="call-right">
      <span v-if="rightTit" class="ritht-tilte">{{ rightTit }}</span>
      <van-icon
        v-if="rightIcon"
        :name="rightIcon"
        size="20"
        class="iconfont"
        class-prefix="icon"
      />
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CellItem",
  props: {
    // 左侧图标
    leftIcon: {
      type: [String, Boolean],
      default: false
    },
    // 左侧图标颜色
    leftIconColor: {
      type: String,
      default: ""
    },
    // 左侧文字
    leftTit: {
      type: [String, Boolean],
      default: false
    },
    // 右侧图标
    rightIcon: {
      type: [String, Boolean],
      default: false
    },
    // 右侧文字
    rightTit: {
      type: [String, Boolean],
      default: false
    }
  },
  emits: ["click"],
  setup(props, context) {
    const click = () => {
      context.emit("click");
    };

    return {
      click
    };
  }
});
</script>

<style lang="less" scoped>
.call-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  margin: 0 30px;

  .call-left {
    display: flex;
    align-items: center;
    .icon {
      margin-right: 30px;
      font-weight: bold;
    }

    span {
      font-size: 34px;
    }
  }

  .call-right {
    .icon {
      font-weight: bold;
    }
  }
}
</style>
