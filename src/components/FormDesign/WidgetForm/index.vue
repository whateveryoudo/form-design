<!--
 * @Author: ykx
 * @Date: 2020-12-09 16:07:17
 * @LastEditTime: 2021-04-12 17:46:10
 * @LastEditors: your name
 * @Description: 主体界面(注：指定handle 就能分组拖拽，nested-draggable ？？)
 * @FilePath: \form-design\src\components\FormDesign\WidgetForm\index.vue
-->
<template>
  <div :class="['form-widget-body', list.length == 0 && 'empty']">
    <div
      v-if="list.length == 0"
      class="form-empty"
    >
      请点击左侧组件或拖拽至此处
    </div>
    <a-form
      :form="form"
      v-bind="formConfig"
      :style="{height:'100%',width: formConfig.width || 'auto'}"
    >
    <!-- vue-scroll替换？？ -->
      <Draggable
        style="height:100%;overflow-y:auto"
        :list="list"
        @add="handleWidgetAdd"
        v-bind="{
          group: 'dragForm',
          ghostClass: 'ghost',
          animation: 200,
          handle: '.drag-handle'
        }"
      >
        <transition-group
          name="sider-fade"
          tag="div"
          class="widget-form-list"
        >
          <widget-form-item
            class="widget-list-item-wrapper drag-handle"
            :selectedField="selectedField"
            :componentData="item"
            :formConfig="formConfig"
            :key="item.key"
            v-for="item in list"
          ></widget-form-item>
        </transition-group>
      </Draggable>
    </a-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import WidgetFormItem from './WidgetFormItem';
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    formConfig: {
      type: Object,
      default: () => {},
    },
    selectedField: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
    };
  },
  components: {
    Draggable,
    WidgetFormItem,
  },
  created () {},
  mounted () {},
  methods: {
    // 添加完成回調
    handleWidgetAdd (evt) {
      this.$formDesignBus // 拖拽添加 | 点击添加
        .$emit('widgetAddByDrag', evt, this.list);
    },
  },
};
</script>
<style scoped lang="less"></style>
