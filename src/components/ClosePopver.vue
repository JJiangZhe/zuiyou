<template>
  <teleport to="#app">
    <div class="mask" v-if="status" @click="setStatus"></div>
    <div
      class="content"
      :class="className ? 'show' : 'hide'"
      :style="position"
      v-if="status"
    >
      <template v-if="!isInput">
        <div class="title h1-color">选择你不喜欢的原因</div>
        <div class="line h2-color" @click="onSubmit(1)">
          <van-icon name="guanbi1" class="iconfont" class-prefix="icon" />
          <span>不喜欢该用户</span>
        </div>
        <div class="line h2-color" @click="onSubmit(2)">
          <van-icon name="xinxi" class="iconfont" class-prefix="icon" />
          <span>内容老旧</span>
        </div>
        <div class="line h2-color" @click="onSubmit(3)">
          <van-icon name="xinxi" class="iconfont" class-prefix="icon" />
          <span>内容重复</span>
        </div>
        <div class="other btn-color" @click="setIsInput">
          <van-icon name="xiugai" class="iconfont" class-prefix="icon" />
          <span>其他屏蔽理由</span>
        </div>
      </template>
      <template v-else>
        <div class="other-top">
          <van-icon
            name="houtui"
            class="iconfont"
            class-prefix="icon"
            @click="setIsInput"
          />
          <span class="h1-color">输入其他屏蔽理由</span>
          <div class="icon"></div>
        </div>
        <div class="reasons">
          <iz-textarea
            v-model="reasons"
            ref="textareaRef"
            placeholder="输入屏蔽理由,精准屏蔽"
          />
        </div>
        <div class="submit">
          <iz-button @click="onSubmit">提交</iz-button>
        </div>
      </template>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import IzButton from "./IzButton.vue";
import IzTextarea from "./IzTextarea.vue";
export default defineComponent({
  components: { IzTextarea, IzButton },
  name: "ClosePopver",
  props: {
    top: {
      type: Number,
      default: 0
    }
  },
  emits: ["onSubmit"],
  setup(props, context) {
    // 屏幕高度 667
    const windowH = window.screen.height;
    // 出现位置 style
    const position = computed(() => {
      // props.top = 点击X元素的坐标   530px * 0.375rem  内容的高度
      const height = Math.floor(props.top) + 530 * 0.375;
      // height: 仅判断用  弹出层是否超出屏幕(去除上下固定导航栏) 120 * 2 * 0.375rem
      // 超出: 屏幕高度 667 - 点击坐标(小于667)
      // 不超出: 点击坐标 + 30px(间隔)
      return height > windowH - 240 * 0.375
        ? `bottom:${windowH - props.top}px;`
        : `top:${props.top + 30}px;`;
    });
    // 遮罩层显示
    const status = ref(false);
    // 动画class 切换
    const className = ref(false);
    // 输入框组件的ref
    const textareaRef = ref();
    // 其他屏蔽内容  输入状态
    const isInput = ref(false);

    // 切换遮罩层显示  延迟100ms切换动画class  清除输入框内容
    const setStatus = () => {
      // 如果已经显示 先改变动画class  100ms后再关闭
      if (status.value) {
        className.value = !className.value;
        return setTimeout(() => {
          // 关闭弹出层
          status.value = !status.value;
          // 翻回第一页
          isInput.value = false;
          // 清除输入内容
          textareaRef.value && textareaRef.value.resetVal();
          // 清除高度
          // height.value = 0;
        }, 100);
      }
      // 设置动画class 打开弹出层
      className.value = !className.value;
      status.value = !status.value;
    };

    // 翻第二页 其他屏蔽理由
    const setIsInput = () => {
      isInput.value = !isInput.value;
    };

    // 理由
    const reasons = ref();

    // 提交  type : 点击不喜欢... or  其他理由
    const onSubmit = (type: [number, undefined]) => {
      if (!type && !reasons.value) return;
      context.emit("onSubmit", type, reasons.value);
    };

    return {
      status,
      setStatus,
      position,
      className,
      isInput,
      setIsInput,
      reasons,
      onSubmit,
      textareaRef
    };
  }
});
</script>

<style lang="less" scoped>
.content {
  position: absolute;
  // top: 0;
  left: 4%;
  right: 4%;
  width: 92%;
  border-radius: 15px;
  overflow: hidden;
  z-index: 10001;

  & > div {
    font-family: "PingFangfi";
    box-sizing: border-box;
  }

  .title {
    height: 120px;
    line-height: 120px;
    font-size: 36px;
    text-align: center;
  }

  .line {
    line-height: 90px;
    font-size: 32px;
    margin: 0 50px;
    display: flex;
    align-items: center;
    justify-self: start;

    span {
      margin-left: 20px;
    }
  }

  .other {
    height: 80px;
    margin: 0 50px;
    margin-top: 20px;

    line-height: 80px;
    padding: 0 15px;
    border-radius: 10px;

    span {
      font-family: "PingFanglt";
      font-size: 32px;
      margin-left: 15px;
    }
  }

  .other-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 120px;
    line-height: 120px;
    .icon {
      width: 60px;
      height: 60px;
      line-height: 60px;
      font-weight: bold;
      margin-left: 20px;
      text-align: center;
    }

    span {
      font-size: 36px;
    }
  }

  .reasons {
    margin: 15px auto;
    width: 90%;
  }

  .submit {
    margin: 15px auto;
    width: 90%;
    overflow: hidden;
  }
}

.show {
  animation: show 0.1s ease forwards;
}

.hide {
  animation: hide 0.1s ease forwards;
}

@keyframes show {
  0% {
    height: 0;
  }
  100% {
    height: 530px;
  }
}

@keyframes hide {
  0% {
    height: 530px;
  }
  100% {
    height: 0;
  }
}
</style>
