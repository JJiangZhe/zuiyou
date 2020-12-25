<template>
  <!-- 标题组件 -->
  <div>{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IzTitle",
  props: {
    title: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="less" scoped>
@import "../common/css/mixin.less";
div {
  padding: 30px 40px;
  font-weight: bold;
  font-size: 42px;
}

.theme-dark div {
  color: @dark-title-color;
}

.theme-light div {
  color: @light-title-color;
}
</style>
