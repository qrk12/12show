import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'

import 'animate.css'
import '@/styles/index.scss'

import '@/icons' // icon
import '@/permission' // permission control

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Element,
  render: h => h(App)
}).$mount('#app')
