<template>
  <div class="index">
    <iz-page-head icon="guanbi" title="发布" />
    <!-- 选择话题 -->
    <div class="bg-color topic-wrap" @click="checkTopic">
      <div class="left">
        <van-icon name="huati1" class="iconfont" class-prefix="icon" />
        <span>{{ topic.topic_name || "选择话题" }}</span>
      </div>
      <div class="right">
        <span class="text-grey">选择合适的话题会有更多的点赞哦~</span>
        <van-icon name="jinru" class="iconfont" class-prefix="icon" />
      </div>
    </div>
    <!-- 内容 -->
    <textarea class="theme-bg" v-model="content" placeholder="我的快乐源泉" />
    <!-- 底部按钮 -->
    <iz-divider :height="1" />
    <div class="btns">
      <van-icon name="tupian" class="iconfont" class-prefix="icon" />
      <van-icon name="shipin" class="iconfont" class-prefix="icon" />
      <van-icon name="yuyin" class="iconfont" class-prefix="icon" />
      <van-icon name="lianjie" class="iconfont" class-prefix="icon" />
      <van-icon name="toupiao" class="iconfont" class-prefix="icon" />
      <van-icon name="aite" class="iconfont" class-prefix="icon" />
    </div>

    <router-view v-slot="{ Component }">
      <transition name="top-bottom">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import IzDivider from "@/components/IzDivider/index.vue";
import IzPageHead from "@/components/IzPageHead/index.vue";
import { defineComponent, toRefs, reactive, computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";
export default defineComponent({
  components: { IzPageHead, IzDivider },
  name: "Send",
  setup() {
    const state = reactive({
      topics: [],
      content: ""
    });

    const checkTopic = () => {
      router.push({ path: "/check" });
    };

    const store = useStore();
    const topic = computed(() => store.state.topic);

    return { ...toRefs(state), checkTopic, topic };
  }
});
</script>

<style lang="less" scoped>
.topic-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  padding: 0 30px;

  .iconfont {
    font-size: 14px;
  }

  .left {
    .iconfont {
      color: #ffffff;
      background-color: #18a2fa;
      border-radius: 50%;
      padding: 1px;
    }

    span {
      color: #73a8c9;
      font-size: 14px;
      margin-left: 10px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .iconfont {
      font-weight: bold;
    }

    span {
      font-size: 12px;
      margin-right: 20px;
    }
  }
}

textarea {
  padding: 30px;
  width: calc(100vw);
  height: calc(100vh - 335px);
  color: #bababa;
  box-sizing: border-box;

  &::-webkit-input-placeholder {
    color: #bababa;
  }
}

.btns {
  height: 100px;
  line-height: 100px;

  display: flex;
  align-items: center;

  .iconfont {
    font-size: 24px;
    width: 50px;
    text-align: center;

    &:last-child {
      margin-left: auto;
    }
  }
}
</style>
