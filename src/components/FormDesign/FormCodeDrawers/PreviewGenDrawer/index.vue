<!--
 * @Author: ykx
 * @Date: 2020-12-22 16:13:59
 * @LastEditTime: 2021-04-12 15:50:53
 * @LastEditors: your name
 * @Description: 预览界面查看（包含代码编辑，界面查看）
 * @FilePath: \zdww-form-design\src\components\FormDesign\FormCodeDrawers\PreviewGenDrawer\index.vue
-->
<template>
  <a-drawer class="no-padding" :mask="false" :width="drawerWidth" :visible="visible" :closable="false" @close="onClose">
    <a-row>
      <a-col :span="12">
        <code-edit-panel :widgetFormList="widgetFormList" :templateCode="templateCode" :scriptCode="scriptCode" :cssCode="cssCode" :formConfig="formConfig" @updateCode="handleUpdateCode" />
      </a-col>
      <a-col :span="12">
        <form-preview-panel @closePreview="onClose" :scriptCode="scriptCode" :templateCode="templateCode" :cssCode="cssCode" :formConfig="formConfig" />
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script>
import CodeEditPanel from './CodeEditPanel';
import FormPreviewPanel from './FormPreviewPanel';
import CompileHtml from '../../coreCompile/compileHtml';
import CompileJs from '../../coreCompile/compileJs';
import beautifier from 'js-beautify';
import { beautifierConf } from '@/utils';
export default {
  props: {
    visible: {
      type: Boolean
    },
    widgetFormList: {
      type: Array
    },
    formConfig: {
      type: Object
    }
  },
  components: {
    CodeEditPanel,
    FormPreviewPanel
  },
  data () {
    return {
      drawerWidth: 0,
      templateCode: '', // 处理后的html字符串
      scriptCode: '', // 处理后的js字符串
      cssCode: ''
    };
  },
  destroyed () {
    window.removeEventListener('resize', this.handleSetWidth);
  },
  created () {
    // 100% 无效？
    this.handleSetWidth();
    // 初始化编辑器code
    const tempHtml = new CompileHtml(this.widgetFormList, this.formConfig).code;
    const tempJs = new CompileJs(this.widgetFormList, this.formConfig).code;
    this.templateCode = beautifier.html(tempHtml, beautifierConf.html);
    this.scriptCode = beautifier.js(tempJs, beautifierConf.js);
  },
  mounted () {
    window.addEventListener('resize', this.handleSetWidth);
  },
  methods: {
    /**
     * @description:更新模板字符串
     * @param {*}
     */
    handleUpdateCode (type, str) {
      this[type] !== undefined && (this[type] = str);
    },
    onClose () {
      this.$emit('closeDrawer');
    },
    handleSetWidth () {
      this.drawerWidth = (document.body.clientWidth || document.documentElement.clientWidth) + 1 + 'px';
    }
  }
};
</script>
<style scoped></style>
