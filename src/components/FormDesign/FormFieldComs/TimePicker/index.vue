<!--
 * @Author: ykx
 * @Date: 2021-03-04 11:46:24
 * @LastEditTime: 2021-04-13 16:46:07
 * @LastEditors: your name
 * @Description: 时间选择
 * @FilePath: \zdww-form-design\src\components\FormDesign\FormFieldComs\TimePicker\index.vue
-->
<template>
  <div>
    <a-time-picker
      :style="{width: componentData.options.width}"
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

