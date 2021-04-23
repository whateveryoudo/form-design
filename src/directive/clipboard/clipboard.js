/*
 * @Author: ykx
 * @Date: 2021-02-22 10:32:54
 * @LastEditTime: 2021-04-06 09:45:09
 * @LastEditors: Anxure
 * @Description: 复制 | 剪切 自定义指令
 * @FilePath: \zdww-form-design\src\directive\clipboard\clipboard.js
 */

// 自定义指令 v-clipboard （: copy=需要复制的信息 cut 粘贴的信息（cut只在input  textarea生效） success 操作成功的回调 error 操作失败的回调）
import app from '@/main.js' // TODO这里是否有其他方式获取 vue原型方法
const Clipboard = require('clipboard'); // http://www.clipboardjs.cn/
if (!Clipboard) {
  throw new Error('请先安装相关依赖：npm install `clipboard` --save');
}
// https://cn.vuejs.org/v2/guide/custom-directive.html
export default {
  bind (el, binding) {
    const { arg, value } = binding;
    if (arg === 'success' || arg === 'error') {
      el[`_v_clipboard_${arg}`] = value;
    } else {
      // 构建实例
      const clipboard = new Clipboard(el, {
        text () { return value },
        action () { return arg === 'cut' ? 'cut' : 'copy' }
      });
      let optStr = arg === 'cut' ? '剪切' : '复制';
      clipboard.on('success', e => {
        const callback = el._v_clipboard_success;
        if (callback) {
          callback(e);
        } else {
          app.$message.destroy();
          app.$message.success(`${optStr}成功`);
        }
      })
      clipboard.on('error', e => {
        const callback = el._v_clipboard_error;
        if (callback) {
          callback(e);
        } else {
          app.$message.destroy();
          app.$message.success(`${optStr}失败`);
        }
      })
      el._v_clipboard = clipboard
    }
  },
  update (el, binding) {
    const { arg, value } = binding;
    if (arg === 'success' || arg === 'error') {
      el[`_v_clipboard_${arg}`] = value;
    } else {
      el._v_clipboard.text = function () { return value }
      el._v_clipboard.action = function () { return arg === 'cut' ? 'cut' : 'copy' }
    }
  },
  unbind (el, binding) {
    const { arg } = binding;
    if (arg === 'success' || arg === 'error') {
      delete el[`_v_clipboard_${arg}`];
    } else {
      el._v_clipboard.destroy();
      delete el._v_clipboard
    }
  }
}
