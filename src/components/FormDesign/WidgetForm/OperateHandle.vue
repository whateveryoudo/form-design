<!--
 * @Author: your name
 * @Date: 2020-12-15 15:08:13
 * @LastEditTime: 2020-12-17 19:33:10
 * @LastEditors: your name
 * @Description: 单项字段的操作组件(注意阻止icon冒泡)
 * @FilePath: \zdww-form-design\src\components\FormDesign\WidgetForm\OperateHandle.vue
-->
<template>
  <!-- 操作框 -->
  <div class="operate-handle operate-item">
    <a-icon type="copy" @click.stop="copyItem()" title="复制" />
    <a-icon type="delete" @click.stop="deleteItem()" title="删除" />
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
  mounted () {},
  methods: {
    /**
     * @description: 复制当前项
     * @param {*}
     */
    copyItem () {
      this.$formDesignBus.$emit('copyFormItem', this.curField)
    },
    /**
     * @description: 删除当前项
     * @param {*}
     */
    deleteItem () {
      this.$formDesignBus.$emit('deleteFormItem', this.curField)
    }
  }
}
</script>
<style scoped></style>
