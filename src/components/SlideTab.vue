<template>
  <!--滑动 tab 标签 组件  -->
  <div class="tab-list">
    <div
      v-for="item in list"
      :key="item.id"
      :class="{ active: item.id === crt }"
      @click="clickItem(item.id)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SlideTab",
  props: {
    list: {
      type: Array,
      required: true
    },
    crt: {
      type: Number,
      required: true
    }
  },
  emits: ["clickItem"],
  setup(props, context) {
    const clickItem = (id: number) => {
      context.emit("clickItem", id);
    };

    return { clickItem };
  }
});
</script>

<style lang="less" scoped>
@import "../common/css/mixin.less";
.tab-list {
  display: flex;
  align-items: center;

  height: 120px;
  line-height: 120px;
  overflow-x: auto;
  white-space: nowrap;

  div {
    margin: 0 40px;

    &:last-child {
      padding-right: 40px;
    }

    &:not(.active) {
      font-family: "PingFangfi";
    }
  }

  .active {
    font-size: 44px;
  }
}

.theme-dark .tab-list div {
  color: @dark-sed-color;
}

.theme-dark .tab-list .active {
  color: @dark-title-color;
}

.theme-light .tab-list div {
  color: @light-sed-color;
}

.theme-light .tab-list .active {
  color: @light-title-color;
}
</style>
