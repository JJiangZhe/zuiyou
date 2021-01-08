<template>
  <!--滑动 tab 标签 组件  -->
  <div class="tab-list" :class="fixed && 'fixed TopBar'">
    <div
      v-for="item in list"
      :key="item.id"
      :class="[cName, item.id === crt && 'active', isBig && 'big']"
      @click="clickItem(item.id)"
    >
      {{ item.category_name || item.title }}
    </div>
    <!-- 右侧图标 -->
    <van-icon
      v-if="icon"
      :name="icon"
      class="iconfont"
      class-prefix="icon"
      @click="setIsInput"
    />
    <!-- 右侧图片 -->
    <img
      v-if="image"
      :src="require(`@/assets/${image}.png`)"
      :style="{ width: size + 'px', height: size + 'px' }"
    />
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
    // 选中项
    crt: {
      type: Number,
      required: true
    },
    // 选中样式名称(颜色主题)
    cName: {
      type: String,
      default: "default",
      validator: (value: string) => {
        return ["default", "red"].indexOf(value) !== -1;
      }
    },
    // 右侧图标
    icon: {
      type: [String, Boolean],
      defalut: false
    },
    // 右侧图标
    image: {
      type: [String, Boolean],
      defalut: false
    },
    // 图片图标大小
    size: {
      type: Number,
      default: 24
    },
    // 选中是否变大
    isBig: {
      type: Boolean,
      default: true
    },
    // 固定顶部
    fixed: {
      type: Boolean,
      default: false
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
@import "~@/common/css/mixin.less";
.fixed {
  position: fixed;
  top: 110px;
  left: 0;
  right: 0;
  z-index: 999;
}

.tab-list {
  display: flex;
  align-items: center;

  height: 120px;
  line-height: 120px;
  width: 100%;
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

  .big {
    font-size: 44px;
  }

  .iconfont,
  img {
    margin-left: auto;
    margin-right: 20px;
  }
}

.theme-dark .tab-list div {
  color: @dark-sed-color;
}

.theme-light .tab-list div {
  color: @light-sed-color;
}

// default
.theme-dark .tab-list .default.active {
  color: @dark-title-color;
}

.theme-light .tab-list .default.active {
  color: @light-title-color;
}

// red #FE536D
.theme-dark .tab-list .red.active {
  color: @dark-red-color;
}
.theme-light .tab-list .red.active {
  color: @light-red-color;
}
</style>
