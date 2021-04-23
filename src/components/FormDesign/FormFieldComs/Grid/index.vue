<!--
 * @Author: ykx
 * @Date: 2020-12-22 09:56:46
 * @LastEditTime: 2021-04-01 18:01:22
 * @LastEditors: your name
 * @Description: 栅格组件渲染
 * @FilePath: \zdww-form-design\src\components\FormDesign\FormFieldComs\Grid\index.vue
-->
<template>
  <div class="grid-box">
    <a-row :gutter="componentData.options.gutter  || 0">
      <a-col
        v-for="(colItem, colIndex) in componentData.list"
        :key="colIndex"
        :span="colItem.span || 0"
      >
        <draggable
          v-model="colItem.list"
          v-bind="{
            group: 'dragForm',
            ghostClass: 'ghost',
            animation: 200,
            handle: '.drag-handle'
          }"
          @add="evt => handleWidgetAdd(evt, colItem.list)"
        >
          <transition-group
            name="sider-fade"
            tag="div"
            class="widget-col-list"
          >
            <template v-for="item in colItem.list">
              <div
                :key="item.key"
                class="widget-list-item-wrapper"
              >
                <slot :item="item" />
              </div>
            </template>
          </transition-group>
        </draggable>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  props: {
    componentData: {
      type: Object,
    },
  },
  components: {
    draggable,
  },
  data () {
    return {
    };
  },
  created () {},
  mounted () {},
  methods: {
    handleWidgetAdd (evt, curList) {
      this.$formDesignBus // 拖拽添加
        .$emit('widgetAddByDrag', evt, curList);
    },
  },
};
</script>
<style scoped lang="less">
.grid-box{
  overflow: hidden;
}
</style>
