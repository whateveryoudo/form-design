<!--
 * @Author: ykx
 * @Date: 2020-12-22 16:13:59
 * @LastEditTime: 2021-03-05 10:23:34
 * @LastEditors: your name
 * @Description: 代码编辑器(需要设置overflow:hidden,否则会出现滚动？？)
 * @FilePath: \form-design\src\components\CodeEdit\index.vue
-->
<template>
  <div
    ref="editor-container"
    :style="{ height: containerH,overflow:'hidden'}"
  >
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
const defaultOption = {
  language: 'html',
  theme: 'vs-dark',
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false, // 只读
  cursorStyle: 'line', // 光标样式
  automaticLayout: true, // 自动布局
  glyphMargin: false, // 字形边缘
  useTabStops: false,
  autoIndent: true, // 自动缩进
  // quickSuggestionsDelay: 500,   //代码提示延时
};
export default {
  props: {
    codes: {
      type: String,
    },
    containerH: {
      type: [String],
      default: '100vh',
    },
    editorOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      monacoEditor: null,
      codesCopy: null, // 内容备份
    };
  },
  created () {},
  beforeDestroy () {
    window.removeEventListener('keydown', this.preventDefaultSave);
  },
  mounted () {
    // 禁止浏览器默认ctrl+s 保存网页操作
    window.addEventListener('keydown', this.preventDefaultSave);
    this.initEditor();
  },
  methods: {
    preventDefaultSave (e) {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    },
    setValue (val) {
      this.monacoEditor.setValue(val);
    },
    initEditor () {
      this.monacoEditor = monaco.editor.create(this.$refs['editor-container'], {
        value: this.codesCopy || this.codes,
        ...defaultOption,
        ...this.editorOptions,
      });
      this.monacoEditor.onDidChangeModelContent(() => {
        // 编辑器内容changge事件
        this.codesCopy = this.monacoEditor.getValue();
        this.$emit('onCodeChange', this.monacoEditor.getValue());
      });
      // 监听编辑器按键事件
      this.monacoEditor.onKeyDown((e) => {
        this.$emit('triggerKeyDown', e);
      });
    },
  },
  watch: {
    // 单项绑定，受控光标会移动？？
    // codes(val) {
    //   this.monacoEditor.setValue(val);
    // },
  },
};
</script>
<style scoped lang="less">
</style>
