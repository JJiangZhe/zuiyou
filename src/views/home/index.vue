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
    <iz-pull-refresh prompt @reload="getList" ref="pullRef">
      <iz-blog-item :list="blogs" @onClose="onBlogClose" />
    </iz-pull-refresh>
    <!-- 屏蔽弹出层 -->
    <iz-close-popver ref="closePopRef" :top="closeTop" @onSubmit="onSubmit()" />
    <!-- 占位符 -->
    <div class="bars_placeholder" />
    <!-- 刷新 -->
    <iz-fixed-button icon="shuaxin" color="#159cf9" @click="getList" />
    <iz-nav-bar />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onActivated,
  onDeactivated,
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
      list: [],
      page: 1,
      pageSize: 10
    });

    const closeId = ref(0);
    const closeTop = ref(0);
    // 屏蔽框组件 ref
    const closePopRef = ref();
    // 刷新组件 ref
    const pullRef = ref();
    // 距离顶部
    const scrollTop = ref(0);

    // 滚动事件
    const scrollToTop = () => {
      scrollTop.value =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    };

    // 获取分类
    const getBars = async () => {
      const { data: bars } = await getCategorylv1();
      state.bars = bars;
      state.activeBarId = bars[0].id;
    };

    // 根据获取列表
    const getList = async () => {
      await window.scrollTo(0, 0);
      pullRef.value.setScrollTop();
      const { data: list } = await getArticleByCt({
        id: state.activeBarId,
        page: state.page,
        pageSize: state.pageSize
      });
      state.list = list;
      console.log(list);
      pullRef.value.reload(); // 加载完毕
    };

    // 切换分类
    const barItemClick = (id: number) => {
      state.activeBarId = id;
      getList();
    };

    onMounted(async () => {
      window.addEventListener("scroll", scrollToTop);
      await getBars();
      getList();
    });

    onActivated(() => {
      window.addEventListener("scroll", scrollToTop);
      // 避免第一次加载 2次
      if (!state.activeBarId) return;
      setTimeout(() => {
        getList();
      }, 500);
    });

    onDeactivated(() => {
      window.removeEventListener("scroll", scrollToTop);
    });

    const blogs = ref([
      {
        id: 1,
        // 用户名字
        username: "美延美延美延",
        // 用户认证
        desc: "best rapper", // best rapper of (G)-IDLE
        // 发表文字内容
        msg: "Merry Christmas 🎄🎁",
        // 图片列表 max 9
        imgs: [
          "https://wx4.sinaimg.cn/orj360/0077GvCkgy1glwy183h4kj316o1kwh28.jpg",
          "https://wx3.sinaimg.cn/orj360/0077GvCkgy1glwy18ouq5j316o1kwarh.jpg",
          "https://wx1.sinaimg.cn/thumb150/0077GvCkgy1glwy19ldelj316o1kw4jt.jpg",
          "https://wx4.sinaimg.cn/orj360/0077GvCkgy1glr182vbqyj31kw23vtr4.jpg"
        ],
        // 转发数
        forwarding: 72383,
        // 评论数
        comment: 999,
        // 点赞数
        upNumber: 999,
        // 头像
        avatar: "https://img.yzcdn.cn/vant/cat.jpeg",
        // 亮评
        greatCm: {
          // 评论内容
          msg:
            "问：为什么六个娃一句话没说，我快笑死了？问：为什么六个娃一句话没说，我快笑死了？问：为什么六个娃一句话没说，我快笑死了？",
          // 点赞数
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

    return {
      ...toRefs(state),
      barItemClick,
      blogs,
      onBlogClose,
      closeTop,
      closePopRef,
      onSubmit,
      pullRef,
      getList
    };
  }
});
</script>
