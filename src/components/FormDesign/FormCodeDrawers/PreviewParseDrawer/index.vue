<!--
 * @Author: ykx
 * @Date: 2020-12-22 16:13:59
 * @LastEditTime: 2021-04-16 17:21:23
 * @LastEditors: your name
 * @Description: 预览界面查看（包含代码编辑，界面查看）
 * @FilePath: \form-design\src\components\FormDesign\FormCodeDrawers\PreviewParseDrawer\index.vue
-->
<template>
  <a-drawer
    class="no-padding"
    :mask="false"
    :width="drawerWidth"
    :visible="visible"
    :closable="false"
    @close="onClose"
  >
    <a-row>
      <a-col :span="12">
        <code-edit-panel
          :activeKey.sync="activeKey"
          :vueComCode="vueComCode"
          :htmlCode="htmlCode"
        />
      </a-col>
      <a-col :span="12">
        <form-preview-panel
          @closePreview="onClose"
          :curTplCode="curTplCode"
          :widget-form-data="widgetFormData"
          :activeKey="activeKey"
        />
      </a-col>
    </a-row>
  </a-drawer>
</template>
<script>
import CodeEditPanel from './CodeEditPanel';
import FormPreviewPanel from './FormPreviewPanel';
import beautifier from 'js-beautify';
import { buildVueComTpl, buildHtmlComTpl } from '@/components/FormDesign/configData/comsList';
import { beautifierConf } from '@/utils';
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
    CodeEditPanel,
    FormPreviewPanel,
  },
  data () {
    return {
      activeKey: 'vueComponent', // 当前选中代码编辑
      vueComCode: '', // vue形式代码
      htmlCode: '', // html形式代码
      drawerWidth: 0,
    };
  },
  computed: {
    curTplCode () {
      return this.activeKey === 'vueComponent'
        ? this.vueComCode
        : this.htmlCode;
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.handleSetWidth);
  },
  created () {
    // 100% 无效？
    if (this.widgetFormData) {
      // 优化下显示(如何优化代码显示？？)
      this.vueComCode = beautifier.html(
        buildVueComTpl(JSON.stringify(this.widgetFormData)),
        beautifierConf.html
      );
      this.htmlCode = beautifier.html(
        buildHtmlComTpl(JSON.stringify(this.widgetFormData)),
        beautifierConf.html
      );
    }
    this.handleSetWidth();
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
      this.drawerWidth =
        (document.body.clientWidth || document.documentElement.clientWidth) +
        1 +
        'px';
    },
  },
};
</script>
<style scoped></style>
