<template>
  <div class="Topic">
    <iz-slide-tab
      :list="tabs"
      :crt="activeTabId"
      @clickItem="tabItemClick"
      image="pp"
      cName="red"
      :isBig="false"
      fixed
    />
    <!-- 占位符 -->
    <div class="bars_placeholder" />
    <iz-pull-refresh @reload="onRefresh" ref="pullRef" prompt>
      <iz-recent-item :list="recents" @onPulldown="onPulldown" />
    </iz-pull-refresh>
    <van-action-sheet
      class="bg-color"
      v-model:show="showPulldown"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      close-on-click-action
    />
    <iz-fixed-button icon="paizhao" color="#FF5A7B" @click="onPhoto" />
    <iz-nav-bar />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { Toast } from "vant";
import IzNavBar from "@/components/IzNavBar/index.vue";
import IzPullRefresh from "@/components/IzPullRefresh/index.vue";
import IzSlideTab from "@/components/IzSlideTab/index.vue";
import IzRecentItem from "@/components/IzRecentItem/index.vue";
import IzFixedButton from "@/components/IzFixedButton/index.vue";
export default defineComponent({
  name: "Topic2",
  components: {
    IzNavBar,
    IzSlideTab,
    IzPullRefresh,
    IzRecentItem,
    IzFixedButton
  },
  setup() {
    // 移动tab
    const slideTabs = reactive({
      tabs: [
        {
          id: 1,
          title: "好友"
        },
        {
          id: 2,
          title: "推荐"
        },
        {
          id: 3,
          title: "最新"
        }
      ],
      activeTabId: 1,
      tabItemClick(id: number) {
        slideTabs.activeTabId = id;
      }
    });
    // 好友动态列表
    const recents = ref([
      {
        id: 1,
        username: "赵美延",
        isHot: true,
        time: 1609424178,
        data:
          "赵美延（曺薇娟） ChoMiYeon。1997年1月31日出生，2018年5月2日以 CUBE新女团(G)I–DLE 成员出道。队内担当主唱。",
        imgs: [
          "https://wx4.sinaimg.cn/orj360/0077GvCkgy1glwy183h4kj316o1kwh28.jpg"
        ],
        tags: ["#和我一起跨年", "#新年Flag"],
        sex: 1,
        like: 154,
        comment: 38,
        avatar:
          "https://wx3.sinaimg.cn/thumb180/0077GvCkly1ghpkb3piixj30js0jrwhv.jpg"
      },
      {
        id: 2,
        username: "IZONE",
        isHot: true,
        time: 1609425907,
        data: "再次涌现的瞬间 全部展现 彼此约定 永远铭记",
        imgs: [
          "https://wx2.sinaimg.cn/thumb300/007dfx8lgy1glwmk7nkiqj31jc35s1kx.jpg",
          "https://wx2.sinaimg.cn/thumb300/61e28cc3gy1gly7jrnvjyj20ck0ckmyn.jpg"
        ],
        tags: ["#和我一起跨年", "#新年Flag"],
        sex: 2,
        like: 74,
        comment: 14,
        avatar:
          "https://wx4.sinaimg.cn/thumb300/006Dk6pWly1glz3fn28izj313d13d7e7.jpg"
      },
      {
        id: 3,
        username: "CRL'S",
        isHot: true,
        time: 1609425907,
        data: `不知不觉已经是2020年的最后一天了😭
虽然在一起的日子像Panorama一样一掠而过, 但这也是一年结尾的日子，让我们只描绘幸福的未来吧❣
那么大家准备好和IZ*ONE一起Shoot! Take a Panorama📽 了吗?
祝所有人 ℍ𝔸ℙℙ𝕐 ℕ𝔼𝕎 𝕐𝔼𝔸ℝ✨`,
        imgs: [
          "https://wx4.sinaimg.cn/thumb300/006XUZbCgy1gm7g6zhxnhj30vc0vcjtp.jpg",
          "https://wx3.sinaimg.cn/thumb300/0081TXoily1gm79z8j0ulj30rs0rswvl.jpg",
          "https://wxt.sinaimg.cn/thumb300/006TBQ92gy1gm0j7dpt6tj30qp0qpq9j.jpg"
        ],
        tags: ["#和我一起跨年", "#新年Flag"],
        sex: 2,
        like: 74,
        comment: 14,
        avatar:
          "https://wxt.sinaimg.cn/thumb300/006TBQ92gy1gls3hxfpdxj31e0230qtb.jpg?tags=%5B%5D"
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

    // 下拉状态
    const showPulldown = ref(false);
    const actions = [
      { name: "不喜欢这条动态" },
      { name: "不喜欢这个人" },
      { name: "举报" }
    ];
    // 监听下拉时
    const onPulldown = (item: object) => {
      console.log(item);
      showPulldown.value = !showPulldown.value;
    };
    // 下拉点击
    const onSelect = (item: object) => {
      console.log(item);
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // showPulldown.value = false;
    };

    // 打开相机
    const onPhoto = () => {
      console.log("1");
    };

    return {
      ...toRefs(slideTabs),
      recents,
      pullRef,
      onRefresh,
      onPulldown,
      actions,
      showPulldown,
      onSelect,
      onPhoto
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
