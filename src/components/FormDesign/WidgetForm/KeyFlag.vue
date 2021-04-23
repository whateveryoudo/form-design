<!--
 * @Author: your name
 * @Date: 2020-12-15 15:08:13
 * @LastEditTime: 2021-03-05 10:25:42
 * @LastEditors: your name
 * @Description: 单项字段的操作组件(注意阻止icon冒泡)
 * @FilePath: \zdww-form-design\src\components\FormDesign\WidgetForm\KeyFlag.vue
-->
<template>
  <!-- 操作框 -->
  <div class="key-flag operate-item">
    {{ curField.model }}
  </div>
</template>

<script>
export default {
  props: {
    curField: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {}
}
</script>
<style scoped></style>
