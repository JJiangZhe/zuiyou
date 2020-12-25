<template>
  <!-- 话题列表组件 -->
  <div class="topic-list">
    <div class="topic-item" v-for="item in list" :key="item.id">
      <div class="topic-top">
        <van-image
          class="avatar"
          :radius="6"
          lazy-load
          fit="cover"
          :src="item.avatar"
        />
        <div class="info">
          <div class="info-name">
            <span>{{ item.username }}</span>
            <img src="@/assets/hot1.png" />
          </div>
          <div class="info-persons sed-color">{{ item.persons }} 面壁人</div>
        </div>
        <div class="join">加入</div>
      </div>
      <!-- 中间文字信息 -->
      <div class="msg ovf2">
        {{ item.data }}
      </div>
      <!-- 底部图片区 -->
      <div class="imgs" :style="{ height: size + 'px' }">
        <van-image
          lazy-load
          class="img"
          :src="img"
          :width="size"
          :height="size"
          v-for="(img, index) in item.imgs"
          :key="img"
          fit="fill"
          @click="preview(item.imgs, index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ImagePreview } from "vant";
export default defineComponent({
  name: "TopicItem",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  setup() {
    // 图片内容 尺寸
    const size = ref(0);

    // padding 40 * 2  margin-left 150  spacing 60 图片之间的距离
    const margin = (80 + 150 + 60) * 0.375;
    size.value = Math.floor((document.body.clientWidth - margin) / 4);

    onMounted(() => {
      window.onresize = () => {
        size.value = Math.floor((document.body.clientWidth - margin) / 4);
      };
    });

    // 预览图片
    const preview = (imgs: [], index: number) => {
      ImagePreview({ images: imgs, startPosition: index });
    };

    return { size, preview };
  }
});
</script>

<style lang="less" scoped>
@import "../common/css/mixin.less";
.topic-list {
  padding: 20px 40px;

  .topic-item {
    margin-bottom: 40px;
  }
}

.topic-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .avatar {
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }

  .info {
    flex: 1;
    margin-left: 30px;

    .info-name {
      display: flex;
      align-items: center;

      span {
        margin-right: 10px;
      }

      img {
        width: 40px;
        height: 40px;
      }
    }

    .info-persons {
      font-size: 26px;
      margin-top: 5px;
    }
  }

  .join {
    height: 60px;
    width: 140px;
    line-height: 60px;
    text-align: center;

    font-family: "PingFangfi";
    font-size: 28px;
    border-radius: 50px;
    color: @primary;
    border: @border-primary;
  }
}

.msg {
  margin: 10px 0 10px 150px;
  font-size: 32px;
}

.imgs {
  margin-left: 150px;
  border-radius: 10px;
  overflow: hidden;

  display: flex;
  justify-content: space-between;

  .img {
    width: 100%;
    height: 100%;
  }
}
</style>
