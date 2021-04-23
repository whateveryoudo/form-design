<template>
  <a-config-provider :locale="locale">
    <a-form-model
      ref="formDesign"
      :model="$data[formModelKey]"
      :label-col="widgetFormData.formConfig.labelCol"
      :wrapper-col="widgetFormData.formConfig.wrapperCol"
      :layout="widgetFormData.formConfig.layout"
      :labelAlign="widgetFormData.formConfig.labelAlign"
      :colon="widgetFormData.formConfig.colon"
      :rules="rules"
    >
      <preview-form-item
        class="widget-list-item-wrapper drag-handle"
        :componentData="item"
        :formConfig="widgetFormData.formConfig"
        :formData="$data[formModelKey]"
        :key="item.key"
        v-for="item in widgetFormData.fields"
        @updateFormData="handleUpdateFormData"
      ></preview-form-item>
    </a-form-model>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import PreviewFormItem from './PreviewFormItem';
import { layoutTypes } from '../FormDesign/configData/comsList'; // 添加组件类型判断
export default {
  name: 'FormBuild',
  props: {
    widgetFormData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // data中表单数据集key
    formModelKey () {
      return this.widgetFormData.formConfig.formModel || 'formData';
    },
  },
  components: {
    PreviewFormItem,
  },
  data () {
    const { fields, formConfig } = this.widgetFormData;
    const tempData = {
      [formConfig.formModel]: {},
      rules: {}, // 这里定死字段(目前仅支持单表单)
    };
    this.buildData(fields, tempData[formConfig.formModel]);
    this.buildRules(fields, tempData.rules);
    console.log(tempData);
    return {
      locale: zhCN,
      ...tempData,
    };
  },
  created () {
    console.log(this);
  },
  methods: {
    // 更新表单值
    handleUpdateFormData (key, value) {
      this.formModelKey && (this[this.formModelKey][key] = value);
    },
    /**
     * @description: 递归构建表单字段
     * @param {Object[]} fields 字段集
     * @param {Object} formModal 表单数据对象
     */
    buildData (fields, formModalData) {
      if (fields && fields.length > 0) {
        fields.forEach((item) => {
          const { options, model, list, type } = item;
          layoutTypes.formItemFields.includes(type) &&
            model &&
            (formModalData[model] = options.defaultValue);
          if (list && list.length > 0) {
            this.buildData(list, formModalData);
          }
        });
      }
    },
    /**
     * @description: 递归构建表单验证规则
     * @param {Object[]} fields 字段集
     * @param {Object} rulesData 规则数据
     */
    buildRules (fields, rulesData) {
      if (fields && fields.length > 0) {
        fields.forEach((item) => {
          const { rules, model, list, options, type } = item;
          // 判断是否必填，添加相关校验规则
          if (layoutTypes.formItemFields.includes(type)) {
            if (options.required) {
              rules.unshift({
                required: true,
                message: options.requiredMsg || `${options.label}不能为空`,
                trigger: 'change'
              });
            }
            model && (rulesData[model] = rules);
          }
          if (list && list.length > 0) {
            this.buildRules(list, rulesData);
          }
        });
      }
    },
    // 暴露提交方法
    handleSubmit () {
      return new Promise((resolve, reject) => {
        this.$refs['formDesign'].validate((valid) => {
          if (valid) {
            resolve(this[this.formModelKey]);
          } else {
            reject('error');
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>