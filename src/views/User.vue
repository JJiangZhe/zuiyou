<template>
  <div class="User">
    <cell-item leftIcon="yejian" leftTit="夜间模式" leftIconColor="#2CA0F1">
      <template #right>
        <van-switch
          v-model="checkTheme"
          size="20px"
          active-color="#354654"
          inactive-color="#57BAFF"
          @change="changeTheme"
        />
      </template>
    </cell-item>
    <cell-item
      leftIcon="xiazai1"
      leftTit="我的下载"
      leftIconColor="#47548F"
      rightIcon="jinru"
    >
    </cell-item>
    <nav-bar />
  </div>
</template>

<script lang="ts">
import CellItem from "@/components/CellItem.vue";
import NavBar from "@/components/NavBar.vue";
import { getLocal, setLocal } from "@/utils/index";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: { NavBar, CellItem },
  name: "User",
  setup() {
    // 缓存主题
    const theme = getLocal("theme");
    const checkTheme = ref(false);

    checkTheme.value = theme === "theme-light" ? false : true;

    const changeTheme = (value: boolean) => {
      const app = document.getElementById("app") as HTMLElement;
      const name = value ? "theme-dark" : "theme-light";
      app.className = name;
      setLocal("theme", name);
    };

    return { checkTheme, changeTheme };
  }
});
</script>
