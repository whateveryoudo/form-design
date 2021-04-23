<!--
 * @Author: Anxure
 * @Github: https://github.com/Anxure
 * @Date: 2021-03-08 17:14:31
 * @LastEditors: your name
 * @LastEditTime: 2021-04-23 16:42:07
-->
<template>
  <a-layout>
    <a-layout-header>
      <div class="logo">
        {{ projetName }}
      </div>
      <ul class="form-config-wrapper">
        <li
          v-for="item in newNavConfig"
          :key="item.key"
          :class="[item.disabled && 'disabled']"
          @click="triggerOperate(item.eventKey, item.eventParams)"
        >
          <span class="icon">
            <a-icon :type="item.icon" />
          </span>
          <span class="text">
            {{ item.name }}
          </span>
        </li>
      </ul>
      <div class="header-right-wrapper"></div>
    </a-layout-header>
    <a-layout class="main-container">
      <a-layout-sider
        class="coms-collapse-aside"
        :width="256"
      >
        <coms-collapse />
      </a-layout-sider>
      <a-layout>
        <a-layout-content :style="{
            background: '#fff',
            padding: '10px',
            margin: 0
          }">
          <widget-form
            :selectedField="selectedField"
            :list="widgetFormData.fields"
            :formConfig="widgetFormData.formConfig"
          ></widget-form>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        class="coms-config-aside"
        :width="340"
      >
        <a-tabs v-model="activeKey">
          <a-tab-pane
            key="field-props"
            tab="控件属性"
          >
            <base-panel>
              <component
                v-if="selectedField"
                :is="selectedField.type"
                :formData="selectedField"
              ></component>
              <Empty
                v-else
                desc="暂无属性..."
              />
            </base-panel>
          </a-tab-pane>
          <a-tab-pane
            key="form-props"
            tab="表单属性"
          >
            <base-panel>
              <form-props-config :config="widgetFormData.formConfig" />
            </base-panel>
          </a-tab-pane>
          <!-- 暂时去掉 -->
          <!-- <a-tab-pane
            key="field-class"
            tab="控件样式"
            force-render
          >
            Content of Tab Pane 2
          </a-tab-pane> -->
        </a-tabs>
        <div class="bto-preview-link">实际效果可<a
            href="javascript:;"
            class="preview-btn"
            @click="handleTogglePreview('preConfirmModal')"
          >预览</a>查看</div>
      </a-layout-sider>
    </a-layout>
    <!-- 预览界面 - generator形式-->
    <preview-gen-drawer
      :visible="previewGenDrawer.visible"
      v-if="previewGenDrawer.destroy"
      @closeDrawer="handleTogglePreview('previewGenDrawer', false)"
      :formConfig="widgetFormData.formConfig"
      :widgetFormList="widgetFormData.fields"
    />
    <!-- 预览界面 - parse形式-->
    <preview-parse-drawer
      :visible="previewParseDrawer.visible"
      v-if="previewParseDrawer.destroy"
      @closeDrawer="handleTogglePreview('previewParseDrawer', false)"
      :widgetFormData="widgetFormData"
    />
    <!-- json导入 -->
    <import-json-modal
      :visible="importJsonModal.visible"
      v-if="importJsonModal.destroy"
      @closeModal="handleTogglePreview('importJsonModal', false)"
      @triggerRefresh="handleRefresh"
    />
    <!-- json查看 -->
    <json-drawer
      :visible="jsonDrawer.visible"
      v-if="jsonDrawer.destroy"
      @closeDrawer="handleTogglePreview('jsonDrawer', false)"
      @triggerRefresh="handleRefresh"
      :widgetFormData="widgetFormData"
    />
    <!-- json导入 -->
    <import-json-modal
      :visible="importJsonModal.visible"
      v-if="importJsonModal.destroy"
      @closeModal="handleTogglePreview('importJsonModal', false)"
      @triggerRefresh="handleRefresh"
    />
    <!-- 预览二次确认 -->
    <preview-confirm
      :visible="preConfirmModal.visible"
      v-if="preConfirmModal.destroy"
      @closeModal="handleTogglePreview('preConfirmModal', false)"
      @triggerChoose="confirmPreview"
    ></preview-confirm>
    <!-- 导出文件 -->
    <export-prompt
      :visible.sync="promptVisible"
      exportType="vue"
      @triggerDownLoad="handleDownLoad"
    ></export-prompt>
  </a-layout>
</template>
<script>
import * as NavModals from './NavModals';
import * as FormCodeDrawers from './FormCodeDrawers';
import ComsCollapse from './ComsCollapse';
import WidgetForm from './WidgetForm';
import FormPropsConfig from './PropsConfigPanels/FormPropsConfig';
import FieldComponents from './PropsConfigPanels';
import cloneDeep from 'lodash/cloneDeep';
import BasePanel from './PropsConfigPanels/BasePanel';
import CompileHtml from '@/components/FormDesign/coreCompile/compileHtml';
import CompileJs from '@/components/FormDesign/coreCompile/compileJs';
import Empty from '@/components/Empty';
import beautifier from 'js-beautify';
import { beautifierConf } from '@/utils';
import {
  buildVueTpl,
  buildVueScript,
} from '@/components/FormDesign/coreCompile/compileHtml';
import { saveAs } from 'file-saver';
const defaultFormConfigCols = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
export default {
  name: 'ZdFormDesign',
  props: {
    projetName: {
      type: String,
      default: 'FormDesign',
    },
  },
  components: {
    ...FieldComponents,
    ComsCollapse,
    WidgetForm,
    FormPropsConfig,
    BasePanel,
    Empty,
    ...FormCodeDrawers, // 代码操作modal集
    ...NavModals, // 顶部操作modal集
  },
  data () {
    return {
      activeKey: 'form-props', // 面板选中key
      // 将控制显隐用两个变量处理
      // 二次预览确认
      preConfirmModal: {
        destroy: false,
        visible: false,
      },
      // 预览drawer-generator
      previewGenDrawer: {
        destroy: false,
        visible: false,
      },
      // 预览drawer-parse
      previewParseDrawer: {
        destroy: false,
        visible: false,
      },
      // json查看drawer
      jsonDrawer: {
        destroy: false,
        visible: false,
      },
      // json导入modal
      importJsonModal: {
        destroy: false,
        visible: false,
      },
      // 生成vue文件
      promptVisible: false,
      // 左侧元组件列表
      navConfig: [
        // {
        //   key: 'setJson',
        //   name: '导入json',
        //   icon: 'vertical-align-bottom',
        //   eventKey: 'handleTogglePreview',
        //   eventParams: ['importJsonModal'],
        // },
        { key: 'empty', name: '清空', icon: 'delete', eventKey: 'handleClear' },
        {
          key: 'preview',
          name: '预览',
          icon: 'eye',
          eventKey: 'handleTogglePreview',
          eventParams: ['preConfirmModal'],
        },
        {
          key: 'getJson',
          name: '生成json配置',
          icon: 'file-done',
          eventKey: 'handleTogglePreview',
          eventParams: ['jsonDrawer'],
        },
        {
          key: 'getCode',
          name: '导出vue文件',
          icon: 'export',
          eventKey: 'handleGetCode',
        },
      ],
      // 当前选中组件
      selectedField: null,
      // 只针对单表单
      widgetFormData: {
        // 字段集合属性
        fields: [
        ],
        // 表单整体属性
        formConfig: {
          width: '100%',
          labelAlign: 'right',
          size: 'default',
          formModel: 'formData',
          formRef: 'antdForm',
          separator: '~',
          colon: true, // 表示是否显示 label 后面的冒号
          ...defaultFormConfigCols,
          layout: 'horizontal', // 表单布局 'horizontal'|'vertical'|'inline'
        },
      },
      // 操作事件集合(对应methods中 handleXXX)
      busListenEvents: [
        'changeFormConfig',
        'resetFormConfigCols',
        'widgetAddByDrag',
        'deleteFormItem',
        'copyFormItem',
        'selectFormItem',
        'generateKey',
      ],
    };
  },
  computed: {
    // 处理后的navConfig,添加部分属性
    newNavConfig () {
      return this.navConfig.map((item) => {
        return {
          ...item,
          disabled:
            item.key === 'empty' && this.widgetFormData.fields.length === 0,
        };
      });
    },
    vueCode () {
      // 拼接后的vue代码
      return beautifier.html(
        buildVueTpl(this.templateCode) + buildVueScript(this.scriptCode),
        beautifierConf.html
      );
    },
  },
  created () {
    // this.selectedField = this.widgetFormData.fields[0];
    this.selectedField && (this.activeKey = 'field-props');
    this.initAllEvents();
  },
  methods: {
    /**
     * @description: 二次确认预览类型
     * @param {String} 1 - generator形式  2- parse形式
     */
    confirmPreview (type) {
      const modalMap = {
        1: 'previewGenDrawer',
        2: 'previewParseDrawer',
      };
      this[modalMap[type]] && this.handleTogglePreview(modalMap[type]);
    },
    /**
     * @description: 顶部操作事件
     * @param {String} 事件触发key
     * @param {Array} 参数数组
     */
    triggerOperate (funcKey, params = []) {
      funcKey &&
        typeof this[funcKey] === 'function' &&
        this[funcKey](...params);
    },
    /**
     * @description: 生成代码
     * @param {*}
     */
    handleGetCode () {
      this.promptVisible = true;
      const tempHtml = new CompileHtml(
        this.widgetFormData.fields,
        this.widgetFormData.formConfig
      ).code;
      const tempJs = new CompileJs(
        this.widgetFormData.fields,
        this.widgetFormData.formConfig
      ).code;
      this.templateCode = beautifier.html(tempHtml, beautifierConf.html);
      this.scriptCode = beautifier.js(tempJs, beautifierConf.js);
    },
    /**
     * @description: 生成代码组件确认事件
     * @param {*}
     */
    handleDownLoad (fileName) {
      const blob = new Blob([this.vueCode], {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(blob, fileName + '.vue');
    },
    /**
     * @description: 预览 查看 | 关闭
     * @param {*}
     */
    handleTogglePreview (key, flag = true) {
      this.$utils.toggleModal.call(this, key, flag);
    },
    /**
     * @description: 清空操作
     * @param {*}
     */
    handleClear () {
      if (this.widgetFormData.fields.length === 0) {
        return;
      }
      this.$confirm({
        title: '系统提示',
        content: '确认清空已选组件',
        onOk: () => {
          this.widgetFormData.fields = [];
          this.selectedField = null;
        },
      });
    },
    /**
     * @description: 初始化bus事件(集中处理表单区域操作)
     * @param {*}
     */
    initAllEvents () {
      this.busListenEvents.forEach((eventKey) => {
        // 事件回调名称转换  changeFormConfig => handleChangeFormConfig
        const eventCallbackName = `handle${eventKey[0].toLocaleUpperCase()}${eventKey.slice(
          1
        )}`;
        if (
          !this[eventCallbackName] ||
          typeof this[eventCallbackName] !== 'function'
        ) {
          throw new Error(
            `缺少相关监听事件,请在methods中声明"${eventCallbackName}"方法`
          );
        }
        this.$formDesignBus &&
          this.$formDesignBus
            .$off(eventKey)
            .$on(eventKey, this[eventCallbackName]);
      });
    },
    /**
     * @description: 监听表单配置改变
     * @param {*}
     */
    handleChangeFormConfig (res) {
      this.updateWidgetFormData('formConfig', res);
    },
    /**
     * @description: 重置表单栅格配置
     * @param {*}
     */
    handleResetFormConfigCols () {
      this.updateWidgetFormData('formConfig', defaultFormConfigCols);
    },
    /**
     * @description: 拖拽前生成随机key,model
     * @param {*}
     */
    handleGenerateKey (list, index) {
      const randomKey = this.$utils.getUuid();
      this.$set(list, index, {
        ...list[index],
        key: randomKey,
        model: `${list[index].type.toLowerCase()}_${randomKey}`, // 随机model名
      });
    },
    /**
     * @description: 拖拽添加元组件回调
     * @param {*}
     */
    handleWidgetAddByDrag (evt, curList) {
      this.activeKey = 'field-props';
      const newIndex = evt.newIndex;
      // 深拷贝数据(否则会出现递归组件死循环？？ list嵌套list)
      curList[newIndex] = cloneDeep(curList[newIndex]);
      this.$formDesignBus.$emit('selectFormItem', curList[newIndex]);
    },
    /**
     * @description: 监听编辑区复制 | 点击左侧元组添加
     * @param {*} target 目标对象
     * @param {*} childrenKey 子项key, 嵌套布局下使用  list- 栅格
     * @param {*} isAddByClick 是否为点击元组添加
     */
    handleCopyFormItem (target, childrenKey = 'list', isAddByClick = false) {
      isAddByClick && (this.activeKey = 'field-props');
      // 获取当前操作key
      const curKey =
        isAddByClick && this.selectedField
          ? this.selectedField.key
          : target.key;
      const parentNode = this.$utils.getParentNode(
        curKey,
        this.widgetFormData.fields,
        childrenKey
      );
      let targetData = parentNode || this.widgetFormData.fields;
      const newList = Array.isArray(targetData) ? targetData : targetData.list; // 区分首层与嵌套层
      // 生成备份项
      const randomKey = this.$utils.getUuid();
      const copyTarget = {
        ...cloneDeep(target),
        key: randomKey,
        model: `${target.type.toLowerCase()}_${randomKey}`, // 随机model名
      };
      const index = newList.findIndex((item) => item.key === curKey);
      newList.splice(index + 1, 0, copyTarget);
      if (!Array.isArray(targetData)) {
        targetData[childrenKey] = newList; // 更新当前list
      }
      this.selectedField = copyTarget;
    },
    /**
     * @description: 单项删除
     * @param {*} target 目标对象
     * @param {*} childrenKey 子项key, 嵌套布局下使用  list- 栅格
     */
    handleDeleteFormItem (target, childrenKey = 'list') {
      const parentNode = this.$utils.getParentNode(
        target.key,
        this.widgetFormData.fields,
        childrenKey
      );
      const targetData = parentNode || this.widgetFormData.fields;
      const newList = Array.isArray(targetData) ? targetData : targetData.list; // 区分首层与嵌套层
      const index = newList.findIndex((item) => item.key === target.key);
      if (newList.length > 1) {
        if (index === newList.length - 1) {
          this.selectedField = newList[index - 1]; // 上移1单位
        } else {
          this.selectedField = newList[index + 1]; // 下移1单位
        }
      } else {
        this.selectedField = null;
      }
      newList.splice(index, 1);
      if (!Array.isArray(targetData)) {
        targetData[childrenKey] = newList; // 更新当前list
      }
    },
    /**
     * @description: 监听选中项
     * @param {*} target 目标对象
     */
    handleSelectFormItem (target) {
      this.activeKey = 'field-props';
      this.selectedField = target;
    },
    /**
     * @description: 用于更新数据源
     * @param {object} newFields 修改后的json
     * @param {boolean} clearSelectItem 是否需要清空当前选中
     */
    handleRefresh (newFormData, clearSelectItem = false) {
      this.widgetFormData = newFormData;
      clearSelectItem && (this.selectedField = null);
    },
    // 更新widgetFormData部分数据
    /**
     * @description: 用于更新数据源
     * @param {String} key 属性key
     * @param {Object | Array} targetData 属性值
     */
    updateWidgetFormData (key, targetData) {
      this.widgetFormData = {
        ...this.widgetFormData,
        [key]: {
          ...this.widgetFormData[key],
          ...targetData,
        },
      };
    },
  },
};
</script>

<style lang="less">
.ant-layout-header {
  background-color: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  display: flex;
  padding: 0;
  line-height: inherit;
  position: relative;
  z-index: 10;
}
.coms-config-aside {
  .ant-tabs-nav {
    width: 100%;
  }
  .ant-tabs-bar {
    margin-bottom: 0;
  }
  .ant-tabs-nav .ant-tabs-tab {
    margin: 0;
    width: 50%;
    text-align: center;
  }
}
</style>
<style lang="less" scoped>
.main-container {
  display: flex;
  height: calc(100vh - 64px);
  .coms-collapse-aside {
    background-color: #fff;
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 68.2%, 0.5);
  }
  .coms-config-aside {
    background-color: #fff;
    box-shadow: 0px -2px 4px 0px hsla(0, 0%, 68.2%, 0.5);
    position: relative;
  }
}
.logo {
  flex: 0 0 256px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}
.header-right-wrapper {
  flex: 1;
}
.form-config-wrapper {
  display: flex;
  flex: 3;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  li {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: #1890ff;
    }
    .icon i {
      font-size: 16px;
    }
    .text {
      font-size: 12px;
    }
  }
}
.bto-preview-link {
  height: 40px;
  line-height: 40px;
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 0;
  box-shadow: 0 -2px 2px #f0f1f2;
  .preview-btn {
    margin: 0 3px;
    font-style: italic;
  }
}
</style>
