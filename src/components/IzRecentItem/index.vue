<template>
  <!-- 好友动态 -->
  <div>
    <div v-for="item in list" :key="item.id">
      <div class="item">
        <div class="top">
          <img
            class="avatar"
            :class="item.sex === 1 ? 'avatar-boy' : 'avatar-girl'"
            :src="item.avatar"
          />
          <div class="user-info">
            <div class="user">
              <span>{{ item.username }}</span>
              <img class="sex" v-if="item.sex === 1" src="@/assets/boy.png" />
              <img class="sex" v-else src="@/assets/girl.png" />
            </div>
            <div class="time">{{ time(item.time) }}</div>
          </div>
          <van-icon
            name="xia"
            class="iconfont"
            class-prefix="icon"
            @click="onPulldown(item)"
          />
        </div>
        <!-- 图片区 -->
        <div class="imgs">
          <van-image
            v-for="(img, i) in item.imgs"
            :width="imgW(item.imgs.length)"
            :height="imgH(item.imgs.length)"
            :key="i"
            :radius="4"
            :src="img"
            lazy-load
            fit="cover"
            @click="preview(item.imgs, i)"
          />
        </div>
        <!-- 内容区 -->
        <div class="data">
          <span>{{ item.data }}</span>
        </div>
        <!-- tag标签 -->
        <div class="tag">
          <span v-for="tag in item.tags" :key="tag">
            {{ tag }}
          </span>
        </div>
        <!-- 操作栏 转发 评论 点赞 -->
        <div class="btns">
          <van-icon
            color="#8a92a5"
            name="transmit"
            class="iconfont"
            class-prefix="icon"
          />
          <van-icon
            color="#8a92a5"
            name="aixin"
            class="iconfont"
            class-prefix="icon"
          />
          <span>{{ item.like }}</span>
          <van-icon
            color="#8a92a5"
            name="pinglun"
            class="iconfont"
            class-prefix="icon"
            style="margin-left:20px"
          />
          <span>{{ item.comment }}</span>
        </div>
      </div>
      <iz-divider :height="1" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRaw } from "vue";
import { ImagePreview } from "vant";
import { getDateDiff } from "@/utils/time";
import IzDivider from "../IzDivider/index.vue";
export default defineComponent({
  components: { IzDivider },
  name: "IzRecentItem",
  props: {
    list: Array
  },
  emits: ["onPulldown"],
  setup(props, context) {
    // 时间转换
    const time = computed(() => {
      return (val: string) => {
        return getDateDiff(val) + "推荐";
      };
    });

    // 预览图片
    const preview = (imgs: [], index: number) => {
      ImagePreview({ images: imgs, startPosition: index });
    };

    // 页面宽度
    const clientWidth = ref(document.body.clientWidth);
    // 190 = 边框之和 --- 0.375  = 根rem
    const width = 190 * 0.375;

    // 图片宽度
    const imgW = computed(() => {
      return (length: number) => {
        //  ? 张图片
        switch (length) {
          case 1:
            return 150;
          case 2:
            return Math.floor((clientWidth.value - width - 80) / 2);
          case 3:
            return Math.floor((clientWidth.value - width - 20) / 3);
        }
      };
    });

    // 图片高
    const imgH = computed(() => {
      return (length: number) => {
        switch (length) {
          case 1:
            return "100%";
          case 2:
            return Math.floor((clientWidth.value - width - 80) / 2);
          case 3:
            return Math.floor((clientWidth.value - width - 20) / 3);
        }
      };
    });

    // 页面宽度变化
    onMounted(() => {
      window.onresize = () => {
        clientWidth.value = document.body.clientWidth;
      };
    });

    // 点击下拉
    const onPulldown = (item: object) => {
      context.emit("onPulldown", toRaw(item));
    };

    return { time, preview, imgW, imgH, onPulldown };
  }
});
</script>

<style lang="less" scoped>
.item {
  padding: 30px;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 130px;

  .user-info {
    flex: 1;
    margin-left: 30px;

    .user {
      display: flex;
      align-items: center;
    }

    .user span {
      font-size: 36px;
      font-weight: bold;
    }

    .user .sex {
      margin-left: 15px;
      width: 40px;
      height: 40px;
    }

    .time {
      font-size: 1px;
      margin-top: 5px;
    }
  }

  .iconfon {
    font-weight: bold;
  }
}

.imgs,
.data,
.tag,
.btns {
  margin-left: 130px;
}

.imgs {
  .van-image:nth-child(2) {
    margin: 0 10px;
  }
}

.data {
  font-size: 32px;
  margin-top: 20px;
}

.tag {
  margin-top: 20px;
  margin-bottom: 20px;

  span {
    font-size: 24px;
    margin-right: 50px;
  }
}

.btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  flex: 1;

  .iconfont {
    font-size: 20px;
    font-weight: 600;
  }

  .iconfont:nth-child(2) {
    margin-left: auto;
  }

  span {
    margin-left: 15px;
    font-size: 12px;
  }
}

.theme-dark .tag span {
  color: #a03d4f;
}

.theme-light .tag span {
  color: #de4358;
}
</style>
