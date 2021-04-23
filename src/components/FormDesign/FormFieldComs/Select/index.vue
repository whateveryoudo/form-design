<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2021-02-19 16:57:31
 * @LastEditors: your name
 * @LastEditTime: 2021-04-13 17:06:44
-->
<template>
  <a-select
    :size="formConfig.size"
    :value="curValue"
    v-bind="filterProps"
    @change="value => updateField(componentData.model, value)"
  >
    <a-select-option
      v-for="item in componentData.options.option"
      :key="item.value"
      :value="item.value"
    >{{item.label}}
    </a-select-option>
  </a-select>
</template>
<script>
import commonFiledMixins from '../commonFieldMixins';
export default {
  mixins: [commonFiledMixins],
  props: {},
};
</script>
