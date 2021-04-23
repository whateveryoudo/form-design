<!--
 * @Author: ykx
 * @Date: 2021-01-20 09:32:33
 * @LastEditTime: 2021-04-22 11:56:47
 * @LastEditors: your name
 * @Description: 组件预览
 * @FilePath: \zdww-form-design\src\components\FormDesign\FormCodeDrawers\PreviewGenDrawer\FormPreviewPanel.vue
-->
<template>
  <div class="preview-panel">
    <div class="action-bar">
      <span
        class="item-item"
        @click="buildCode"
      >
        <a-icon type="reload" />刷新
      </span>
      <span
        class="item-item"
        @click="promptVisible = true"
      >
        <a-icon type="cloud-download" />导出vue文件
      </span>
      <span class="item-item"  v-clipboard:copy="vueCode">
        <a-icon
          type="copy"
        />复制代码
      </span>
      <span
        class="item-item close"
        @click="closePreview"
      >
        <a-icon type="close-circle" />关闭
      </span>
    </div>
    <div class="iframe-wrapper">
      <iframe
        v-show="iframeLoaded"
        ref="previewPage"
        frameborder="0"
        src="preview.html"
        @load="iframeLoad()"
      ></iframe>
      <a-spin
        :spinning="!iframeLoaded"
        size="large"
      ></a-spin>
    </div>
    <export-prompt
      :visible.sync="promptVisible"
      exportSuffix="vue"
      @triggerDownLoad="handleDownLoad"
    ></export-prompt>
  </div>
</template>

<script>
import { parse } from '@babel/parser';
import beautifier from 'js-beautify';
import ExportPrompt from '../ExportPrompt.vue';
import clipboard from '@/directive/clipboard';
import { saveAs } from 'file-saver';
import {
  buildVueTpl,
  buildVueScript,
  buildVueCss,
} from '../../coreCompile/compileHtml';
import { beautifierConf } from '@/utils';
export default {
  props: {
    templateCode: {
      type: String,
    },
    scriptCode: {
      type: String,
    },
    cssCode: {
      type: String,
    },
  },
  directives: {
    clipboard,
  },
  components: {
    ExportPrompt,
  },
  data () {
    return {
      iframeLoaded: false,
      promptVisible: false,
    };
  },
  computed: {
    vueCode () {
      // 拼接后的vue代码
      return beautifier.html(
        buildVueTpl(this.templateCode) +
          buildVueScript(this.scriptCode) +
          buildVueCss(this.cssCode),
        beautifierConf.html
      );
    },
  },
  methods: {
    closePreview () {
      this.$emit('closePreview');
    },
    iframeLoad () {
      this.iframeLoaded = true;
      this.buildCode();
    },
    /**
     * @description: vue下载
     * @param {*}
     */
    handleDownLoad (fileName) {
      const blob = new Blob([this.vueCode], {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(blob, fileName + '.vue');
    },
    buildCode () {
      try {
        const ast = parse(this.scriptCode, { sourceType: 'module' });
        const astBody = ast.program.body;
        if (astBody.length > 1) {
          this.$message.warning(
            'js格式不能识别，仅支持export default的对象内容'
          );
          return;
        }
        if (astBody[0].type === 'ExportDefaultDeclaration') {
          const postData = {
            type: 'refreshFrame',
            data: {
              templateCode: this.templateCode,
              scriptCode: this.scriptCode.replace('export default ', ''),
              cssCode: this.cssCode,
            },
          };
          this.$refs.previewPage.contentWindow.postMessage(
            postData,
            location.origin
          );
        } else {
          this.$message.error('请使用export default');
        }
      } catch (e) {
        this.$message.error('js错误：' + e);
      }
    },
  },
  mounted () {},
};
</script>
<style scoped lang="less">
.preview-panel {
  .iframe-wrapper {
    height: calc(100vh - 35px);
    position: relative;
    iframe {
      width: 100%;
      height: 100%;
      padding: 12px;
    }
    .ant-spin {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
