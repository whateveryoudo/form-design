<!--
 * @Author: ykx
 * @Date: 2021-03-02 17:38:05
 * @LastEditTime: 2021-04-21 11:35:19
 * @LastEditors: your name
 * @Description: 公共添加校验规则部分（这里提供3种规则，必填）
 * @FilePath: \form-design\src\components\FormDesign\PropsConfigPanels\ValidateItemRules.vue
-->
<template>
  <div>
    <a-divider>规则校验
      <a-tooltip title="必填项默认提示为：标签名 + '不能为空'">
        <a-icon type="question-circle-o" />
      </a-tooltip>
    </a-divider>
    <a-form-item label="是否必填">
      <a-row>
        <a-col :span="7">
          <a-checkbox v-model="formData.options.required">必填</a-checkbox>
        </a-col>
        <a-col :span="17">
          <a-input
            v-show="formData.options.required"
            v-model="formData.options.requiredMsg"
            placeholder="请输入错误提示语句"
          ></a-input>
        </a-col>
      </a-row>
    </a-form-item>
    <template v-if="formData.rules">
      <div
        v-for="(item,index) in formData.rules"
        :key="index"
        class="rules-item"
      >
        <span
          class="close-btn"
          @click="formData.rules.splice(index, 1)"
        >
          <a-icon type="close-circle" />
        </span>
        <a-form-item label="表达式">
          <a-input
            v-model="item.pattern"
            placeholder="请输入正则表达式"
          ></a-input>
        </a-form-item>
        <a-form-item label="错误提示">
          <a-input
            v-model="item.message"
            placeholder="请输入错误提示语句"
          ></a-input>
        </a-form-item>
      </div>
      <div style="margin-top: 10px">
        <span
          style="color:#1890ff; cursor: pointer;"
          @click="addRules"
        >
          <a-icon type="plus-circle" /> 添加规则
        </span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['formData'],
  data () {
    return {};
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    addRules () {
      this.formData.rules.push({
        pattern: '',
        message: '',
      });
    },
  },
};
</script>
<style scoped lang="less">
.rules-item {
  padding: 5px 6px;
  background: #f8f8f8;
  position: relative;
  border-radius: 4px;
  margin-bottom: 10px;
  .close-btn {
    position: absolute;
    right: 5px;
    top: 0;
    cursor: pointer;
    z-index: 100;
  }
}
</style>