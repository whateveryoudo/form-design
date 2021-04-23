/*
 * @Author: ykx
 * @Date: 2020-12-22 16:13:59
 * @LastEditTime: 2021-04-21 10:12:10
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \form-design\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/plugins/loadComs'
import '@/styles/common.less'
import * as utils from '@/utils'
import vuescroll from 'vuescroll'
import FormDesign from '@/components/FormDesign'
import formDesignBus from '@/components/FormDesign/bus'
// 你可以在这里设置全局配置
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: 'rgb(24, 144, 255)',
      keepShow: false,
      minSize: 0.2
    }
  } // 在这里设置全局默认配置
})
Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$formDesignBus = formDesignBus // 用于组件通信，绑定原型对象便于调用
Vue.use(FormDesign)
export default new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
