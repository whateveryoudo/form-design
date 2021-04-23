<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2020-12-21 10:00:50
 * @LastEditors: Anxure
 * @LastEditTime: 2021-04-06 09:16:28
-->
<template>
  <a-form>
    <a-form-item label="列配置">
      <template>
        <div
          v-for="(item,index) in formData.list"
          :key="index"
          class="options-item"
        >
          <a-input-number
            style="width:150px"
            allowClear
            v-model="item.span"
          ></a-input-number>
            <span
            class="close-btn"
            @click="formData.list.splice(index, 1)"
          >
            <a-icon type="minus-circle" />
          </span>
        </div>
        <div style="margin-bottom:5px">
          <span
            style="color:#1890ff; cursor: pointer;"
            @click="addCol"
          >
            <a-icon type="plus-circle" /> 添加选项
          </span>
        </div>
      </template>
    </a-form-item>
    <a-form-item label="栅格间距">
      <a-input-number
        allowClear
        :min="0"
        v-model="formData.options.gutter"
      ></a-input-number>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  components: {},
  methods: {
    addCol () {
      this.formData.list.push({ span: 12, list: [] });
    },
  },
};
</script>
<style lang="less" scoped>
.options-item{
  display: flex;
  align-items: center;
  .close-btn{
    position: static;
    margin-left: 10px;
  }
}
</style>
