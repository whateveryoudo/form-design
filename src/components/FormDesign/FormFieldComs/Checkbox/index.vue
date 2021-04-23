<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2021-02-20 09:37:26
 * @LastEditors: your name
 * @LastEditTime: 2021-04-13 17:20:45
-->
<template>
  <a-checkbox-group
    :size="formConfig.size"
    v-bind="filterProps"
    @change="values => updateField(componentData.model, values)"
  >
    <a-checkbox
      v-for="item in componentData.options.option"
      :key="item.value"
      :value="item.value"
    >{{item.label}}</a-checkbox>
  </a-checkbox-group>
</template>
<script>
import commonFiledMixins from '../commonFieldMixins';
export default {
  mixins: [commonFiledMixins],
  props: {},
};
</script>
