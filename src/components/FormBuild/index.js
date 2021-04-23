import FormBuild from './index.vue'
const install = function (Vue) {
  if (install.installed) return;
  Vue.component(FormBuild.name, FormBuild);
  install.installed = true;
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export {
  FormBuild
}
export default {
  install
}