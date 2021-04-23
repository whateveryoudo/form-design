/*
 * @Author: ykx
 * @Date: 2021-01-21 15:44:48
 * @LastEditTime: 2021-04-23 14:52:41
 * @LastEditors: your name
 * @Description: js代码编译
 * @FilePath: \zdww-form-design\src\components\FormDesign\coreCompile\compileJs.js
 */
import { layoutTypes, needOptionsFields } from '../configData/comsList';
export default class CompileJs {
  constructor (...args) {
    this.code = '';
    this.formDataTplList = []; // 表单属性集
    this.formRulesTplList = []; // 校验规则列表
    this.optionList = []; // 字典选项列表
    // this.createdTplList = [];
    this.startCompile(...args);
  }
  startCompile (widgetFormList, formConf) {
    widgetFormList.forEach((widget) => {
      this.buildComAttr(widget);
    });
    // 导出script
    this.code = this.exportVueTpl(formConf);
  }
  buildComAttr (widget) {
    const { model, options, type } = widget;
    let defaultVal = JSON.stringify(options.defaultValue);
    // 构建data数据
    if (model && options) {
      // 表单控件添加data
      if (layoutTypes.formItemFields.includes(type)) {
        this.formDataTplList.push(`${model} : ${defaultVal},`); // 添加默认值
      }
      // 添加需要options的组件
      if (needOptionsFields.includes(type)) {
        const value = JSON.stringify(options.option);
        this.optionList.push(`${model}Options : ${value},`);
      }
    }
    // 校验规则构建
    let rules = [];
    const { required } = options;
    if (required) {
      const message =
        options.requiredMsg === ''
          ? `${options.label}不能为空`
          : `${options.requiredMsg}`;
      rules.push(
        `{required: true, message: '${message}', trigger: '${options.trigger ||
          'change'}'}`
      );
      if (widget.rules && widget.rules.length > 0) {
        widget.rules.forEach((item) => {
          if (item.pattern) {
            rules.push(
              `{ pattern: ${eval(item.pattern)}, message: '${
                item.message
              }', trigger: '${options.trigger || 'change'}' }`
            );
          }
        });
      }
    }
    // 表单字段添加验证规则 & 添加事件方法
    if (layoutTypes.formItemFields.includes(type) && required) {
      this.formRulesTplList.push(`${model}: [${rules.join(',')}],`); // 规则
    }
    // 构建子级组件属性
    if (widget.list && widget.list.length > 0) {
      widget.list.forEach((item) => {
        if (
          item.list.length > 0 &&
          !Object.prototype.hasOwnProperty.call(item, 'model')
        ) {
          item.list.forEach((list) => {
            this.buildComAttr(list);
          });
        } else if (
          item.list === 0 &&
          Object.prototype.hasOwnProperty.call(item, 'model')
        ) {
          this.buildComAttr(item);
        }
      });
    }
  }
  // buildOptions ()
  exportVueTpl (formConf) {
    return `export default{
            components: {},
            props: [],
            data () {
              return {
                ${formConf.formModel}: {
                  ${this.formDataTplList.join('\n')}
                },
                rules: {
                  ${this.formRulesTplList.join('\n')}
                },
                ${this.optionList.join('\n')}
              }
            },
            computed: {},
            watch: {},
            created () {
            },
            mounted () {},
            methods: {
            }
          }`;
  }
}
