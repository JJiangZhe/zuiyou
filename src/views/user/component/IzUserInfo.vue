<template>
  <div class="user-info">
    <van-image class="avatar" round fit="cover" :src="user.avatar" />
    <!-- 名称 / 性别 -->
    <div class="name">
      <span>{{ user.nickname }}</span>
      <van-image
        class="sex-img"
        round
        width="20"
        height="20"
        fit="cover"
        :src="require('@/assets/' + sexImg + '.png')"
      />
    </div>
    <!-- 签名 -->
    <div class="sign">
      <span>{{ user.sign }}</span>
      <van-icon size="16" name="xiugai" class="iconfont" class-prefix="icon" />
    </div>
    <div class="numbers">
      <span>0</span>
      <span>获赞</span>
      <span>0</span>
      <span>关注</span>
      <span>0</span>
      <span>粉丝</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "IzUserInfo",
  props: {
    user: {
      type: Object
    }
  },
  setup(props) {
    const sexImg = computed(() => {
      const sex = props.user?.gender;
      switch (sex) {
        case 1:
          return "boy";
        case 2:
          return "girl";
        default:
          return "boy";
      }
    });

    return { sexImg };
  }
});
</script>

<style lang="less" scoped>
.user-info {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 50px;

  & > div {
    margin-top: 15px;
  }

  .avatar {
    width: 140px;
    height: 140px;
    box-shadow: 0 0 0px 5px #ffffff;
    border-radius: 50%;
  }

  .name {
    display: flex;
    align-items: center;

    span {
      display: block;
      font-size: 40px;
      color: #ffffff;
    }

    .sex-img {
      margin-left: 20px;
    }
  }

  .sign {
    font-size: 24px;
    color: #d1c8d1;
    display: flex;
    align-items: center;

    .iconfont {
      margin-left: 10px;
    }
  }

  .numbers {
    color: #ffffff;
    margin-bottom: 30px;

    span:nth-child(2n-1) {
      font-size: 42px;
    }

    span:nth-child(2n) {
      font-size: 24px;
      font-family: "PingFangfi";
      margin: 0 40px 0 10px;
      color: #e4dce4;
    }
  }
}
</style>
