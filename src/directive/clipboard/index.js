import Clipboard from './clipboard'

const install = function (Vue) {
  Vue.directive('Clipboard', Clipboard)
}
Clipboard.install = install;
export default Clipboard
