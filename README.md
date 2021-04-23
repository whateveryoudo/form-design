<!--
 * @Author: ykx
 * @Date: 2021-04-23 18:19:00
 * @LastEditTime: 2021-04-23 19:03:33
 * @LastEditors: your name
 * @Description: 说明.md
 * @FilePath: \form-design\README.md
-->
# form-design(v0.1.0)

<p>
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.5-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vueComponent/ant-design-vue">
    <img src="https://img.shields.io/badge/Ant%20Design%20Vue-1.7.2-blue" alt="ant-design-vue">
  </a>
</p>
基于 [vue](https://github.com/vuejs/vue) 和 [ant-design-vue](https://www.antdv.com/docs/vue/introduce-cn/) 实现的表单可视化编辑。

### 设计
本项目拆分为form-design与form-build，前者用于表单设计编辑(包含生成代码模式 & json解析模式)，后者为单独json解析(可安装独立的npm包y-form-build,(包名相同太多...)，可进行单独使用)。

### 使用场景
初版用于基础表单设计,提供代码编辑，json解析，用于快速构建antd的表单

### 使用说明
[文档完善中...]

### 未来
1.后续组件的完善开发（uploda,card-form,tabs,table,editor）。
2.字典接入远程接口数据 3.多种布局 & 字段联动（自定义事件）。
3.docs编写。
4.针对具体项目定制不同UI组件（物料开发），模板支持。

注：感谢[k-form-design](https://github.com/Kchengz/k-form-design) 与 [form-generator](https://github.com/JakHuang/form-generator) 提供的思路参考。
