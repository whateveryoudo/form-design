<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2021-01-14 17:33:58
 * @LastEditors: your name
 * @LastEditTime: 2021-04-23 14:40:14
-->
<template>
  <a-switch
    :size="formConfig.size"
    :checked="curValue"
    @change="value => updateField(componentData.model, value)"
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
  methods: {},
  created () {},
};
</script>
<style scoped></style>
