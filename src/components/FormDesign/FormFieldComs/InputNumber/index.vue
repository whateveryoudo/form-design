<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2021-02-19 15:02:29
 * @LastEditors: your name
 * @LastEditTime: 2021-04-13 16:51:45
-->
<template>
  <a-input-number
    :size="formConfig.size"
    :value="curValue"
    v-bind="filterProps"
    @change="value => updateField(componentData.model, value)"
  />
</template>
<script>
import commonFiledMixins from '../commonFieldMixins';
export default {
  mixins: [commonFiledMixins],
  data () {
    return {};
  },
  created () {},
  mounted () {},
};
</script>
