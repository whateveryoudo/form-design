/*
 * @Author: your name
 * @Date: 2020-12-08 11:51:27
 * @LastEditTime: 2021-04-21 10:39:55
 * @LastEditors: your name
 * @Description: webpack配置
 * @FilePath: \form-design\vue.config.js
 */
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  lintOnSave: IS_PRODUCTION ? true : 'error',
  runtimeCompiler: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '表单设计器',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      productionSourceMap: false
    },
    preview: 'src/views/preview/main.js'
    // preview: {
    //   entry: 'src/views/preview/main.js',
    //   template: 'public/preview.html',
    //   filename: 'preview.html',
    //   title: '表单设计器-预览页',
    //   chunks: ['chunk-vendors', 'chunk-common', 'preview']
    // }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin()]
  }
}
