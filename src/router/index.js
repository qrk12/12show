import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/App.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index/index.vue')
    },
    {
      path: '/works/:id',
      name: 'works',
      component: () => import('@/views/works/works.vue')
    },
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
      path: '/h5-edit/:id',
      name: 'h5Edit',
      component: () => import('@/views/h5-edit/index.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404.vue')

    }
  ]
})
