<template>
  <div class="Topic">
    <iz-title title="我加入的" />
    <div class="pf-wrap">
      <img src="@/assets/huati.jpg" />
    </div>
    <divider />
    <slide-tab :list="tabs" :crt="activeTabId" @clickItem="tabItemClick" />
    <pull-refresh @reload="onRefresh" ref="pullRef">
      <topic-item :list="topics" />
    </pull-refresh>
    <nav-bar />
  </div>
</template>

<script lang="ts">
import Divider from "@/components/Divider.vue";
import IzTitle from "@/components/IzTitle.vue";
import NavBar from "@/components/NavBar.vue";
import PullRefresh from "@/components/PullRefresh.vue";
import SlideTab from "@/components/SlideTab.vue";
import TopicItem from "@/components/TopicItem.vue";
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Toast } from "vant";
export default defineComponent({
  name: "Topic1",
  components: {
    NavBar,
    IzTitle,
    Divider,
    SlideTab,
    TopicItem,
    PullRefresh
  },
  setup() {
    // 移动tab
    const slideTabs = reactive({
      tabs: [
        {
          id: 1,
          title: "推荐"
        },
        {
          id: 2,
          title: "生活圈"
        },
        {
          id: 3,
          title: "声控"
        },
        {
          id: 4,
          title: "爆笑"
        },
        {
          id: 5,
          title: "游戏"
        },
        {
          id: 6,
          title: "二次元"
        },
        {
          id: 7,
          title: "萌宠"
        },
        {
          id: 8,
          title: "科技"
        },
        {
          id: 9,
          title: "爱好"
        }
      ],
      activeTabId: 1,
      tabItemClick(id: number) {
        slideTabs.activeTabId = id;
      }
    });
    // 话题列表
    const topics = ref([
      {
        id: 1,
        username: "赵美延",
        isHot: true,
        persons: 1281634,
        data:
          "赵美延（曺薇娟） ChoMiYeon。1997年1月31日出生，2018年5月2日以 CUBE新女团(G)I–DLE 成员出道。队内担当主唱。",
        imgs: [
          "https://wx4.sinaimg.cn/orj360/0077GvCkgy1glwy183h4kj316o1kwh28.jpg",
          "https://wx2.sinaimg.cn/thumb300/7d9ddd7dgy1glunp218m7j20k00qo41b.jpg",
          "https://wx4.sinaimg.cn/thumb300/008aAugogy1glurctatvoj30rm0r6gnm.jpg",
          "https://wx4.sinaimg.cn/thumb300/007e3Vf5gy1gluds0ldimj30hs0gxn00.jpg"
        ],
        avatar:
          "https://wx3.sinaimg.cn/thumb180/0077GvCkly1ghpkb3piixj30js0jrwhv.jpg"
      },
      {
        id: 2,
        username: "IZONE",
        isHot: true,
        persons: 20181029,
        data: "再次涌现的瞬间 全部展现 彼此约定 永远铭记",
        imgs: [
          "https://wx2.sinaimg.cn/thumb300/007dfx8lgy1glwmk7nkiqj31jc35s1kx.jpg",
          "https://wx2.sinaimg.cn/thumb300/61e28cc3gy1gly7jrnvjyj20ck0ckmyn.jpg",
          "https://wx4.sinaimg.cn/thumb300/005DlM1dgy1glunl3vgihj30r50r5aly.jpg",
          "https://wx2.sinaimg.cn/thumb300/006GT9ROgy1gltcazjzc2j31b01b04qp.jpg"
        ],
        avatar:
          "https://wx4.sinaimg.cn/thumb300/006Dk6pWly1glz3fn28izj313d13d7e7.jpg"
      }
    ]);

    const pullRef = ref();
    const onRefresh = () => {
      pullRef.value.reload();
      Toast({
        message: "刷新成功",
        position: "bottom",
        duration: 800
      });
    };

    return {
      ...toRefs(slideTabs),
      topics,
      pullRef,
      onRefresh
    };
  }
});
</script>

<style lang="less" scoped>
.pf-wrap {
  margin: 10px 40px 30px 40px;

  img {
    width: 100%;
    height: auto;
    border-radius: 15px;
    overflow: hidden;
  }
}
</style>
