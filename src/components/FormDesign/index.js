import FormBuild from '../FormBuild/index.vue'
import FormDesign from './Container.vue'
const components = [FormDesign, FormBuild]
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
  FormBuild
}
export default {
  install
}
