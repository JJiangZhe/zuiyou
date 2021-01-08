<template>
  <div class="IzEmpty">
    <van-image
      :width="size"
      :height="size"
      fit="cover"
      :src="require('./imgs/' + src + '.png')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IzEmpty",
  props: {
    src: {
      type: String,
      default: "data"
    },
    size: {
      type: Number,
      default: 120
    }
  }
});
</script>

<style lang="less" scoped>
.IzEmpty {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;

  .van-image {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
