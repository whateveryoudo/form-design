<!--
 * @Author: ykx
 * @Date: 2021-03-04 16:27:59
 * @LastEditTime: 2021-03-05 12:03:24
 * @LastEditors: your name
 * @Description: 时间选择属性控制
 * @FilePath: \zdww-form-design\src\components\FormDesign\PropsConfigPanels\TimePicker\index.vue
-->

<template>
  <a-form>
    <a-form-item label="标签">
      <a-input
        allowClear
        v-model="formData.options.label"
      ></a-input>
    </a-form-item>
    <a-form-item label="数据字段">
      <a-input
        allowClear
        v-model="formData.model"
      ></a-input>
    </a-form-item>
    <a-form-item label="占位内容">
      <a-input
        allowClear
        placeholder="请输入"
        v-model="formData.options.placeholder"
      ></a-input>
    </a-form-item>
    <a-form-item label="宽度">
      <a-input
        allowClear
        v-model="formData.options.width"
      ></a-input>
    </a-form-item>
    <a-form-item label="默认值">
      <a-input
        allowClear
        placeholder="起始值"
        v-model="formData.options.defaultValue"
      ></a-input>
    </a-form-item>
    <a-form-item label="日期格式">
      <a-input
        allowClear
        v-model="formData.options.format"
      ></a-input>
    </a-form-item>
    <a-form-item label="操作设置">
      <a-checkbox v-model="formData.options.disabled">禁用</a-checkbox>
      <a-checkbox v-model="formData.options.allowClear">可清除</a-checkbox>
    </a-form-item>
    <validate-item-rules :formData="formData" />
  </a-form>
</template>
<script>
import ValidateItemRules from '../ValidateItemRules';
export default {
  props: {
    formData: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {
    ValidateItemRules,
  },
  data () {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
</style>
