<!--
 * @Author: ykx
 * @Date: 2021-03-04 11:48:01
 * @LastEditTime: 2021-03-05 12:03:12
 * @LastEditors: your name
 * @Description: 日期范围属性设置
 * @FilePath: \zdww-form-design\src\components\FormDesign\PropsConfigPanels\RangePicker\index.vue
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
        :value="formData.options.placeholder[0]"
        @change="e => updatePlaceholder(e.target.value, 0)"
      ></a-input>
      <a-input
        allowClear
        placeholder="请输入"
        :value="formData.options.placeholder[1]"
        @change="e => updatePlaceholder(e.target.value, 1)"
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
        :value="formData.options.defaultValue[0]"
        @change="e => updateDefaultVal(e.target.value, 0)"
      ></a-input>
      <a-input
        allowClear
        placeholder="结束值"
        :value="formData.options.defaultValue[1]"
        @change="e => updateDefaultVal(e.target.value, 1)"
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
      <a-checkbox v-model="formData.options.showTime">显示时间</a-checkbox>
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
  methods: {
    updatePlaceholder (val, index) {
      this.$set(this.formData.options.placeholder, index, val);
    },
    updateDefaultVal (val, index) {
      this.$set(this.formData.options.defaultValue, index, val);
    },
  },
  watch: {
    'formData.options.showTime' (val) {
      this.formData.options.format = val ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    },
  },
};
</script>
<style lang="less" scoped>
</style>
