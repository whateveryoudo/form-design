<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2020-12-21 10:00:50
 * @LastEditors: your name
 * @LastEditTime: 2021-03-05 11:58:36
-->
<template>
  <a-form>
    <a-form-item label="按钮文字">
      <a-input
        allowClear
        v-model="formData.options.defaultValue"
      ></a-input>
    </a-form-item>
    <a-form-item label="按钮类型">
      <a-radio-group
        buttonStyle="solid"
        v-model="formData.options.type"
      >
        <a-radio-button value="default">default</a-radio-button>
        <a-radio-button value="primary">primary</a-radio-button>
        <a-radio-button value="dashed">dashed</a-radio-button>
        <a-radio-button value="danger">danger</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="是否禁用">
      <a-checkbox v-model="formData.options.disabled">禁用</a-checkbox>
    </a-form-item>
    <a-form-item label="背景是否透明">
      <a-checkbox v-model="formData.options.ghost">透明</a-checkbox>
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
