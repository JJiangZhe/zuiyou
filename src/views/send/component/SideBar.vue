<template>
  <div class="SideBar">
    <div class="list">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        :class="modelValue === item.id && 'active'"
        @click="$emit('update:modelValue', item.id)"
      >
        {{ item.category_name }}
      </div>
    </div>
    <div class="topics">
      <div
        class="topic"
        v-for="topic in topics?.topic"
        :key="topic.id"
        @click="onClick(topic)"
      >
        <van-image fit="cover" :src="topic.topic_images" radius="8" />
        <div class="info">
          <span class="h1-color">{{ topic.topic_name }}</span>
          <span class="sed-color ovf2">{{ topic.topic_description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import router from "@/router";
import { useStore } from "vuex";
export default defineComponent({
  name: "SideBar",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    modelValue: Number
  },
  setup(props) {
    const topics = computed(() => {
      return props.list.find((item: any) => item.id === props.modelValue);
    });

    const store = useStore();

    const onClick = (topic: object) => {
      router.back();
      store.commit("setTopic", topic);
    };

    return { topics, onClick };
  }
});
</script>

<style lang="less" scoped>
.SideBar {
  display: flex;
}

.list {
  width: 250px;
  height: 100%;

  .item {
    font-size: 26px;
    width: 200px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    margin-bottom: 30px;
  }

  .active {
    color: #ffffff;
    border-radius: 0 50px 50px 0;
    background: #7f7fd5; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #91eae4,
      #86a8e7,
      #7f7fd5
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #91eae4,
      #86a8e7,
      #7f7fd5
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
}

.topic {
  display: flex;
  margin: 30px 30px;
  flex: 1;

  .van-image {
    flex-shrink: 0;
    width: 130px;
    height: 130px;
    margin-right: 25px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > span:nth-child(1) {
      font-size: 32px;
    }

    & > span:nth-child(2) {
      font-size: 28px;
    }
  }
}
</style>
