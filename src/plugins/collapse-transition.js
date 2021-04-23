// 参考https://blog.csdn.net/oranges__c/article/details/104551831 解决动态collapse高度问题
// https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6 函数式组件
const transitionStyle = '0.2s height ease-in-out'
const Transition = {
  beforeEnter(el) {
    el.style.transition = transitionStyle
    if (!el.dataset) el.dataset = {}

    el.style.height = 0
  },
  enter(el) {
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`
    } else {
      el.style.height = ''
    }
    el.style.overflow = 'hidden'
  },
  afterEnter(el) {
    el.style.transition = ''
    el.style.height = ''
  },

  beforeLeave(el) {
    if (!el.dataset) el.dataset = {}
    el.style.display = 'block' // 添加这一行(手风琴处理)
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },

  leave(el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = transitionStyle
      el.style.height = 0
    }
  }
}
const CollapseTransition = {
  name: 'CollapseTransition',
  functional: true,
  render(h, { children }) {
    const data = {
      on: Transition
    }
    return h('transition', data, children)
  }
}
const install = Vue => {
  Vue.component(CollapseTransition.name, CollapseTransition)
}
export default {
  install
}
