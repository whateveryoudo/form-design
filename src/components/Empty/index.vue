<!--
 * @Author: ykx
 * @Date: 2020-12-22 09:56:46
 * @LastEditTime: 2021-04-09 10:05:12
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \zdww-form-design\src\components\Empty\index.vue
-->
<template>
  <div class="empty-container">
    <div class="empty-content">
      <div class="logo" v-if="image">
        <img :src="image" />
      </div>
      <div class="desc">{{ desc }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    image: {
      type: String
    },
    desc: {
      type: String,
      default: '暂无数据...'
    },
    imageStyle: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.empty-container {
  position: relative;
  height: 100%;
  .empty-content {
    width: 300px;
    top: 50%;
    left: 50%;
    text-align: center;
    position: absolute;
    z-index: 97;
    transform: translateY(-50%) translateX(-50%);
  }
}
</style>
