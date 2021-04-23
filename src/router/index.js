import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/views/index/index.vue')
  },
  {
    path: '/build',
    name: 'build',
    component: () => import('@/components/FormBuild/example/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
