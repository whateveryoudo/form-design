/*
 * @Author: ykx
 * @Date: 2021-01-15 17:03:38
 * @LastEditTime: 2021-04-23 17:03:41
 * @LastEditors: your name
 * @Description: html代码编译
 * @FilePath: \zdww-form-design\src\components\FormDesign\coreCompile\compileHtml.js
 */
import { layoutTypes } from '../configData/comsList';
// 导出vue文件时，拼接标签方法
export const buildVueTpl = (str) => {
  return `<template>
    <div>
      ${str}
    </div>
  </template>`;
};
export const buildVueScript = (str) => {
  return `<script>
    ${str}
  </script>`;
};
export const buildVueCss = (str) => {
  return `<style>
    ${str}
  </style>`;
};
export default class CompileHtml {
  constructor (...args) {
    this.code = '';
    this.formConf = args[1]; // 存入表单配置项
    this.startRender(...args);
  }
  /**
   * @description: 追加form容器标签
   * @param {Object} formConf 表单配置
   * @param {String} childCode 子项拼接后的str
   */
  buildFormWrapper = (formConf, childCode) => {
    const {
      width,
      labelAlign,
      colon,
      layout,
      formRef,
      labelCol,
      wrapperCol,
      formModel,
    } = formConf;
    const widthStr = width === '100%' ? '' : `:style={width: ${width}}`; // 构建宽度字符串
    const labelAlignConfig =
      labelAlign === 'right' ? '' : `labelAlign="${labelAlign}"`;
    const layoutConfig = layout === 'horizontal' ? '' : `layout="${layout}"`;
    const colonConfig = colon ? '' : `colon="${colon}"`;
    return `<a-form-model ref="${formRef}" ${colonConfig} ${widthStr} :rules="rules" ${labelAlignConfig} :model="${formModel}" ${layoutConfig} :labelCol='${JSON.stringify(
      labelCol
    )}' :wrapperCol='${JSON.stringify(wrapperCol)}'>
    ${childCode}
    </a-form-model>`;
  };
  /**
   * @description: 栅格渲染
   * @param {Object} scheme 当前组件配置项
   */
  gridRender = (scheme) => {
    const gutter = scheme.gutter ? `:gutter="${scheme.gutter}"` : '';
    let children = '';
    if (scheme.list.length > 0) {
      children = scheme.list.map((el) => {
        const { span } = el;
        const tempStr = this.loopRender(el.list);
        return `<a-col :span="${span}">
            ${tempStr}
      </a-col>`;
      });
    }
    let str = `<a-row ${gutter}>
      ${children.join('\n')}
      </a-row>`;
    return str;
  };
  /**
   * @description: 递归编译组件code
   * @param {Object[]} widgetFormList 当前选中组件集
   */
  loopRender = (widgetFormList) => {
    if (!widgetFormList || widgetFormList.length === 0) {
      return '';
    }
    const templateList = [];
    widgetFormList.forEach((el) => {
      const targetRenderType = Object.keys(layoutTypes).find((key) =>
        layoutTypes[key].includes(el.type)
      );
      // 普通渲染下直接渲染组件
      const renderFnStr =
        targetRenderType === 'normalFields'
          ? `${el.type.toLowerCase()}Render`
          : `${targetRenderType}Render`;
      if (renderFnStr && typeof this[renderFnStr] === 'function') {
        templateList.push(this[renderFnStr](el));
      }
    });
    return templateList.join('\n');
  };
  /**
   * @description: 基础公共属性提取
   * @param {*}
   */
  commonAttrBuilder = (scheme) => {
    const { options, model } = scheme;
    const { size, formModel } = this.formConf;
    const disabled = options.disabled ? 'disabled' : '';
    const allowClear = options.allowClear ? 'allowClear' : '';
    // 处理数组情况
    const placeholder = options.placeholder
      ? Array.isArray(options.placeholder)
        ? `:placeholder='${JSON.stringify(options.placeholder)}'`
        : `placeholder="${options.placeholder}"`
      : '';
    const fieldSize = size === 'default' ? '' : `size="${size}"`;
    const vModel = `v-model="${formModel}.${model}"`;
    return {
      disabled,
      allowClear,
      size: fieldSize,
      vModel,
      placeholder,
    };
  };
  /**
   * @description: 输入框渲染
   * @param {Object} scheme 当前组件配置项
   */
  inputRender = (scheme) => {
    const {
      vModel,
      disabled,
      allowClear,
      placeholder,
      size,
    } = this.commonAttrBuilder(scheme);
    return `<a-input ${vModel} ${disabled} ${allowClear} ${placeholder} ${size}></a-input>`;
  };
  textareaRender = (scheme) => {
    const { options } = scheme;
    const {
      vModel,
      disabled,
      allowClear,
      placeholder,
    } = this.commonAttrBuilder(scheme);
    const rows = options.rows ? `rows="${options.rows}"` : 'rows="1"';
    return `<a-textarea ${vModel} ${disabled} ${allowClear} ${placeholder} ${rows}></a-textarea>`;
  };
  buttonRender = (scheme) => {
    const { options } = scheme;
    const { disabled, size } = this.commonAttrBuilder(scheme);
    const type = options.type === 'default' ? '' : `type="${options.type}"`;
    const ghost = options.ghost ? `ghost="${options.ghost}"` : '';
    return `<a-button ${disabled} ${size} ${type} ${ghost}>${options.defaultValue}</a-button>`;
  };
  aswitchRender = (scheme) => {
    const { vModel, disabled, size } = this.commonAttrBuilder(scheme);
    return `<a-switch ${vModel} ${disabled} ${size}></a-switch>`;
  };
  inputNumberRender = (scheme) => {
    const { vModel, disabled, size } = this.commonAttrBuilder(scheme);
    const { options } = scheme;
    const min = options.min ? `:min="${options.min}"` : ':min="0"';
    const max = options.max ? `:max="${options.max}"` : ':max="10"';
    const step = options.step ? `:step="${options.step}"` : ':step="1"';
    return `<a-input-number ${vModel} ${disabled} ${min} ${max} ${step} ${size}></a-inpuit-number>`;
  };
  radioRender = (scheme) => {
    const { vModel, disabled, size } = this.commonAttrBuilder(scheme);
    const { options } = scheme;
    const type = options.type;
    const buttonStyle =
      type === 'default'
        ? ''
        : options.buttonStyle === 'outline'
        ? ''
        : `button-style="${options.buttonStyle}"`;
    let child = this.buildRadioGroupChild(scheme);
    if (child) child = `\n${child}\n`;
    return `<a-radio-group ${vModel} ${disabled} ${size} ${buttonStyle}>${child}</a-radio-group>`;
  };
  /**
   * @description: 构建radioGroup的子集元素
   * @param {*} scheme 当前组件的属性
   * @return {tpl} 资源的templat模板
   */
  buildRadioGroupChild = (scheme) => {
    const children = [];
    const { options } = scheme;
    const tag = options.type === 'default' ? 'a-radio' : 'a-radio-button';
    children.push(
      `<${tag} v-for="(item, index) in ${scheme.model}Options" :key="index" :value="item.value">{{item.label}}</${tag}>`
    );
    return children.join('\n');
  };
  checkboxRender = (scheme) => {
    const { vModel, disabled, size } = this.commonAttrBuilder(scheme);
    let child = this.buildCheckboxChild(scheme);
    child = `\n${child}\n`;
    return `<a-checkbox-group ${vModel} ${disabled} ${size}>${child}</a-checkbox-group>`;
  };
  /**
   * @description: 构建checkBox子元素
   * @param {Object} scheme 当前组件的属性
   * @return {tpl} 返回子元素的template
   */
  buildCheckboxChild = (scheme) => {
    const children = [];
    children.push(
      `<a-checkbox v-for="(item, index) in ${scheme.model}Options" :key="index" :value="item.value">{{item.label}}</a-checkbox>`
    );
    return children.join('\n');
  };
  selectRender = (scheme) => {
    const {
      vModel,
      disabled,
      size,
      placeholder,
      allowClear,
    } = this.commonAttrBuilder(scheme);
    const { options } = scheme;
    const mode = options.mode === 'default' ? '' : `mode="${options.mode}"`;
    const showSearch =
      options.mode === 'default' && options.showSearch ? 'showSearch' : '';
    let child = this.buidlSelectChild(scheme);
    child = `\n${child}\n`;
    return `<a-select ${vModel} ${disabled} ${size} ${mode} ${placeholder} ${allowClear} ${showSearch}>${child}</a-select>`;
  };
  /**
   * @description: 构建select子元素
   * @param {object} scheme 当前组件的属性
   * @return {tpl} 返回子元素的template
   */
  buidlSelectChild = (scheme) => {
    const children = [];
    children.push(
      `<a-select-option v-for="(item, index) in ${scheme.model}Options" :key="index" :value="item.value">{{item.label}}</a-select-option>`
    );
    return children.join('\n');
  };
  /**
   * @description: 日期控件渲染（日 & 月 & 周）
   * @param {Object} scheme 当前组件配置项
   */
  datePickerRender = (scheme) => {
    const {
      allowClear,
      disabled,
      size,
      vModel,
      placeholder,
    } = this.commonAttrBuilder(scheme);
    const format = `format="${scheme.options.format}"`;
    switch (scheme.options.dateType) {
      case 'date':
        return `<a-date-picker ${allowClear} ${disabled} ${size} ${vModel} ${format} ${placeholder}></a-date-picker>`;
      case 'month':
        return `<a-month-picker ${allowClear} ${disabled} ${size} ${vModel} ${format} ${placeholder}></a-month-picker>`;
      case 'week':
        return `<a-week-picker ${allowClear} ${disabled} ${size} ${vModel} ${format} ${placeholder}></a-week-picker>`;
    }
  };
  rangePickerRender = (scheme) => {
    const format = `format="${scheme.options.format}"`;
    const {
      allowClear,
      disabled,
      size,
      vModel,
      placeholder,
    } = this.commonAttrBuilder(scheme);
    return `<a-range-picker ${allowClear} ${disabled} ${size} ${vModel}  ${placeholder} ${format}></a-range-picker>`;
  };
  timePickerRender = (scheme) => {
    const format = `format="${scheme.options.format}"`;
    const {
      allowClear,
      disabled,
      size,
      vModel,
      placeholder,
    } = this.commonAttrBuilder(scheme);
    return `<a-time-picker ${allowClear} ${disabled} ${placeholder} ${size} ${vModel} ${format}/>`;
  };
  /**
   * @description: 表单组件项渲染
   * @param {Object} scheme 当前组件配置项
   */
  formItemFieldsRender = (scheme) => {
    const { type, model, options } = scheme;
    const formComRenderFn = this[
      `${type.charAt(0).toLowerCase()}${type.slice(1)}Render`
    ]; // 修改第一位为小写
    const tempStr =
      formComRenderFn && typeof formComRenderFn === 'function'
        ? formComRenderFn(scheme)
        : ''; // 调用具体表单组件渲染方法
    return `<a-form-model-item label="${options.label}" prop="${model}">${tempStr}</a-form-model-item>`;
  };
  /**
   * @description:布局渲染 (Grid - 栅格)
   * @param {Object} target 当前布局组件对象
   */
  layoutFieldsRender = (target) => {
    switch (target.type) {
      case 'Grid':
        return this.gridRender(target);
    }
  };
  /**
   * @description: 构建模板编译骨架
   * @param {Array} widgetFormList 当前选中组件集
   * @param {Object} formConf 表单属性配置对象
   */
  startRender (widgetFormList, formConf) {
    if (!widgetFormList || widgetFormList.length === 0) {
      this.code = '';
    }
    const templateList = [];
    widgetFormList.forEach((el) => {
      const targetRenderType = Object.keys(layoutTypes).find((key) =>
        layoutTypes[key].includes(el.type)
      );
      // 普通渲染下直接渲染组件
      const renderFnStr =
        targetRenderType === 'normalFields'
          ? `${el.type.toLowerCase()}Render`
          : `${targetRenderType}Render`;
      if (renderFnStr && typeof this[renderFnStr] === 'function') {
        templateList.push(this[renderFnStr](el));
      } 
    });
    const tempCode = templateList.length > 0 ? templateList.join('\n') : '';
    // 包裹form容器
    this.code = this.buildFormWrapper(formConf, tempCode);
  }
}
