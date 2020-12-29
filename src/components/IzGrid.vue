<template>
  <div>
    <div class="title" v-if="title">{{ title }}</div>
    <divider v-if="title" :height="1" />
    <div class="grid-list">
      <div
        class="grid-item"
        v-for="item in list"
        :key="item.id"
        :style="{ width: 100 / column + '%' }"
        @click="click(item)"
      >
        <img
          v-if="item.image"
          :src="require(`@/assets/${item.image}.png`)"
          :style="{ width: size + 'px', height: size + 'px' }"
        />
        <van-icon
          v-if="item.icon"
          :name="item.icon"
          :color="item.color"
          class="iconfont"
          class-prefix="icon"
          :style="{ fontSize: size + 'px' }"
        />
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Divider from "./Divider.vue";
export default defineComponent({
  name: "IzGrid",
  components: { Divider },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    title: {
      type: String
    },
    column: {
      type: Number,
      default: 4
    },
    size: {
      type: Number,
      default: 24
    }
  },
  emits: ["click"],
  setup(props, context) {
    const click = (item: object) => {
      context.emit("click", item);
    };
    return { click };
  }
});
</script>

<style lang="less" scoped>
.title {
  font-weight: bold;
  padding: 30px;
}

.grid-list {
  display: flex;
  flex-wrap: wrap;

  .grid-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0;

    span {
      font-size: 12px;
      margin-top: 20px;
    }

    .iconfont {
      font-weight: bold;
    }
  }
}
</style>
