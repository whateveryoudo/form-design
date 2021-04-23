<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2020-12-18 16:27:52
 * @LastEditors: your name
 * @LastEditTime: 2021-03-05 14:14:42
-->
<template>
  <div>
    <a-button
      v-bind="componentData.options"
      :size="formConfig.size"
    >
      {{ componentData.options.defaultValue }}
    </a-button>
  </div>
</template>
<script>
export default {
  props: {
    componentData: {
      type: Object,
      default: () => {},
    },
    formConfig: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
