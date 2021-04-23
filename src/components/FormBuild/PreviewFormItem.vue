<!--
 * @Author: ykx
 * @Date: 2020-12-14 15:29:34
 * @LastEditTime: 2021-04-13 17:38:54
 * @LastEditors: your name
 * @Description: 单项表单字段渲染(注：layout递归调用，由于子组件无法调用父组件，这里采用slot-scope 递归调用自身，formConfig
 * @FilePath: \form-design\src\components\FormBuild\PreviewFormItem.vue
-->
<template>
  <div>
    <!-- 布局显示 -->
    <div
      :class="[
        'form-field-item-wrapper',
        'layout-item',
      ]"
      v-if="layoutFields.includes(componentData.type)"
    >
      <component
        :is="componentData.type"
        :componentData="componentData"
      >
        <!-- 采用2.6.0后的写法(注意：这里需要将事件属性再次传入)  https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD-->
        <template v-slot:default="{ item }">
          <widget-form-item
            class="drag-handle"
            :componentData="item"
            :formConfig="formConfig"
            :formData="formData"
            @updateFormData="updateFormData"
          ></widget-form-item>
        </template>
      </component>
    </div>
    <!-- 表单项显示 -->
    <div
      :class="[
        'form-field-item-wrapper',
        'form-item',
      ]"
      v-else-if="formItemFields.includes(componentData.type)"
    >
      <a-form-model-item
        v-if="!componentData.options.hidden === true"
        :label="componentData.options.label"
        :prop="componentData.model"
      >
        <component
          previewType="parse"
          :is="componentData.type"
          :componentData="componentData"
          :formConfig="formConfig"
          :formData="formData"
          @updateFormData="updateFormData"
        ></component>
      </a-form-model-item>
    </div>
    <!-- 普通组件显示 -->
    <div
      :class="[
        'normal-item-wrapper',
        'form-item',
      ]"
      v-else
    >
      <component
        :is="componentData.type"
        :componentData="componentData"
        :formConfig="formConfig"
      ></component>
    </div>
  </div>
</template>
<script>
import FormFieldComs from '../FormDesign/FormFieldComs';
import { layoutTypes } from '../FormDesign/configData/comsList';
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
    formData: {
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
  },
  computed: {
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
    updateFormData (...args) {
      this.$emit('updateFormData', ...args);
    },
  },
};
</script>
<style scoped lang="less"></style>
