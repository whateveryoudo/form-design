<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2021-01-14 16:41:05
 * @LastEditors: your name
 * @LastEditTime: 2021-04-13 16:50:26
-->
<template>
  <a-textarea
    :style="{width: componentData.options.width}"
    :value="curValue"
    :size="formConfig.size"
    v-bind="filterProps"
    @change="e => updateField(componentData.model, e.target.value)"
  />
</template>

<script>
import commonFiledMixins from '../commonFieldMixins';
export default {
  mixins: [commonFiledMixins],
  props: {},
  data () {
    return {};
  },
  created () {},
  mounted () {},
};
</script>
<style scoped></style>
