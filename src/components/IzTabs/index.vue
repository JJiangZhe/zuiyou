<template>
  <div class="IzTabs theme-bg">
    <div class="list">
      <div
        class="item"
        :class="{ active: item.id === crt }"
        v-for="item in list"
        :key="item.id"
        @click="clickItem(item.id)"
      >
        {{ item.title }}
      </div>
    </div>
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
import { defineComponent } from "vue";
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
      type: [String, Number],
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
    }
  },
  emits: ["clickItem", "clickIcon"],
  setup(props, context) {
    const clickItem = (id: number) => {
      context.emit("clickItem", id);
    };

    const clickIcon = () => {
      context.emit("clickIcon");
    };

    return { clickItem, clickIcon };
  }
});
</script>

<style lang="less" scoped>
.IzTabs {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 120px;

  .list {
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
