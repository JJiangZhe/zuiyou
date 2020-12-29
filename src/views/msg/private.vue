<template>
  <div class="private">
    <iz-nologin msg="登陆后才能查看消息提醒哦~" />
  </div>
</template>

<script lang="ts">
import IzNologin from "@/components/IzNologin.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { IzNologin },
  name: "private"
});
</script>
