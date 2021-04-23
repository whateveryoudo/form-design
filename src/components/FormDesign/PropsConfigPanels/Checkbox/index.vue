<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2021-02-19 15:01:41
 * @LastEditors: Anxure
 * @LastEditTime: 2021-03-31 14:15:12
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
      <a-select
        v-model="formData.options.defaultValue"
        mode="multiple"
      >
        <a-select-option
          v-for="item in formData.options.option"
          :key="item.value"
          :value="item.value"
        >
          {{item.label}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-divider>选项</a-divider>
    <template>
      <div
        v-for="(item,index) in formData.options.option"
        :key="index"
        class="options-item"
      >
        <span
          class="close-btn"
          @click="formData.options.option.splice(index, 1)"
        >
          <a-icon type="minus-circle" />
        </span>
        <a-form layout="inline">
          <a-form-item label="选项">
            <a-input
              v-model="item.label"
              style="width:80px;"
            ></a-input>
          </a-form-item>
          <a-form-item label="值">
            <a-input
              v-model="item.value"
              style="width:80px;"
            ></a-input>
          </a-form-item>
        </a-form>
      </div>
      <div style="margin-bottom:5px">
        <span
          style="color:#1890ff; cursor: pointer;"
          @click="addOptions"
        >
          <a-icon type="plus-circle" /> 添加选项
        </span>
      </div>
    </template>
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
  methods: {
    addOptions () {
      this.formData.options.option.push({
        label: '',
        value: '',
      });
    },
  },
};
</script>
<style lang="less" scoped>
.options-item {
  padding: 5px 6px;
  position: relative;
  border-radius: 4px;
  .close-btn {
    position: absolute;
    right: 5px;
    top: 12px;
    color: #f5222d;
    font-size: 20px;
    cursor: pointer;
    z-index: 100;
  }
}
</style>
