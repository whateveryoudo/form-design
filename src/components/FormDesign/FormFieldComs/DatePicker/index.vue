<!--
 * @Author: ykx
 * @Date: 2021-02-19 15:44:45
 * @LastEditTime: 2021-04-13 14:49:45
 * @LastEditors: your name
 * @Description: 日期选择（日 & 月 & 周选择）
 * @FilePath: \zdww-form-design\src\components\FormDesign\FormFieldComs\DatePicker\index.vue
-->

<template>
  <div>
    <a-date-picker
      :style="{width: componentData.options.width}"
      v-if="componentData.options.dateType === 'date'"
      :size="formConfig.size"
      :value="momentVal"
      v-bind="filterProps"
      @change="value => handleDateChange(componentData.model, value)"
      :showTime="componentData.options.showTime ? {
                defaultValue: [
                  moment('00:00:00', 'HH:mm:ss'),
                  moment('23:59:59', 'HH:mm:ss')
                ]
      } : false"
    />
    <a-month-picker
      :style="{width: componentData.options.width}"
      v-else-if="componentData.options.dateType === 'month'"
      :size="formConfig.size"
      :value="momentVal"
      v-bind="filterProps"
      @change="value => handleDateChange(componentData.model, value)"
    />
    <a-week-picker
      :style="{width: componentData.options.width}"
      v-else-if="componentData.options.dateType === 'week'"
      :size="formConfig.size"
      :value="momentVal"
      v-bind="filterProps"
      @change="value => handleDateChange(componentData.model, value)"
    />
  </div>

</template>

<script>
import moment from 'moment';
import omit from 'lodash/omit';
export default {
  props: {
    componentData: {
      type: Object,
      default: () => {},
    },
    formConfig: {
      type: Object,
      default: () => {},
    },
    previewType: {
      type: String,
      default: 'generator',
    },
  },
  computed: {
    momentVal () {
      const { defaultValue, format } = this.componentData.options;
      if (this.previewType === 'generator') {
        if (!defaultValue) {
          return undefined;
        } else {
          return moment(defaultValue, format);
        }
      } else {
        return this.value;
      }
    },
    // 过滤冗余属性
    filterProps () {
      return omit({ ...this.componentData.options }, [
        'label',
        'width',
        'dateType',
        'defaultValue',
        'required',
        'requiredMsg',
      ]);
    },
  },
  data () {
    return {
      value: undefined,
    };
  },
  created () {
    const { defaultValue, format } = this.componentData.options;
    this.value = defaultValue ? moment(defaultValue, format) : undefined;
  },
  mounted () {},
  methods: {
    moment,
    // 值更新（不emit）
    handleDateChange (key, value) {
      const { format } = this.componentData.options;
      const tempVal = value ? moment(value).format(format) : undefined;
      if (this.previewType === 'generator') {
        this.$set(this.componentData.options, 'defaultValue', tempVal); // defaultValue更新为字符串形式
      } else {
        this.value = value;
        this.$emit('updateFormData', key, value);
        this.$emit('change', value);
      }
    },
  },
};
</script>
<style scoped></style>

