<template>
  <div class="Divider" :style="{ height: height + 'px' }"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Divider",
  props: {
    height: { type: Number, default: 0 }
  }
});
</script>

<style lang="less" scoped>
.Divider {
  width: 100%;
}
</style>
