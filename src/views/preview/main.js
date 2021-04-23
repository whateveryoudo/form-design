/*
 * @Author: ykx
 * @Date: 2021-01-26 17:10:58
 * @LastEditTime: 2021-03-05 10:21:31
 * @LastEditors: your name
 * @Description: 预览界面入口
 * @FilePath: \zdww-form-design\src\views\preview\main.js
 */
import Vue from 'vue'
import '@/plugins/loadComs'
 const $previewApp = document.getElementById('previewApp');
  const handleInit = (event) => {
    const { type, data } = event.data;
    if (type === 'refreshFrame' ) {
      $previewApp.innerHTML = '<div id="app"></div>'
      startBuildPage(data.scriptCode, data.templateCode);
    }
  }
 window.addEventListener('message', handleInit, false);

 function startBuildPage (jsStr, html) {
  const main = eval(`(${jsStr})`);
  main.template = `<div>${html}</div>`
  new Vue({
    components: {
      child: main
    },
    data () {
      return {
      }
    },
    template: '<div><child/></div>'
  }).$mount('#app')
 }
