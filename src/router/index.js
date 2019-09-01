import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/h5Edit',
      component: App
    },
    {
      path: '/h5Edit',
      name: 'h5Edit',
      component: () => import('@/views/h5Edit/index.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue')
    }
  ]
})
