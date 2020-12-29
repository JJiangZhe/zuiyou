<template>
  <div>
    <span>{{ msg }}</span>
    <button>登陆 / 注册</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "IzNologin",
  props: {
    msg: {
      type: String,
      defalut: "登陆后才能查看哦~"
    }
  }
});
</script>

<style lang="less" scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 300px;

  span {
    color: #97989e;
    font-size: 12px;
    margin-bottom: 60px;
  }

  button {
    width: 350px;
    height: 80px;
    line-height: 80px;
    border-radius: 40px;
    font-size: 20px;
    font-family: "PingFanglt";

    color: #f0feff;
    background-color: #149eff;
  }
}
</style>
