/*
 * @Author: ykx
 * @Date: 2021-01-15 17:03:38
 * @LastEditTime: 2021-03-04 16:29:52
 * @LastEditors: your name
 * @Description: 按需加载ant-design-vue组件
 * @FilePath: \form-design\src\plugins\loadComs.js
 */
import Vue from 'vue'
import {
  Button,
  Layout,
  Icon,
  Form,
  Input,
  Tabs,
  AutoComplete,
  Row,
  Col,
  Radio,
  Slider,
  Divider,
  InputNumber,
  Checkbox,
  Tooltip,
  FormModel,
  Drawer,
  Modal,
  message,
  notification,
  ConfigProvider,
  Switch,
  Spin,
  Alert,
  DatePicker,
  TimePicker,
  Upload,
  Popover,
  Select
} from 'ant-design-vue'
const {
  Header: LayoutHeader,
  Content: LayoutContent,
  Sider: LayoutSider
} = Layout
const { Group: RadioGroup, Button: RadioButton } = Radio
const { Item: FormItem } = Form
const { Item: FormModelItem } = FormModel
const { TabPane } = Tabs
const antdComponents = [
  Button,
  Icon,
  Layout,
  Form,
  Input,
  FormItem,
  FormModel,
  FormModelItem,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  Tabs,
  TabPane,
  AutoComplete,
  Row,
  Col,
  Radio,
  RadioGroup,
  RadioButton,
  Slider,
  Divider,
  Modal,
  InputNumber,
  Checkbox,
  Tooltip,
  Drawer,
  ConfigProvider,
  Switch,
  Spin,
  Alert,
  DatePicker,
  TimePicker,
  Upload,
  Popover,
  Select
]
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
// 不要使用vue.component注册
antdComponents.forEach(com => {
  Vue.use(com)
})
