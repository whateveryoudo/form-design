<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2020-12-21 10:00:50
 * @LastEditors: your name
 * @LastEditTime: 2021-03-05 11:58:20
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
    <a-form-item label="默认值">
      <a-switch v-model="formData.options.defaultValue" />
    </a-form-item>
    <a-form-item label="操作设置">
      <a-checkbox v-model="formData.options.disabled">禁用</a-checkbox>
    </a-form-item>
    <a-divider>校验</a-divider>
    <a-form-item label="是否必填">
      <a-checkbox v-model="formData.options.required">必填</a-checkbox>
      <a-input
        v-if="formData.options.required"
        v-model="formData.options.requiredMsg"
        placeholder="请输入错误提示语句"
      ></a-input>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
};
</script>
