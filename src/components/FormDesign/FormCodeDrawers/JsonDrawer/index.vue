<!--
 * @Author: ykx
 * @Date: 2021-02-08 17:23:28
 * @LastEditTime: 2021-02-23 18:22:16
 * @LastEditors: your name
 * @Description: json查看
 * @FilePath: \zdww-form-design\src\components\FormDesign\FormCodeDrawers\JsonDrawer\index.vue
-->
<template>
  <a-drawer
    class="no-padding"
    width="40%"
    :visible="visible"
    :closable="false"
    @close="onClose"
  >
    <div class="action-bar">
      <span
        class="item-item"
        @click="handleRefresh"
      >
        <a-icon type="reload" />刷新
      </span>
      <span
        class="item-item"
        @click="handleExportFile"
      >
        <a-icon type="cloud-download" />导出json文件
      </span>
      <span
        class="item-item"
        v-clipboard:copy="jsonCode"
      >
        <a-icon type="copy" />复制json
      </span>
      <span
        class="item-item close"
        @click="onClose"
      >
        <a-icon type="close-circle" />关闭
      </span>
    </div>
    <code-edit
      :codes="jsonCode"
      @onCodeChange="handleCodeChange"
      @triggerKeyDown="handleKeyDown"
      :editorOptions="{language: 'json'}"
      containerH="calc(100vh - 34px)"
    />
    <export-prompt
      :visible.sync="promptVisible"
      exportType="json"
      @triggerDownLoad="handleDownLoad"
    ></export-prompt>
  </a-drawer>
</template>

<script>
import CodeEdit from '@/components/CodeEdit';
import ExportPrompt from '../ExportPrompt.vue';
import { saveAs } from 'file-saver';
import clipboard from '@/directive/clipboard';
import beautifier from 'js-beautify';
import { beautifierConf } from '@/utils';
export default {
  props: {
    visible: {
      type: Boolean,
    },
    widgetFormData: {
      type: Object,
    },
    formConfig: {
      type: Object,
    },
  },
  directives: {
    clipboard,
  },
  components: {
    CodeEdit,
    ExportPrompt,
  },
  data () {
    return {
      jsonCode: '',
      promptVisible: false,
    };
  },
  created () {
    const tempJson = JSON.stringify(this.widgetFormData);
    this.jsonCode = beautifier.js(tempJson, beautifierConf.js);
  },
  mounted () {},
  methods: {
    // json导出
    handleExportFile () {
      this.promptVisible = true;
    },
    onClose () {
      this.$emit('closeDrawer');
    },
    handleCodeChange (val) {
      this.jsonCode = val;
    },
    /**
     * @description: 编辑器按键事件
     * @param {*}
     */
    handleKeyDown (e) {
      // ctrl + s | meta + s 保存刷新
      if (e.keyCode === 49 && (e.metaKey || e.ctrlKey)) {
        this.handleRefresh();
      }
    },
    /**
     * @description: json下载
     * @param {*}
     */
    handleDownLoad (fileName) {
      const blob = new Blob([this.jsonCode], {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(blob, fileName + '.json');
    },
    /**
     * @description: 更新json配置
     * @param {*}
     */
    handleRefresh () {
      try {
        this.$emit('triggerRefresh', JSON.parse(this.jsonCode));
      } catch (e) {
        this.$notification.error({
          message: '系统提示',
          description: 'JSON格式错误:' + e,
        });
      }
    },
  },
};
</script>
<style scoped></style>
