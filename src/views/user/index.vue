<template>
  <div>
    <div class="user-bg">
      <!-- <van-image
          round
          width="40"
          height="40"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        /> -->
      <!-- <div class="info" @click="toLogin">登陆</div> -->
    </div>
    <iz-top-bar
      fixed
      icon="shezhi"
      :scrollTop="scrollTop"
      :iconColor="scrollTop > 100 ? '#000000' : '#ffffff'"
    >
      <template #center>
        <span class="f36">paboland</span>
      </template>
    </iz-top-bar>
    <div class="user-wrap bg-color">
      <div class="bg radius">
        <iz-grid :list="gridList" />
      </div>
      <div class="bg radius">
        <iz-grid
          :size="24"
          title="与右成长"
          :list="growths"
          @click="clickMore"
        />
      </div>
      <div class="bg radius">
        <iz-grid
          :size="24"
          title="小右推荐"
          :list="recomds"
          @click="clickMore"
        />
      </div>
      <div class="bg radius">
        <iz-grid :size="24" title="更多服务" :list="mores" @click="clickMore" />
      </div>
      <!-- 占位符 -->
      <div class="bars_placeholder" />
      <iz-nav-bar />
    </div>
  </div>
</template>

<script lang="ts">
import IzGrid from "@/components/IzGrid.vue";
import IzNavBar from "@/components/IzNavBar.vue";
import { getLocal, setLocal } from "@/utils/index";
import {
  computed,
  defineComponent,
  onDeactivated,
  onMounted,
  reactive,
  ref,
  toRefs
} from "vue";
import router from "@/router";
import IzTopBar from "@/components/IzTopBar.vue";

interface Grid {
  id: number;
  image?: string;
  icon?: string;
  title: string;
  color?: string;
}

export default defineComponent({
  components: { IzNavBar, IzGrid, IzTopBar },
  name: "User",
  setup() {
    const state = reactive({
      gridList: [
        {
          id: 1,
          image: "tiezi",
          title: "帖子"
        },
        {
          id: 2,
          image: "pinglun",
          title: "评论"
        },
        {
          id: 3,
          image: "shoucang",
          title: "收藏"
        },
        {
          id: 4,
          image: "shangsheng",
          title: "赞过"
        }
      ],
      growths: [
        {
          id: 5,
          icon: "dengpao",
          title: "创作中心",
          color: "#4DB0EA"
        },
        {
          id: 6,
          icon: "xunzhang",
          title: "最右勋章",
          color: "#E8B52E"
        },
        {
          id: 7,
          icon: "sousuo1",
          title: "审核专区",
          color: "#9086E5"
        },
        {
          id: 8,
          icon: "fuwutaidu",
          title: "右有态度",
          color: "#E58199"
        }
      ],
      recomds: [
        {
          id: 9,
          icon: "gouwu",
          title: "最右好物",
          color: "#B96478"
        },
        {
          id: 10,
          icon: "youxi",
          title: "小游戏",
          color: "#746DAB"
        },
        {
          id: 11,
          icon: "lvhang",
          title: "旅行章鱼",
          color: "#3D80AA"
        },
        {
          id: 12,
          icon: "family",
          title: "最右family",
          color: "#4582AF"
        }
      ],
      mores: [
        {
          id: 13,
          icon: "yejian",
          title: "夜间模式",
          color: "#3484C4"
        },
        {
          id: 14,
          icon: "lishi",
          title: "浏览历史",
          color: "#B28835"
        },
        {
          id: 15,
          icon: "xiazai1",
          title: "我的下载",
          color: "#5E66A2"
        },
        {
          id: 16,
          icon: "heimingdan1",
          title: "黑名单",
          color: "#A7A8BA"
        },
        {
          id: 17,
          icon: "bangzhuyufankui",
          title: "帮助与反馈",
          color: "#AF476E"
        },
        {
          id: 18,
          icon: "san",
          title: "青少年模式",
          color: "#B28835"
        },
        {
          id: 19,
          icon: "shezhi",
          title: "设置"
        }
      ]
    });

    // 设置模式显示
    const setTheme = () => {
      const theme = getLocal("theme");
      const news = {
        id: 13,
        icon: theme === "theme-dark" ? "yejian" : "taiyang",
        title: theme === "theme-dark" ? "夜间模式" : "日间模式",
        color: theme === "theme-dark" ? "#3D80AA" : "#B28835"
      };
      state.mores.splice(0, 1);
      state.mores.unshift(news);
    };

    // 切换主题
    const changeTheme = () => {
      // 原主题
      const theme = getLocal("theme");
      const app = document.getElementById("app") as HTMLElement;
      const name = theme === "theme-dark" ? "theme-light" : "theme-dark";
      app.className = name;
      // 保存到 storage
      setLocal("theme", name);
      // 重新设置
      setTheme();
    };

    const clickMore = (item: Grid) => {
      switch (item.id) {
        case 13:
          changeTheme();
          break;
        default:
          break;
      }
    };

    setTheme();

    const toLogin = () => {
      router.push("/login");
    };

    const scrollTop = ref(0);
    const scrollToTop = () => {
      scrollTop.value =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    };

    const bgStyle = computed(() => {
      return {
        background: scrollTop.value > 100 ? "#ffffff" : "rgba(0, 0, 0, 0)"
      };
    });

    onMounted(() => {
      window.addEventListener("scroll", scrollToTop);
    });

    onDeactivated(() => {
      window.removeEventListener("scroll", scrollToTop);
    });

    return {
      changeTheme,
      ...toRefs(state),
      clickMore,
      toLogin,
      bgStyle,
      scrollTop
    };
  }
});
</script>

<style lang="less" scoped>
.user-bg {
  height: 500px;
  width: 100%;
  background-size: 100%;
  background: url("~@/assets/user-bg.png");
}

.user-wrap {
  padding: 20px;
}

.radius {
  margin-bottom: 30px;
  border-radius: 30px;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 30px 50px;

  .info {
    flex: 1;
    margin-left: 30px;
  }
}
</style>
