<template>
  <div class="home">
    <iz-top-bar
      fixed
      :list="bars"
      :crt="activeBarId"
      icon="sousuo"
      @clickItem="barItemClick"
    />
    <!-- 占位符 -->
    <div class="bars_placeholder" />
    <!-- 刷新组件 - 博文列表 -->
    <iz-pull-refresh prompt @reload="onRefresh()" ref="pullRef">
      <iz-blog-item :list="blogs" @onClose="onBlogClose" />
    </iz-pull-refresh>
    <!-- 屏蔽弹出层 -->
    <iz-close-popver ref="closePopRef" :top="closeTop" @onSubmit="onSubmit()" />
    <!-- 占位符 -->
    <div class="bars_placeholder" />
    <!-- 刷新 -->
    <iz-fixed-button icon="shuaxin" color="#159cf9" @click="onRefresh()" />
    <iz-nav-bar />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onActivated,
  onMounted,
  reactive,
  ref,
  toRefs
} from "vue";
import { getCategorylv1, getArticleByCt } from "@/api/home.ts";
import { Toast } from "vant";
import IzNavBar from "@/components/IzNavBar/index.vue";
import IzTopBar from "@/components/IzTopBar/index.vue";
import IzBlogItem from "@/components/IzBlogItem/index.vue";
import IzClosePopver from "@/components/IzClosePopver/index.vue";
import IzPullRefresh from "@/components/IzPullRefresh/index.vue";
import IzFixedButton from "@/components/IzFixedButton/index.vue";
export default defineComponent({
  name: "Home",
  components: {
    IzNavBar,
    IzTopBar,
    IzBlogItem,
    IzClosePopver,
    IzPullRefresh,
    IzFixedButton
  },
  setup() {
    const state = reactive({
      bars: [],
      activeBarId: 0,
      barItemClick(id: number) {
        state.activeBarId = id;
      },
      list: [],
      page: 1,
      pageSize: 10
    });

    onMounted(async () => {
      const { data: bars } = await getCategorylv1();
      state.bars = bars;
      state.activeBarId = bars[0].id;
      const { data: list } = await getArticleByCt({
        id: state.activeBarId,
        page: state.page,
        pageSize: state.pageSize
      });
      console.log(list);
    });

    onActivated(() => {
      Toast({
        message: "刷新数据",
        position: "bottom"
      });
    });

    const blogs = ref([
      {
        id: 1,
        username: "美延美延美延",
        desc: "best rapper", // best rapper of (G)-IDLE
        msg: "Merry Christmas 🎄🎁",
        imgs: [
          "https://wx4.sinaimg.cn/orj360/0077GvCkgy1glwy183h4kj316o1kwh28.jpg",
          "https://wx3.sinaimg.cn/orj360/0077GvCkgy1glwy18ouq5j316o1kwarh.jpg",
          "https://wx1.sinaimg.cn/thumb150/0077GvCkgy1glwy19ldelj316o1kw4jt.jpg",
          "https://wx4.sinaimg.cn/orj360/0077GvCkgy1glr182vbqyj31kw23vtr4.jpg"
        ],
        forwarding: 72383,
        comment: 999,
        upNumber: 999,
        avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        greatCm: {
          msg:
            "问：为什么六个娃一句话没说，我快笑死了？问：为什么六个娃一句话没说，我快笑死了？问：为什么六个娃一句话没说，我快笑死了？",
          upNumber: 999
        }
      },
      {
        id: 2,
        username: "美延美延美延",
        desc: "best rapper", // best rapper of (G)-IDLE
        msg: "Merry Christmas 🎄🎁",
        imgs: [
          "https://wx4.sinaimg.cn/orj360/0077GvCkgy1glwy183h4kj316o1kwh28.jpg",
          "https://wx3.sinaimg.cn/orj360/0077GvCkgy1glwy18ouq5j316o1kwarh.jpg",
          "https://wx1.sinaimg.cn/thumb150/0077GvCkgy1glwy19ldelj316o1kw4jt.jpg",
          "https://wx4.sinaimg.cn/orj360/0077GvCkgy1glr182vbqyj31kw23vtr4.jpg"
        ],
        forwarding: 72383,
        comment: 999,
        upNumber: 999,
        avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        greatCm: {
          msg:
            "问：为什么六个娃一句话没说，我快笑死了？问：为什么六个娃一句话没说，我快笑死了？问：为什么六个娃一句话没说，我快笑死了？",
          upNumber: 999
        }
      }
    ]);

    const closeId = ref(0);
    const closeTop = ref(0);
    const closePopRef = ref();

    // 打开屏蔽理由弹出层
    const onBlogClose = (id: number, top: number) => {
      closeId.value = id;
      closeTop.value = top;
      closePopRef.value.setStatus();
    };

    // 提交屏蔽理由
    const onSubmit = (type: number, msg: string) => {
      blogs.value.splice(
        blogs.value.findIndex(item => item.id === closeId.value),
        1
      );
      console.log(type); // 理由选项 1 2 3
      console.log(msg); // 其他屏蔽理由 ssss
      closePopRef.value.setStatus();
      Toast({
        message: "将减少类似内容推荐",
        position: "bottom"
      });
    };

    const pullRef = ref();
    // 刷新
    const onRefresh = () => {
      pullRef.value.setScrollTop();
      setTimeout(() => {
        pullRef.value.reload();
        Toast({
          message: "为你选出12条好帖",
          position: "top",
          duration: 800
        });
      }, 1000);
    };

    return {
      ...toRefs(state),
      blogs,
      onBlogClose,
      closeTop,
      closePopRef,
      onSubmit,
      onRefresh,
      pullRef
    };
  }
});
</script>
