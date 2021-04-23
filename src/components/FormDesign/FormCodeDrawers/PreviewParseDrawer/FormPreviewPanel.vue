<!--
 * @Author: ykx
 * @Date: 2021-01-20 09:32:33
 * @LastEditTime: 2021-04-16 17:36:27
 * @LastEditors: your name
 * @Description: 组件预览
 * @FilePath: \form-design\src\components\FormDesign\FormCodeDrawers\PreviewParseDrawer\FormPreviewPanel.vue
-->
<template>
  <div class="preview-panel">
    <div class="action-bar">
      <span
        class="item-item"
        @click="promptVisible = true"
      >
        <a-icon type="cloud-download" />导出文件
      </span>
      <span
        class="item-item"
        v-clipboard:copy="curTplCode"
      >
        <a-icon type="copy" />复制代码
      </span>
      <span
        class="item-item close"
        @click="closePreview"
      >
        <a-icon type="close-circle" />关闭
      </span>
    </div>
    <div class="component-wrapper">
      <a-alert
        closable
        style="margin-bottom:10px"
        message="解析模式下，修改左侧代码，预览组件值均不会生效，请在拖拽区进行设置"
        type="warning"
        show-icon
      />
      <!-- 仅采用组件模式预览 -->
      <form-build
        ref="formBuildElem"
        :widget-form-data="widgetFormData"
      ></form-build>
      <div style="text-align:center">
        <a-button
          @click="getData"
          type="primary"
        >提交</a-button>
      </div>
    </div>
    <export-prompt
      :visible.sync="promptVisible"
      :exportSuffix="exportSuffix"
      @triggerDownLoad="handleDownLoad"
    ></export-prompt>
  </div>
</template>

<script>
import FormBuild from '@/components/FormBuild/index.vue'; // 可替换为依赖导入
import ExportPrompt from '../ExportPrompt.vue';
import clipboard from '@/directive/clipboard';
import { saveAs } from 'file-saver';
export default {
  props: {
    widgetFormData: {
      type: Object,
      default: () => {},
    },
    curTplCode: {
      type: String,
    },
    activeKey: {
      type: String
    }
  },
  directives: {
    clipboard,
  },
  components: {
    ExportPrompt,
    FormBuild,
  },
  data () {
    return {
      promptVisible: false,
    };
  },
  computed: {
    exportSuffix () {
      return this.activeKey === 'vueComponent' ? 'vue' : 'html';
    }
  },
  methods: {
    closePreview () {
      this.$emit('closePreview');
    },
    getData () {
      // 通过函数获取数据
      this.$refs['formBuildElem']
        .handleSubmit()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err, '校验失败');
        });
    },
    /**
     * @description: vue下载
     * @param {*}
     */
    handleDownLoad (fileName) {
      const blob = new Blob([this.curTplCode], {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(blob, fileName + '.' + this.exportSuffix);
    },
  },
  mounted () {
    console.log(this.widgetFormData);
  },
};
</script>
<style scoped lang="less">
.preview-panel {
  .component-wrapper {
    height: calc(100vh - 35px);
    position: relative;
    padding: 12px;
    padding-top:5px;
  }
}
</style>
