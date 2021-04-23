/*
 * @Author: ykx
 * @Date: 2020-12-22 16:13:59
 * @LastEditTime: 2021-04-23 14:36:37
 * @LastEditors: your name
 * @Description: 统一导出部分配置项
 * @FilePath: \form-design\src\components\FormDesign\configData\comsList.js
 */
// 组件类型 layoutFields-布局类型组件， formItemFields - 表单控件  normalFields - 其余组件
export const layoutTypes = {
  layoutFields: ['Grid'],
  formItemFields: [
    'Input',
    'Textarea',
    'Aswitch',
    'DatePicker',
    'RangePicker',
    'TimePicker',
    'InputNumber',
    'Select',
    'Radio',
    'Checkbox',
  ],
  normalFields: ['Button'],
};
// 用于编译js 添加options选项
export const needOptionsFields = ['Select', 'Radio', 'Checkbox'];
// 时间类型控件
export const dateFields = ['DatePicker', 'RangePicker', 'TimePicker'];
// 默认导入json模板
export const defImportJson = {
  fields: [
    {
      type: 'Input',
      title: '普通输入框',
      model: 'input_2z6klwpcrye000',
      options: {
        label: '普通输入框',
        width: '100%',
        defaultValue: '',
        allowClear: true,
        dataType: 'string',
        placeholder: '请输入',
        disabled: false,
        required: true,
      },
      rules: [],
      key: '2z6klwpcrye000',
    },
  ],
  formConfig: {
    width: '100%',
    labelAlign: 'right',
    size: 'default',
    formModel: 'formData',
    formRef: 'antdForm',
    colon: true,
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
    layout: 'horizontal',
  },
};
// 解析模式-vue组件信息模板
export const buildVueComTpl = (jsonStr) => {
  return `<template>
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
export default {
  name: 'FormBuild',
  data () {
    return {
      widgetFormData: ${jsonStr}
    }
  },
  methods: {
     getData() {
       // 通过函数获取数据
       this.$refs['formBuildElem'].handleSubmit().then((data) => {
        console.log(data);
      }).catch(err => {
           console.log(err, '校验失败')
         })
     }
  }
}
</script>`;
};
// 解析html调用组件信息模板
export const buildHtmlComTpl = (jsonStr) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <title>表单设计器</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://unpkg.com/zd-form-build@0.1.0/lib/form-build.css">
  </head>
  
  <body>
    <div id="app">
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
  </body>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
  <script src="https://unpkg.com/zd-form-build@0.1.0/lib/form-build.umd.min.js"></script>
  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        widgetFormData: ${jsonStr}
      },
      methods: {
        getData() {
          // 通过函数获取数据
          this.$refs['formBuildElem'].handleSubmit().then((data) => {
           console.log(data);
         }).catch(err => {
              console.log(err, '校验失败')
            })
        }
      }
    })
  </script>
  </html>`
}

// 左侧元组列表
export default [
  {
    title: '基础组件',
    id: 1,
    children: [
      {
        type: 'Input',
        title: '普通输入框',
        options: {
          label: '普通输入框',
          width: '100%',
          defaultValue: '',
          allowClear: true,
          dataType: 'string',
          placeholder: '请输入',
          disabled: false,
          required: true,
          requiredMsg: '', // 必选的提示信息
        },
        rules: []
      },
      {
        type: 'Textarea',
        title: '多行文本输入框',
        options: {
          label: '多行文本输入框',
          width: '100%',
          defaultValue: '',
          rows: 3,
          required: true,
          dataType: 'string',
          pattern: '',
          placeholder: '请输入',
          disabled: false,
          requiredMsg: '',
        },
        rules: [],
      },
      {
        type: 'Aswitch',
        title: '开关',
        options: {
          label: '开关',
          width: '100%',
          defaultValue: true,
          required: false,
          disabled: false,
          requiredMsg: '',
        },
      },
      {
        type: 'Button',
        title: '按钮',
        options: {
          label: '按钮',
          type: 'default',
          ghost: false,
          defaultValue: '普通按钮',
          disabled: false,
        },
      },
      {
        type: 'DatePicker',
        title: '日期选择',
        options: {
          width: '100%',
          label: '日期选择',
          dateType: 'date',
          disabled: false,
          allowClear: true,
          placeholder: '请选择日期',
          format: 'YYYY-MM-DD HH:mm:ss',
          defaultValue: undefined, // 日期默认值，moment对象
          showTime: true, // 是否显示时间
          showToday: true, // 是否显示今天
          required: true,
          requiredMsg: '', // 必选的提示信息
        },
        rules: [],
      },
      {
        type: 'RangePicker',
        title: '日期范围选择',
        options: {
          width: '100%',
          label: '日期范围选择',
          disabled: false,
          format: 'YYYY-MM-DD HH:mm:ss',
          defaultValue: [undefined, undefined], // 日期默认值，moment对象
          showTime: true, // 是否显示时间
          placeholder: ['起始日期', '结束日期'],
          required: true,
          allowClear: true,
          requiredMsg: '', // 必选的提示信息
        },
        rules: [],
      },
      {
        type: 'TimePicker',
        title: '时间选择',
        options: {
          width: '100%',
          label: '时间选择',
          disabled: false,
          placeholder: '请选择时间',
          format: 'HH:mm:ss',
          defaultValue: undefined, // 时间默认值，moment对象
          required: true,
          requiredMsg: '', // 必选的提示信息
        },
        rules: [],
      },
      {
        type: 'InputNumber',
        title: '计数器',
        options: {
          width: '100%',
          label: '计数器',
          disabled: false,
          max: 100,
          min: 0,
          step: 1,
          defaultValue: 0,
          required: true,
          requiredMsg: '',
        },
        rules: []
      },
      {
        type: 'Select',
        title: '下拉选择框',
        options: {
          label: '下拉选择框',
          disabled: false,
          placeholder: '下拉选择框',
          mode: 'default',
          defaultValue: undefined,
          allowClear: false,
          showSearch: false,
          labelInValue: false,
          optionFilterProp: 'children',
          required: true,
          requiredMsg: '',
          option: [
            {
              label: '选项一',
              value: 1,
            },
            {
              label: '选项二',
              value: 2,
            },
          ],
        },
        rules: []
      },
      {
        type: 'Radio',
        title: '单选按钮组',
        options: {
          label: '单选按钮组',
          disabled: false,
          type: 'default',
          buttonStyle: 'outline',
          option: [
            {
              label: '选项一',
              value: 1,
            },
            {
              label: '选项二',
              value: 2,
            },
          ],
          defaultValue: undefined,
          required: true,
          requiredMsg: '',
        },
        rules: []
      },
      {
        type: 'Checkbox',
        title: '多选按钮组',
        options: {
          label: '多选按钮组',
          defaultValue: [],
          disabled: false,
          option: [
            {
              label: '选项一',
              value: '1',
            },
            {
              label: '选项二',
              value: '2',
            },
          ],
          required: true,
          requiredMsg: '',
        },
        rules: []
      },
    ],
  },
  {
    title: '布局组件',
    id: 2,
    children: [
      {
        type: 'Grid',
        title: '栅格布局',
        list: [
          { span: 12, list: [] },
          { span: 12, list: [] },
        ],
        options: {
          gutter: 0,
        },
      },
    ],
  },
];
