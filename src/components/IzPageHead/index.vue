<template>
  <div class="default">
    <div class="wrap">
      <van-icon
        :size="size"
        :name="icon"
        class="iconfont"
        class-prefix="icon"
        @click="back"
      />
      <span class="submit" v-if="title" @click="onClick">{{ title }}</span>
    </div>
    <div class="center" v-if="center">{{ center }}</div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
  name: "IzPageHead",
  props: {
    icon: String,
    size: {
      type: Number,
      default: 32
    },
    title: {
      type: [String, Boolean],
      default: false
    },
    center: {
      type: [String, Boolean],
      default: false
    }
  },
  emits: ["click"],
  setup(props, context) {
    const back = () => {
      router.back();
    };

    const onClick = () => {
      context.emit("click");
    };

    return { back, onClick };
  }
});
</script>
<style lang="less" scoped>
.default {
  position: relative;
  height: 100px;
}

.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 20px;

  .iconfont {
    font-weight: bold;
    z-index: 99;
  }

  .submit {
    padding: 10px 30px;
    font-size: 22px;
    color: #ffffff;
    border-radius: 30px;
    background-color: #8aceff;
  }
}

.center {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 40px;
}
</style>
