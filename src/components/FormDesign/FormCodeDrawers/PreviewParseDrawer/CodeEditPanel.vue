<!--
 * @Author: ykx
 * @Date: 2021-04-12 14:59:30
 * @LastEditTime: 2021-04-16 17:11:23
 * @LastEditors: your name
 * @Description: 解析预览
 * @FilePath: \zdww-form-design\src\components\FormDesign\FormCodeDrawers\PreviewParseDrawer\CodeEditPanel.vue
-->
<template>
  <div class="code-edit-container">
    <div class="container-head">
      <span
        v-for="item in headConfig"
        :key="item.name"
        @click="$emit('update:activeKey', item.name)"
        :class="['heade-item', item.name === activeKey ? 'active' : '']"
      >
        <a-icon :type="item.icon" />{{ item.name }}
      </span>
    </div>
    <div class="container-content">
      <div v-show="activeKey === 'vueComponent'" class="template-content">
        <code-edit :codes="vueComCode" containerH="calc(100vh - 35px)" />
      </div>
      <div v-show="activeKey === 'htmlComponent'" class="template-content">
        <code-edit :codes="htmlCode" containerH="calc(100vh - 35px)" />
      </div>
    </div>
  </div>
</template>

<script>
import CodeEdit from '@/components/CodeEdit';
export default {
  props: {
    vueComCode: {
      type: String,
    },
    htmlCode: {
      type: String
    },
    activeKey: {
      type: String,
    },
  },
  data () {
    return {
      headConfig: [
        {
          name: 'vueComponent',
          icon: 'file-text',
        },
        {
          name: 'htmlComponent',
          icon: 'file-text',
        }
      ],
    };
  },
  components: {
    CodeEdit,
  },
  created () {},
  mounted () {},
  methods: {},
};
</script>
<style scoped lang="less">
</style>
