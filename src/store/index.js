import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app.js'
import audio from './modules/audio.js'
import setting from './modules/setting.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  ...app,
  modules: {
    audio,
    setting,
    user
  }
})
