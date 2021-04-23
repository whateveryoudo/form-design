<!--
 * @Author: ykx
 * @Date: 2021-02-19 15:44:45
 * @LastEditTime: 2021-03-05 12:02:57
 * @LastEditors: your name
 * @Description: 日期选择
 * @FilePath: \zdww-form-design\src\components\FormDesign\PropsConfigPanels\DatePicker\index.vue
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
    <a-form-item label="日期类型">
      <a-select
        allowClear
        :value="formData.options.dateType"
        @change="handlePickerTypeChange"
      >
        <a-select-option value="date">日(date)</a-select-option>
        <a-select-option value="month">月(month)</a-select-option>
        <a-select-option value="week">周(week)</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="日期格式">
      <a-input
        allowClear
        :value="formData.options.format"
        @input="setPickerOption($event.target.value, 'format')"
      ></a-input>
    </a-form-item>
    <a-form-item label="操作设置">
      <a-checkbox v-model="formData.options.disabled">禁用</a-checkbox>
      <a-checkbox v-model="formData.options.allowClear">可清除</a-checkbox>
      <a-checkbox
        v-model="formData.options.showToday"
        v-show="formData.options.dateType === 'date'"
      >显示"今天按钮"</a-checkbox>
      <a-checkbox
        :checked="formData.options.showTime"
        @change="handleShowTimeChange"
        v-show="formData.options.dateType === 'date'"
      >显示时间</a-checkbox>
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
    return {
      formatMap: {
        date: 'YYYY-MM-DD',
        month: 'YYYY-MM',
        week: 'YYYY-wo',
      },
    };
  },
  methods: {
    /**
     * @description: 监听是否显示时间
     * @param {*}
     */
    handleShowTimeChange (e) {
      this.setPickerOption(e.target.checked, 'showTime');
      const formatVal = e.target.checked ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
      this.setPickerOption(formatVal, 'format');
    },
    /**
     * @description: 监听picker类型变化
     * @param {String} val 类型值
     */
    handlePickerTypeChange (val) {
      this.setPickerOption(val, 'dateType');
      // 更新关联字段
      const formatVal =
        val === 'date' && this.formData.options.showTime
          ? 'YYYY-MM-DD HH:mm:ss'
          : this.formatMap[val];
      this.setPickerOption(formatVal, 'format');
      this.setPickerOption(undefined, 'defaultValue');
    },
    // 更新option单个字段
    setPickerOption (val, key) {
      this.$set(this.formData.options, [key], val);
    },
  },
};
</script>
<style lang="less" scoped>
</style>
