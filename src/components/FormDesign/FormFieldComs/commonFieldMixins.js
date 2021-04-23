/*
 * @Author: ykx
 * @Date: 2021-04-12 09:30:30
 * @LastEditTime: 2021-04-13 17:39:23
 * @LastEditors: your name
 * @Description: 控件渲染公共属性&方法集合
 * @FilePath: \form-design\src\components\FormDesign\FormFieldComs\commonFieldMixins.js
 */
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
  data () {
    return {
      value: '',
    };
  },
  computed: {
    curValue () {
      return this.previewType === 'generator'
        ? this.componentData.options.defaultValue
        : this.value;
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
  created () {
    this.value = this.componentData.options.defaultValue;
  },
  methods: {
    updateField (key, value) {
      // parse模式下，不会更新原有字段
      if (this.previewType === 'generator') {
        this.componentData.options.defaultValue = value;
      } else {
        this.value = value;
        this.$emit('updateFormData', key, value)
      }
      // https://github.com/vueComponent/ant-design-vue/blob/1.x/components/form-model/FormItem.jsx
      this.$emit('change', value); // 需要更新change 才能触发验证？？？
    },
  },
};
