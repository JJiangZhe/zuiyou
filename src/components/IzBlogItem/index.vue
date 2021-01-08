<template>
  <!-- 博文列表组件 -->
  <div v-for="item in list" :key="item.id">
    <div class="item" style="padding: 15px">
      <!-- 顶部用户信息 -->
      <div class="top-info">
        <!-- 头像 -->
        <van-image
          class="image"
          round
          lazy-load
          fit="cover"
          :src="item.avatar"
        />
        <!-- 名称 描述 -->
        <div class="info">
          <div class="name">
            <span class="username">{{ item.username }}</span>
            <img class="label" src="@/assets/yoyo.png" />
          </div>
          <div v-if="item.desc" class="desc">{{ item.desc }}</div>
        </div>
        <!-- 关注 关闭 -->
        <div class="btn">
          <div class="follow">关注</div>
          <van-icon
            name="guanbi"
            class="iconfont"
            class-prefix="icon"
            @click="onClose($event, item.id)"
          />
        </div>
      </div>
      <!-- 消息区 -->
      <div class="msg text-color">{{ item.msg }}</div>
      <!-- 图片区 -->
      <div class="imgs">
        <van-image
          class="norem"
          v-for="(img, i) in item.imgs"
          :width="size"
          :height="size"
          :key="i"
          :radius="4"
          :src="img"
          lazy-load
          fit="cover"
          @click="preview(item.imgs, i)"
        />
      </div>
      <!-- 神评区 -->
      <div class="great bg-color">
        <div class="great-top">
          <img src="@/assets/great.png" />
          <div class="right">
            <van-icon
              color="#2796e5"
              name="shangyi"
              class="iconfont"
              class-prefix="icon"
            />
            <span>{{ item.greatCm.upNumber }}</span>
          </div>
        </div>
        <div class="comment">{{ item.greatCm.msg }}</div>
      </div>
      <!-- 操作栏 转发 评论 点赞 -->
      <div class="oper-btns">
        <van-icon
          color="#8a92a5"
          name="zhuanfa"
          class="iconfont"
          class-prefix="icon"
        />
        <span>{{ item.forwarding }}</span>
        <van-icon
          color="#8a92a5"
          name="xiaoxi1"
          class="iconfont"
          class-prefix="icon"
        />
        <span>{{ item.comment }}</span>
        <van-icon
          color="#8a92a5"
          name="shangyi"
          class="iconfont"
          class-prefix="icon"
        />
        <span>{{ item.upNumber }}</span>
        <van-icon
          color="#8a92a5"
          name="xiayi"
          class="iconfont"
          class-prefix="icon"
        />
      </div>
    </div>
    <iz-divider :height="10" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ImagePreview } from "vant";
import IzDivider from "../IzDivider/index.vue";
export default defineComponent({
  name: "BlogItem",
  components: { IzDivider },
  props: {
    list: Array
  },
  emits: ["onClose"],
  setup(props, context) {
    // 预览图片
    const preview = (imgs: [], index: number) => {
      ImagePreview({ images: imgs, startPosition: index });
    };

    // 关闭按钮点击
    const onClose = (e: MouseEvent, id: number) => {
      const event = e.target as HTMLElement;
      const top = event.getBoundingClientRect().top;
      context.emit("onClose", id, top);
    };

    // 图片内容 尺寸
    const size = ref(0);

    size.value = Math.floor((document.body.clientWidth - 41) / 3);

    onMounted(() => {
      window.onresize = () => {
        size.value = Math.floor((document.body.clientWidth - 41) / 3);
      };
    });

    return { preview, onClose, size };
  }
});
</script>

<style lang="less" scoped>
// 顶部用户信息
.top-info {
  display: flex;
  align-items: center;
  height: 90px;

  .image {
    width: 90px;
    height: 90px;
    border: 5px solid #fff;
    box-sizing: border-box;
  }

  .info {
    margin-left: 20px;
    font-size: 32px;

    .name {
      display: flex;
      align-items: center;

      .label {
        width: 35px;
        height: 35px;
        margin: 0 15px;
      }
    }
  }

  .btn {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: auto;

    .follow {
      width: 100px;
      text-align: center;
      font-size: 14px;
      line-height: 52px;
      color: #198cda;
      border-radius: 20px;
      border: 1px solid #159cf9;
      margin-right: 20px;
      box-sizing: border-box;
    }

    .icon {
      line-height: 62px;
      font-size: 62px;
      font-weight: bold;
    }
  }
}

// 消息
.msg {
  padding: 20px;
}

// 神评
.great {
  padding: 20px;
  border-radius: 15px;
  font-size: 32px;
  margin: 15px 0;

  .great-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    img {
      width: 40px;
      height: 40px;
      font-weight: bold;
    }

    .right {
      display: flex;
      align-items: center;

      span {
        display: block;
        margin: 0 15px;
        color: #2796e5;
      }
    }
  }

  .comment {
    font-size: 20px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

// 转发 评论 点赞
.oper-btns {
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon {
    font-size: 52px;
  }

  span {
    font-size: 32px;
  }
}

// 图片内容区
.imgs {
  display: flex;
  flex-wrap: wrap;

  .norem:nth-child(3n-1) {
    margin: 0 5px;
  }

  .van-image {
    margin-bottom: 10px;

    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
