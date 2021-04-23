<!--
 * @Author: ykx
 * @Date: 2021-03-05 11:50:44
 * @LastEditTime: 2021-04-09 09:53:41
 * @LastEditors: your name
 * @Description: 基础容器组件
 * @FilePath: \zdww-form-design\src\components\FormDesign\PropsConfigPanels\BasePanel.vue
-->
<template>
  <div class="props-panel-container compact-mode">
    <vue-scroll style="height:calc(100% - 40px)">
      <div class="inner-wrapper">
        <slot />
      </div>
    </vue-scroll>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  created () {},
  mounted () {},
};
</script>
<style scoped lang="less">
.inner-wrapper{ // 无法继承高度？
  height: calc(100vh - 148px)
}
</style>
