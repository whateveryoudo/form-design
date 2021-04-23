<!--
 * @Author: ykx
 * @Date: 2021-02-20 17:44:22
 * @LastEditTime: 2021-04-13 10:37:01
 * @LastEditors: your name
 * @Description: 导出文件确认
 * @FilePath: \form-design\src\components\FormDesign\FormCodeDrawers\ExportPrompt.vue
-->
<template>
  <a-modal
    :visible="visible"
    title="文件导出"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      v-bind="formLayout"
    >
      <a-form-model-item
        label="文件名"
        prop="fileName"
      >
        <a-input
          style="width:90%"
          placeholder="请输入"
          :max-length="10"
          v-model="form.fileName"
        ></a-input>
        <span style="margin-left:5px">.{{exportSuffix}}</span>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  props: ['visible', 'exportSuffix'],
  data () {
    return {
      form: {
        fileName: '',
      },
      formLayout: {
        wrapperCol: { span: 20 },
        labelCol: { span: 4 },
      },
      rules: {
        fileName: [
          {
            required: true,
            message: '请输入文件名',
          },
        ],
      },
    };
  },
  created () {},
  mounted () {},
  methods: {
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('triggerDownLoad', this.form.fileName);
          this.handleCancel();
        } else {
          return false;
        }
      });
    },
    handleCancel () {
      this.$emit('update:visible', false);
    },
  },
};
</script>
<style scoped>
</style>