<template>
  <div class="wrap">
    <div
      class="bg-color search"
      :style="{ justifyContent: focus ? '' : 'center' }"
    >
      <van-icon name="sousuo" class="iconfont" class-prefix="icon" />
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="focus ? focusPlace : placeholder"
        @focus="onFocus"
        :style="inputStyle"
      />
      <div class="clear" v-if="modelValue">
        <van-icon
          name="guanbi"
          class="iconfont"
          class-prefix="icon"
          @click="$emit('update:modelValue', null)"
        />
      </div>
    </div>
    <div v-show="focus" class="cancel" @click="onCancel">取消</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "IzSearch",
  props: {
    modelValue: String,
    placeholder: String,
    focusPlace: String
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const focus = ref(false);
    const onFocus = () => {
      focus.value = true;
    };

    const onCancel = () => {
      focus.value = false;
      emit("update:modelValue", null);
    };

    const inputStyle = computed(() => {
      return {
        textAlign: focus.value ? "left" : "center",
        width: focus.value ? "100%" : "120px",
        paddingLeft: focus.value ? "10px" : ""
      };
    });

    return { focus, onFocus, onCancel, inputStyle };
  }
});
</script>

<style lang="less" scoped>
.wrap {
  height: 60px;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  .search {
    height: 60px;
    width: 500px;
    width: 100%;
    padding: 10px 40px;
    border-radius: 30px;

    display: flex;
    align-items: center;

    input {
      background: none;
    }

    .clear {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      color: #ffffff;
      border-radius: 50%;
      background-color: #c8c9cc;

      .icon {
        display: block;
        font-size: 40px;
        line-height: 42px;
        text-align: center;
      }
    }
  }

  .cancel {
    width: 100px;
    text-align: right;
    flex-shrink: 0;
    font-size: 36px;
  }
}
</style>
