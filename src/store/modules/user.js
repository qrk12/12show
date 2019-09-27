import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/login'

export default {
  namespaced: true,

  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    // user login
    login({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        login(loginForm).then(res => {
          commit('SET_TOKEN', res.token)
          setToken(res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
