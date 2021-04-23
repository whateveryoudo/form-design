<!--
 * @Author: your name
 * @Date: 2020-12-14 16:52:49
 * @LastEditTime: 2021-04-13 16:50:12
 * @LastEditors: your name
 * @Description: 输入框组件
 * @FilePath: \form-design\src\components\FormDesign\FormFieldComs\Input\index.vue
-->
<template>
  <a-input
    :style="{width: componentData.options.width}"
    :size="formConfig.size"
    :value="curValue"
    v-bind="filterProps"
    @change="e => updateField(componentData.model, e.target.value)"
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
