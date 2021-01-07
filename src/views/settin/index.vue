<template>
  <div class="index">
    <iz-page-head icon="houtui" :size="24" center="设置" />
    <iz-cell-item :leftTit="'ID : ' + user.id">
      <template #right>复制</template>
    </iz-cell-item>
    <iz-divider />
    <div class="logout" @click="logout">退出当前账号</div>
  </div>
</template>

<script lang="ts">
import IzCellItem from "@/components/IzCellItem.vue";
import IzDivider from "@/components/IzDivider.vue";
import IzPageHead from "@/components/IzPageHead.vue";
// import { getLocal } from "@/utils";
import { defineComponent, toRaw } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: { IzPageHead, IzDivider, IzCellItem },
  name: "Settin",
  setup() {
    const store = useStore();

    const { user } = toRaw(store.state);

    const logout = () => {
      store.commit("logout");
    };

    return { user, logout };
  }
});
</script>

<style lang="less" scoped>
.logout {
  text-align: center;
  line-height: 100px;
  color: rgb(163, 187, 223);
}
</style>
