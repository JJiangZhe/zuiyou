<template>
  <div class="home">
    <top-bar
      :list="bars"
      :crt="activeBarId"
      icon="sousuo"
      @clickItem="barItemClick"
    />
    <!-- 占位符 -->
    <div class="bars_placeholder" />
    <blog-item :list="blogs" @onClose="onBlogClose" />
    <close-popver ref="closePopRef" :top="closeTop" @onSubmit="onSubmit" />
    <div class="bars_placeholder" />
    <nav-bar />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { getCategorylv1 } from "@/api/home.ts";
import NavBar from "@/components/NavBar.vue";
import TopBar from "@/components/TopBar.vue";
import BlogItem from "@/components/BlogItem.vue";
import ClosePopver from "@/components/ClosePopver.vue";
export default defineComponent({
  name: "Home",
  components: {
    NavBar,
    TopBar,
    BlogItem,
    ClosePopver
  },
  setup() {
    const topBar = reactive({
      bars: [],
      activeBarId: 0,
      barItemClick(id: number) {
        topBar.activeBarId = id;
      }
    });

    onMounted(async () => {
      const { data } = await getCategorylv1();
      topBar.bars = data;
      topBar.activeBarId = data[0].id;
    });

    const blogs = [
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
    ];

    const closeId = ref(0);
    const closeTop = ref(0);
    const closePopRef = ref();

    const onBlogClose = (id: number, top: number) => {
      closeId.value = id;
      closeTop.value = top;
      closePopRef.value.setStatus();
    };

    const onSubmit = (type: number, msg: string) => {
      console.log(type);
      console.log(msg);
      closePopRef.value.setStatus();
    };

    return {
      ...toRefs(topBar),
      blogs,
      onBlogClose,
      closeTop,
      closePopRef,
      onSubmit
    };
  }
});
</script>

<style lang="less" scoped></style>
