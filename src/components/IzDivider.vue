<template>
  <!-- 分割线组件 -->
  <div class="IzDivider" :style="{ height: height + 'px' }"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IzDivider",
  props: {
    height: { type: Number, default: 9 }
  }
});
</script>

<style lang="less" scoped>
.IzDivider {
  width: 100%;
}
</style>
