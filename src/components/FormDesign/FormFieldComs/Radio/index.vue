<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2021-02-19 17:44:04
 * @LastEditors: your name
 * @LastEditTime: 2021-04-13 17:17:32
-->
<template>
  <a-radio-group
    :size="formConfig.size"
    :value="curValue"
    v-bind="filterProps"
    @change="e => updateField(componentData.model, e.target.value)"
  >
    <template v-if="componentData.options.type==='default'">
      <a-radio
        v-for="item in componentData.options.option"
        :key="item.value"
        :value="item.value"
      >{{item.label}}</a-radio>
    </template>
    <template v-else>
      <a-radio-button
        v-for="item in componentData.options.option"
        :key="item.value"
        :value="item.value"
      >{{item.label}}</a-radio-button>
    </template>
  </a-radio-group>
</template>

<script>
import commonFiledMixins from '../commonFieldMixins';
export default {
  mixins: [commonFiledMixins],
  props: {},
};
</script>
