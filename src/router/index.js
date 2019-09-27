import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/App.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: '/h5Edit/:id',
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
