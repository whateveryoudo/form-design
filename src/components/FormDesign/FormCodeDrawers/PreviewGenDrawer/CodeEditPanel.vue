<template>
  <div class="code-edit-container">
    <div class="container-head">
      <span v-for="item in headConfig" :key="item.name" @click="activeKey = item.name" :class="['heade-item', item.name === activeKey ? 'active' : '']">
        <a-icon :type="item.icon" />{{ item.name }}
      </span>
    </div>
    <div class="container-content">
      <div v-show="activeKey === 'template'" class="template-content">
        <code-edit :codes="templateCode" @onCodeChange="(val) => handleCodeChange('templateCode', val)" containerH="calc(100vh - 35px)" />
      </div>
      <div v-show="activeKey === 'script'" class="script-content">
        <code-edit :codes="scriptCode" :editorOptions="{ language: 'javascript' }" @onCodeChange="(val) => handleCodeChange('scriptCode', val)" containerH="calc(100vh - 35px)" />
      </div>
      <!-- 暂时去掉css部分 -->
      <!-- <div
        v-show="activeKey==='css'"
        class="css-content"
      >
        <code-edit
          :codes="cssCode"
          @onCodeChange="handleCodeChange"
          containerH="calc(100vh - 35px)"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import CodeEdit from '@/components/CodeEdit';
export default {
  data () {
    return {
      activeKey: 'template',
      headConfig: [
        {
          name: 'template',
          icon: 'file-text'
        },
        {
          name: 'script',
          icon: 'file-text'
        }
        // {
        //   name: "css",
        //   icon: "file-text",
        // },
      ]
    };
  },
  props: {
    templateCode: {
      type: String
    },
    scriptCode: {
      type: String
    },
    cssCode: {
      type: String
    }
  },
  components: {
    CodeEdit
  },
  created () {},
  mounted () {},
  methods: {
    handleCodeChange (type, val) {
      this.$emit('updateCode', type, val);
    }
  }
};
</script>
<style scoped lang="less">
</style>
