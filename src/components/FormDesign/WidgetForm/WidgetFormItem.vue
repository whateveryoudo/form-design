<!--
 * @Author: ykx
 * @Date: 2020-12-14 15:29:34
 * @LastEditTime: 2021-04-13 19:28:41
 * @LastEditors: your name
 * @Description: 单项表单字段渲染(注：layout递归调用，由于子组件无法调用父组件，这里采用slot-scope 递归调用自身，formConfig,selectedField无需回传)
 * @FilePath: \form-design\src\components\FormDesign\WidgetForm\WidgetFormItem.vue
-->
<template>
  <div @click.stop="selectItem">
    <!-- 布局显示 -->
    <div
      :class="[
        'form-field-item-wrapper',
        'layout-item',
        isSelected && 'selected'
      ]"
      v-if="layoutFields.includes(componentData.type)"
    >
      <component
        :is="componentData.type"
        :componentData="componentData"
      >
        <!-- 采用2.6.0后的写法  https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD-->
        <template v-slot:default="{ item }">
          <widget-form-item
            class="drag-handle"
            :componentData="item"
            :formConfig="formConfig"
            :selectedField="selectedField"
          ></widget-form-item>
        </template>
      </component>
      <!-- 操作元素 -->
      <operate-handle
        v-if="isSelected"
        :curField="componentData"
      />
    </div>
    <!-- 表单项显示 -->
    <div
      :class="[
        'form-field-item-wrapper',
        'form-item',
        isSelected && 'selected'
      ]"
      v-else-if="formItemFields.includes(componentData.type)"
    >
      <a-form-item
        v-if="!componentData.options.hidden === true"
        :label="componentData.options.label"
        v-bind="formItemProps"
      >
        <component
          previewType="generator"
          :is="componentData.type"
          :componentData="componentData"
          :formConfig="formConfig"
        ></component>
      </a-form-item>
      <!-- 操作元素 -->
      <operate-handle
        v-if="isSelected"
        :curField="componentData"
      />
      <key-flag
        v-if="isSelected"
        :curField="componentData"
      />
    </div>
    <!-- 普通组件显示 -->
    <div
      :class="[
        'normal-item-wrapper',
        'form-item',
        isSelected && 'selected'
      ]"
      v-else
    >
      <component
        :is="componentData.type"
        :componentData="componentData"
        :formConfig="formConfig"
      ></component>
      <!-- 操作元素 -->
      <operate-handle
        v-if="isSelected"
        :curField="componentData"
      />
      <key-flag
        v-if="isSelected"
        :curField="componentData"
      />
    </div>
  </div>
</template>
<script>
import FormFieldComs from '../FormFieldComs';
import OperateHandle from './OperateHandle';
import KeyFlag from './KeyFlag';
import { layoutTypes } from '../configData/comsList';
import draggable from 'vuedraggable';
import omit from 'lodash/omit';
export default {
  name: 'WidgetFormItem',
  props: {
    componentData: {
      type: Object,
    },
    formConfig: {
      type: Object,
    },
    selectedField: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      ...layoutTypes,
    };
  },
  components: {
    ...FormFieldComs,
    OperateHandle,
    KeyFlag,
    draggable,
  },
  computed: {
    isSelected () {
      return this.selectedField
        ? this.componentData.key === this.selectedField.key
        : false;
    },
    // 当前formItem属性集
    formItemProps () {
      const { layout, width } = this.formConfig;
      const mergeOption = omit(
        {
          ...this.formConfig,
          ...this.componentData.options,
        },
        ['width']
      );
      // 参数处理（水平下栅格有效）
      return {
        ...mergeOption,
        labelCol: layout === 'horizontal' ? mergeOption.labelCol : {},
        wrapperCol: layout === 'horizontal' ? mergeOption.wrapperCol : {},
        style: { width },
      };
    },
  },
  created () {},
  mounted () {},

  methods: {
    /**
     * @description:点击选中当前项
     * @param {*}
     */
    selectItem () {
      this.$formDesignBus.$emit('selectFormItem', this.componentData);
    },
  },
};
</script>
<style scoped lang="less"></style>
