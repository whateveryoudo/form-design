<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2020-12-21 10:00:50
 * @LastEditors: your name
 * @LastEditTime: 2021-03-05 11:56:22
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
    <a-form-item label="高度">
      <a-input-number v-model="formData.options.rows" />
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
  methods: {},
};
</script>
<style lang="less" scoped>
</style>
