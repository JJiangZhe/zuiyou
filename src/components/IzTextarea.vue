<template>
  <textarea :value="changeVal" :placeholder="placeholder" @input="updateVal">
  </textarea>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "IzTextarea",
  props: {
    placeholder: String,
    modelValue: String
  },
  setup(props, context) {
    const changeVal = ref(props.modelValue);
    const updateVal = (e: KeyboardEvent) => {
      const targetVal = (e.target as HTMLInputElement).value;

      // 令两个值相等(传过来的值和输入的值)
      changeVal.value = targetVal;
      context.emit("update:modelValue", targetVal);
    };

    const resetVal = () => {
      if (!changeVal.value) return;
      changeVal.value = undefined;
      context.emit("update:modelValue", changeVal.value);
    };

    return {
      updateVal,
      changeVal,
      resetVal
    };
  }
});
</script>

<style lang="less" scoped>
textarea {
  width: 100%;
  height: 250px;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
