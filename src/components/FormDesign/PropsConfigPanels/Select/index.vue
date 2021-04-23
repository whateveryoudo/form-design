<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2021-02-19 15:01:41
 * @LastEditors: Anxure
 * @LastEditTime: 2021-03-08 17:17:15
-->
<template>
  <div class="props-panel-container compact-mode">
    <vue-scroll style="height:calc(100% - 40px)">
      <a-form>
        <a-form-item label="标签">
          <a-input allowClear v-model="formData.options.label"></a-input>
        </a-form-item>
        <a-form-item label="数据字段">
          <a-input allowClear v-model="formData.model"></a-input>
        </a-form-item>
        <a-form-item label="占位内容">
          <a-input allowClear v-model="formData.options.placeholder"></a-input>
        </a-form-item>
        <a-form-item label="默认值">
          <a-select allowClear v-if="formData.options.mode==='default'" v-model="formData.options.defaultValue">
            <a-select-option v-for="item in formData.options.option" :key="item.value" :value="item.value">
              {{item.label}}</a-select-option>
          </a-select>
           <a-select v-else v-model="formData.options.multipleDefaultValue" mode="multiple">
            <a-select-option v-for="item in formData.options.option" :key="item.value" :value="item.value">
              {{item.label}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-divider>选项</a-divider>
        <template>
          <div v-for="(item,index) in formData.options.option" :key="index" class="options-item">
            <span class="close-btn" @click="formData.options.option.splice(index, 1)">
             <a-icon type="minus-circle" />
            </span>
            <a-form layout="inline">
            <a-form-item label="选项">
              <a-input v-model="item.label" style="width:80px;" ></a-input>
            </a-form-item>
            <a-form-item label="值">
              <a-input v-model="item.value"  style="width:80px;"></a-input>
            </a-form-item>
            </a-form>
          </div>
          <div style="margin-bottom:5px">
            <span style="color:#1890ff; cursor: pointer;" @click="addOptions">
              <a-icon type="plus-circle" /> 添加选项
            </span>
          </div>
        </template>
        <a-form-item label="类型">
          <a-radio-group v-model="formData.options.mode" button-style="solid">
            <a-radio-button value="default">default</a-radio-button>
            <a-radio-button value="multiple">multiple</a-radio-button>
            <!-- <a-radio-button value="tags">tags</a-radio-button> -->
          </a-radio-group>
        </a-form-item>
        <!-- <a-form-item label="返回值类型">
            <a-radio-group v-model="formData.options.labelInValue" button-style="solid">
            <a-radio-button :value="false">value</a-radio-button>
            <a-radio-button :value="true">labelInValue</a-radio-button>
          </a-radio-group>
        </a-form-item> -->
    <a-form-item
      v-if="formData.options.mode==='default'"
      label="单选模式是否可搜索"
    >
      <a-checkbox v-model="formData.options.showSearch">可搜索</a-checkbox>
    </a-form-item>
    <a-form-item label="操作设置">
      <a-checkbox v-model="formData.options.disabled">禁用</a-checkbox>
      <a-checkbox v-model="formData.options.allowClear">可清除</a-checkbox>
    </a-form-item>
    <validate-item-rules :formData="formData" />
  </a-form>
    </vue-scroll>
  </div>
</template>
<script>
import ValidateItemRules from '../ValidateItemRules';
export default {
  props: {
    formData: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {
    ValidateItemRules,
  },
  methods: {
    addOptions () {
      this.formData.options.option.push({
        label: '',
        value: '',
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>
