<!--
 * @Author: ykx
 * @Date: 2020-12-15 17:27:47
 * @LastEditTime: 2021-03-05 12:05:56
 * @LastEditors: your name
 * @Description: 表单基础属性配置面板(这里采用了对象引用修改props，最好采用组件通信方式处理)
 * @FilePath: \form-design\src\components\FormDesign\PropsConfigPanels\FormPropsConfig.vue
-->
<template>
  <a-form-model>
    <a-form-model-item label="表单布局">
      <a-radio-group
        buttonStyle="solid"
        v-model="config.layout"
      >
        <a-radio-button value="horizontal">水平</a-radio-button>
        <a-radio-button value="vertical">垂直</a-radio-button>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="表单宽度">
      <a-input
        allowClear
        v-model="config.width"
      ></a-input>
    </a-form-model-item>
    <a-form-model-item style='margin-bottom:0'>
      表单项栅格（水平布局生效）
      <a-tooltip title="值还原">
        <a-icon
          type="undo"
          @click="handleReset"
          style="margin-left:5px;cursor:pointer"
        />
      </a-tooltip>
    </a-form-model-item>
    <a-form-model-item>
      <a-slider
        :max="24"
        :min="0"
        :value="config.labelCol.span || 2"
        @change="handleSliderChange"
      />
    </a-form-model-item>
    <a-form-model-item label="标签对齐">
      <a-radio-group
        buttonStyle="solid"
        v-model="config.labelAlign"
      >
        <a-radio-button value="left">左对齐</a-radio-button>
        <a-radio-button value="right">右对齐</a-radio-button>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="控件尺寸">
      <a-radio-group
        buttonStyle="solid"
        v-model="config.size"
      >
        <a-radio-button value="small">小型</a-radio-button>
        <a-radio-button value="default">默认</a-radio-button>
        <a-radio-button value="large">大型</a-radio-button>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="时间选择器分隔符">
      <a-input
        allowClear
        v-model="config.separator"
      ></a-input>
    </a-form-model-item>
    <a-form-model-item label="额外属性">
      <a-checkbox v-model="config.colon"> 是否显示冒号</a-checkbox>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  props: {
    config: { type: Object },
  },
  data () {
    return {};
  },
  created () {},
  mounted () {},
  methods: {
    // 设置值(这里采用bus进行通信)
    handleSliderChange (val) {
      this.$formDesignBus.$emit('changeFormConfig', {
        labelCol: { span: val },
        wrapperCol: { span: 24 - val },
      });
    },
    handleReset () {
      this.$formDesignBus.$emit('resetFormConfigCols');
    },
  },
};
</script>
<style scoped lang="less">
.response-inputs-wrapper {
  display: flex;
  flex-wrap: wrap;
  .response-input-item {
    width: 50%;
    .item-label {
      display: inline-block;
      width: 30px;
      margin-right: 5px;
      text-align: right;
      &::after {
        content: ":";
      }
    }
  }
}
</style>
