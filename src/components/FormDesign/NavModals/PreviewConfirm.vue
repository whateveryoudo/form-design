<!--
 * @Author: ykx
 * @Date: 2021-02-20 17:44:22
 * @LastEditTime: 2021-04-12 11:45:48
 * @LastEditors: your name
 * @Description: 预览二次确认
 * @FilePath: \zdww-form-design\src\components\FormDesign\navModals\PreviewConfirm.vue
-->
<template>
  <a-modal
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <span slot="title">
      请选择预览形式
      <a-tooltip title="generator形式为模板形式，支持手动修改，保存;parse为组件解析形式，修改后无效">
        <a-icon type="question-circle" />
      </a-tooltip>
    </span>
    <a-form-model
      ref="ruleForm"
      :model="form"
      v-bind="formLayout"
    >
      <a-form-model-item
        style="margin-left: 15px"
        label=""
        prop="prviewType"
      >
        <a-radio-group
          name="prviewType"
          v-model="form.prviewType"
        >
          <a-radio :value="1">
            generator形式
          </a-radio>
          <a-radio :value="2">
            parse形式
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  props: ['visible'],
  data () {
    return {
      form: {
        prviewType: 1,
      },
      formLayout: {
        wrapperCol: { span: 20 },
        labelCol: { span: 4 },
      },
    };
  },
  created () {},
  mounted () {},
  methods: {
    handleOk () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('triggerChoose', this.form.prviewType);
          this.handleCancel();
        }
      });
    },
    handleCancel () {
      this.$emit('closeModal');
    },
  },
};
</script>
<style scoped>
</style>