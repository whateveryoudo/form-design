import ZdFormBuild from '../FormBuild/index.vue'
import ZdFormDesign from './Container.vue'
const components = [ZdFormDesign, ZdFormBuild]
const install = Vue => {
  if (install.installed) return;
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  install.installed = true;
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export {
  ZdFormBuild
}
export default {
  install
}
