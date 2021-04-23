<!--
 * @Author: ykx
 * @Date: 2020-12-08 15:29:05
 * @LastEditTime: 2021-04-14 10:04:16
 * @LastEditors: your name
 * @Description: 左侧操作树组件(修改为平铺实现)
 * @FilePath: \form-design\src\components\FormDesign\ComsCollapse.vue
-->

<template>
  <div class="coms-collapse-container">
    <!-- 暂时不添加搜索 -->
    <!-- <a-auto-complete style="margin-bottom: 5px" v-model="value" :data-source="dataSource" placeholder="请输入组件名字" @select="onSelect" @search="onSearch" @change="onChange" /> -->
    <vue-scroll>
      <ul>
        <li
          v-for="(group, index) in list"
          :key="index"
        >
          <div class="group-title">{{ group.title }}</div>
          <draggable
            tag="ul"
            :list="group.children"
            class="collapse-component-wrapper"
            v-bind="{
              group: { name: 'dragForm', pull: 'clone', put: false },
              sort: false,
              ghostClass: 'ghost'
            }"
          >
        <li
          v-for="(gItem, index) in group.children"
          class="collapse-component-item"
          @click="widgetAdd(gItem)"
          :key="index"
          @dragstart="$formDesignBus.$emit('generateKey', group.children, index)"
        >
          {{ gItem.title }}
        </li>
        </draggable>
        </li>
      </ul>
    </vue-scroll>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import comsList from './configData/comsList';
export default {
  data () {
    return {
      value: '',
      dataSource: [],
      list: comsList,
    };
  },
  components: {
    draggable: Draggable,
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (searchText) {
      this.dataSource = !searchText
        ? []
        : [searchText, searchText.repeat(2), searchText.repeat(3)];
    },
    onSelect (value) {
      console.log('onSelect', value);
    },
    onChange (value) {
      console.log('onChange', value);
    },
    /**
     * @description:  点击添加组件
     * @param {Object} 当前选中类型组件
     */
    widgetAdd (item) {
      // 点击添加与 copy逻辑一致
      this.$formDesignBus.$emit('copyFormItem', item, 'list', true);
    },
  },
};
</script>
<style lang="less">
.coms-collapse-container {
  .ant-select-auto-complete {
    width: 100%;
    padding: 10px;
    padding-bottom: 0;
  }
}
</style>
<style scoped lang="less">
.coms-collapse-container {
  .group-title {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-weight: 600;
    margin: 6px 0;
  }
  .ant-collapse {
    background-color: #fff;
  }
  .ant-collapse-borderless > .ant-collapse-item {
    border-bottom: none;
  }
  .header-desc {
    margin-left: 5px;
    font-size: 12px;
    color: rgba(102, 102, 102, 0.85);
  }
  .collapse-component-wrapper {
    padding: 0px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .collapse-component-item {
    width: 48%;
    margin: 1%;
    cursor: move;
    background: #f4f6fc;
    border: 1px solid #f4f6fc;
    height: 30px;
    line-height: 30px;
    text-align: center;
    &:hover {
      color: #409eff;
      border: 1px dashed #409eff;
    }
  }
}
</style>
