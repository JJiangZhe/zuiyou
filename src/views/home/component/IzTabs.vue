<template>
  <div class="Tabs theme-bg">
    <div class="list" v-if="list.length">
      <div
        class="item"
        :class="{ active: item.category_value === crt }"
        :style="{
          marginTop: item.category_value === crt ? '-1px' : '0'
        }"
        v-for="item in list"
        :key="item.id"
        @click="clickItem(item.category_value)"
      >
        {{ item.category_name }}
      </div>
    </div>
    <van-icon
      v-if="icon"
      :name="icon"
      size="20"
      class="iconfont"
      class-prefix="icon"
      @click="clickIcon"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Tabs",
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
    }
  },
  emits: ["clickItem", "clickIcon"],
  setup(props, context) {
    const clickItem = (id: number) => {
      console.log("1");
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
.Tabs {
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
    overflow-x: auto;
    height: 100%;
    width: 90%;

    .item {
      position: relative;
      font-size: 36px;
      padding: 0 20px;
      white-space: nowrap;

      &.active {
        color: #149eff;
        font-size: 42px;
        font-weight: bold;
      }
    }
  }

  .icon {
    position: absolute;
    height: 100%;
    right: 20px;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
