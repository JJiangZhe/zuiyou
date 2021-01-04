<template>
  <div class="wrap">
    <van-icon
      name="houtui"
      color="#1D1E2C"
      size="22"
      class="iconfont"
      class-prefix="icon"
      @click="back"
    />
    <div class="form">
      <div class="phone form-item">
        <span>手机号</span>
        <input v-model="phone" type="text" />
      </div>
      <div class="password form-item">
        <span>密码</span>
        <input v-model="password" type="password" />
      </div>
      <button class="login" @click="login">登陆</button>
    </div>
    <div class="options">
      还没有账号?
      <span>马上注册</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { loginAction } from "@/api/user";
import { setLocal } from "@/utils";
import router from "@/router";
export default defineComponent({
  name: "Login",
  setup() {
    const state = reactive({
      phone: "17673154683",
      password: "123456"
    });

    const back = () => {
      router.go(-1);
    };

    const login = async () => {
      const { data } = await loginAction(state);
      data.token && setLocal("token", data.token);
      console.log(data);
    };

    return { ...toRefs(state), back, login };
  }
});
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url("~@/assets/bg.png") no-repeat;
  background-size: 100%;

  .iconfont {
    font-weight: bold;
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
  }

  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    .form-item {
      padding: 20px 30px;
      width: 75%;
      margin: 50px auto;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      border-radius: 10px;
      background-color: #f7f7fb;

      span {
        font-size: 24px;
      }

      input {
        color: #000;
        font-size: 36px;
        background: none;
        margin-top: 10px;
      }
    }

    .login {
      display: block;
      width: 75%;
      margin: 0 auto;
      padding: 30px 0;

      color: #ffffff;
      border-radius: 60px;
      background-color: #fa4169;

      &:active {
        background-color: #f36c89;
      }
    }
  }

  .options {
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    font-size: 24px;
    text-align: center;
    color: #111;

    span {
      color: #6d77ca;
    }
  }
}
</style>
