<!--
 * @Author: ykx
 * @Date: 2021-04-09 11:06:04
 * @LastEditTime: 2021-04-14 15:37:47
 * @LastEditors: your name
 * @Description: 使用示例
 * @FilePath: \zdww-form-design\src\components\FormBuild\example\index.vue
-->
<template>
  <div>
    <form-build
      ref="formBuildElem"
      :widget-form-data="widgetFormData"
    ></form-build>
    <div style="text-align:center">
      <a-button
        @click="getData"
        type="primary"
      >提交</a-button>
    </div>
  </div>
</template>

<script>
import FormBuild from '../build.js';
const defaultFormConfigCols = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
export default {
  components: {
    FormBuild,
  },
  data () {
    return {
      widgetFormData: {
        fields: [
          {
            type: 'Input',
            title: '普通输入框',
            model: 'name',
            options: {
              label: '普通输入框',
              width: '100%',
              defaultValue: '',
              allowClear: true,
              dataType: 'string',
              placeholder: '请输入',
              disabled: false,
              required: true,
              requiredMsg: '',
            },
            rules: [],
            key: '2xsjf11zoje000',
          },
        ],
        // 表单整体属性
        formConfig: {
          width: '100%',
          labelAlign: 'right',
          size: 'default',
          formModel: 'formData',
          formRef: 'antdForm',
          separator: '~',
          colon: true, // 表示是否显示 label 后面的冒号
          ...defaultFormConfigCols,
          layout: 'horizontal', // 表单布局 'horizontal'|'vertical'|'inline'
        },
      },
    };
  },
  created () {},
  mounted () {},
  methods: {
    getData () {
      this.$refs['formBuildElem'].handleSubmit().then((data) => {
        console.log(data);
      });
    },
  },
};
</script>
<style scoped>
</style>
