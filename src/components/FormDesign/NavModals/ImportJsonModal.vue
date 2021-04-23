<!--
 * @Author: ykx
 * @Date: 2021-02-20 17:44:22
 * @LastEditTime: 2021-04-12 11:11:53
 * @LastEditors: your name
 * @Description: json导入
 * @FilePath: \zdww-form-design\src\components\FormDesign\navModals\ImportJsonModal.vue
-->
<template>
  <a-modal
    :visible="visible"
    title="json导入"
    @ok="handleRefresh"
    width="50%"
    @cancel="handleCancel"
  >
    <a-alert
      type="info"
      style="margin-bottom:10px"
    >
      <div
        class="tip"
        slot="message"
      >请按照如下格式导入：<span>（注：这里只会校验json是否符合规则，不会准确校验字段名。）</span></div>
    </a-alert>
    <code-edit
      ref="jsonEditor"
      :codes="jsonCode"
      @onCodeChange="handleCodeChange"
      :editorOptions="{language: 'json', theme: 'vs'}"
      containerH="500px"
    />
    <a-divider />
    <a-upload
      style="margin-top:10px"
      :beforeUpload="beforeUpload"
      accept="application/json"
      :showUploadList="false"
    >
      <a-button type="primary">
        <a-icon type="upload" /> 导入json文件
      </a-button>
    </a-upload>
    <a-button
      style="margin-left:10px"
      @click="handleReset"
    >
      <a-icon type="undo" />重置
    </a-button>
  </a-modal>
</template>

<script>
import CodeEdit from '@/components/CodeEdit';
import beautifier from 'js-beautify';
import { beautifierConf } from '@/utils';
import { defImportJson } from '../configData/comsList';
export default {
  props: {
    visible: {
      type: Boolean,
    },
    widgetFormData: {
      type: Object,
    },
  },
  components: {
    CodeEdit,
  },
  data () {
    return {
      jsonCode: '',
    };
  },
  created () {
    const tempJson = JSON.stringify(defImportJson);
    this.jsonCode = beautifier.js(tempJson, beautifierConf.js);
  },
  mounted () {},
  methods: {
    handleCancel () {
      this.$emit('closeModal');
    },
    handleReset () {
      const tempJson = JSON.stringify(defImportJson);
      this.jsonCode = beautifier.js(tempJson, beautifierConf.js);
      this.$refs.jsonEditor.setValue(this.jsonCode);
    },
    handleCodeChange (val) {
      this.jsonCode = val;
    },
    /**
     * @description: 导入前获取文本（这里不会实际上传，仅获取上传得文件内容）
     * @param {*}
     */
    beforeUpload (e) {
      const reader = new FileReader();
      reader.readAsText(e);
      reader.onload = (event) => {
        this.jsonCode = event.target.result;
        this.$refs.jsonEditor.setValue(this.jsonCode); // 更新code,这里调用编辑器内部方法更新，采用watch,输入光标会重置

        this.handleRefresh(false);
      };
      return false;
    },
    /**
     * @description: 更新json配置
     * @param {Boolean} isSure  是否点击确认操作
     */
    handleRefresh (isSure = true) {
      try {
        const tempData = JSON.parse(this.jsonCode);
        this.$emit('triggerRefresh', tempData, true);
        if (isSure) {
          this.handleCancel();
          this.$message.success('导入成功');
        }
      } catch (e) {
        this.$notification.error({
          message: '系统提示',
          description: '导入失败:' + e,
        });
      }
    },
  },
};
</script>
<style scoped lang="less">
.tip {
  span {
    color: #f5222d;
    font-size: 12px;
  }
}
</style>