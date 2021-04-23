<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2020-12-21 10:00:50
 * @LastEditors: your name
 * @LastEditTime: 2021-04-23 14:37:00
-->
<template>
  <a-form v-bind="formLayout">
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
        v-model="formData.options.defaultValue"
      ></a-input>
    </a-form-item>
    <a-form-item label="操作设置">
      <a-checkbox v-model="formData.options.disabled">禁用</a-checkbox>
      <a-checkbox v-model="formData.options.allowClear">可清除</a-checkbox>
    </a-form-item>
    <!-- 规则校验 -->
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
  data () {
    return {
      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
    };
  },
  components: {
    ValidateItemRules,
  },
  methods: {},
};
</script>
<style lang="less" scoped>
</style>
