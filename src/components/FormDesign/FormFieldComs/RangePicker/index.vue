<!--
 * @Author: ykx
 * @Date: 2021-03-04 11:46:24
 * @LastEditTime: 2021-04-13 14:56:51
 * @LastEditors: your name
 * @Description: 日期范围选择
 * @FilePath: \form-design\src\components\FormDesign\FormFieldComs\RangePicker\index.vue
-->

<template>
  <div>
    <a-range-picker
      :style="{width: componentData.options.width}"
      :size="formConfig.size"
      :value="momentVal"
      :separator="formConfig.separator"
      :showTime="componentData.options.showTime ? {
                defaultValue: [
                  moment('00:00:00', 'HH:mm:ss'),
                  moment('23:59:59', 'HH:mm:ss')
                ]
      } : false"
      v-bind="filterProps"
      @change="dates => handleDateChange(componentData.model, dates)"
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
        return defaultValue.map((val) => {
          return val ? moment(val, format) : undefined;
        });
      } else {
        return this.value;
      }
    },
    // 过滤冗余属性
    filterProps () {
      return omit({ ...this.componentData.options }, [
        'label',
        'width',
        'defaultValue',
        'required',
        'requiredMsg',
      ]);
    },
  },
  data () {
    return {
      value: [undefined, undefined],
    };
  },
  created () {
    const { defaultValue, format } = this.componentData.options;
    this.value = defaultValue.map((val) => {
      return val ? moment(val, format) : undefined;
    });
  },
  mounted () {
  },
  methods: {
    moment,
    // 值更新
    handleDateChange (key, dates) {
      const { format } = this.componentData.options;
      const tempVal = dates.map((val) => {
        return val ? moment(val).format(format) : undefined;
      });
      if (this.previewType === 'generator') {
        this.$set(this.componentData.options, 'defaultValue', tempVal);
      } else {
        this.value = dates;
        this.$emit('updateFormData', key, dates);
        this.$emit('change', dates);
      }
    },
  },
};
</script>
<style scoped></style>

