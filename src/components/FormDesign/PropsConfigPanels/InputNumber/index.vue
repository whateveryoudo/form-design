<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2021-02-19 15:01:41
 * @LastEditors: your name
 * @LastEditTime: 2021-03-05 12:03:42
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
      <a-input
        allowClear
        v-model="formData.options.defaultValue"
      ></a-input>
    </a-form-item>
    <a-form-item label="最大值">
      <a-input-number
        allowClear
        v-model="formData.options.max"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="最小值">
      <a-input-number
        allowClear
        v-model="formData.options.min"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="步长">
      <a-input-number
        allowClear
        v-model="formData.options.step"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="操作设置">
      <a-checkbox v-model="formData.options.disabled">禁用</a-checkbox>
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
};
</script>
