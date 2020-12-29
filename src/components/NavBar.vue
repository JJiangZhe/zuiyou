<template>
  <!-- 底部导航栏组件 -->
  <div class="NavBar">
    <ul class="nav-list">
      <router-link class="nav-list-item" tag="li" to="/home">
        <van-icon
          class="iconfont"
          size="20"
          class-prefix="icon"
          name="zuiyou"
        />
        <span>最右</span>
      </router-link>
      <router-link
        class="nav-list-item"
        tag="li"
        :to="
          router.path.substr(0, 6) === '/topic' ? router.path : '/topic/tab1'
        "
      >
        <van-icon class="iconfont" size="20" class-prefix="icon" name="huati" />
        <span>话题</span>
      </router-link>
      <router-link class="nav-list-item" tag="li" to="/home">
        <div class="circle">
          <van-icon class="iconfont" size="20" class-prefix="icon" name="jia" />
        </div>
      </router-link>
      <router-link
        class="nav-list-item"
        tag="li"
        :to="router.path.substr(0, 4) === '/msg' ? router.path : '/msg/caution'"
      >
        <van-icon
          class="iconfont"
          size="20"
          class-prefix="icon"
          name="xiaoxi"
        />
        <span>消息</span>
      </router-link>
      <router-link class="nav-list-item" tag="li" to="/user">
        <van-icon class="iconfont" size="20" class-prefix="icon" name="wode" />
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "NavBar",
  setup() {
    const router = useRoute();
    return { router };
  }
});
</script>

<style lang="less" scoped>
@import "../common/css/mixin.less";

.NavBar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 120px;
  z-index: 999;

  .nav-list {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .nav-list-item {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    &.router-link-active {
      color: #00a2ff;
    }

    i {
      font-weight: bold;
    }

    span {
      font-size: 26px;
    }

    .circle {
      width: 90px;
      height: 90px;
      background-color: @primary;
      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 3px @primary;

      i {
        color: #ffffff;
      }
    }
  }
}

.theme-dark .nav-list-item {
  color: #8a92a5;
}

.theme-light .nav-list-item {
  color: #737685;
}
</style>
