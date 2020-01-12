import { getToken, setToken, removeToken, setInfo } from '@/utils/auth'
import { login, info, signout } from '@/api/user'
import { check } from '@/api/upgrade'

export default {
  namespaced: true,

  state: {
    UserToken: getToken(),
    updateInfo: {
      isUpgrade: 0,
      currentVersion: ''
    }
  },

  mutations: {
    SET_TOKEN: (state, UserToken) => {
      state.UserToken = UserToken
    }
  },

  actions: {
    // user login
    login({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        login(loginForm).then(res => {
          if (res.UserToken) {
            commit('SET_TOKEN', res.UserToken)
            setToken(res.UserToken)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    getInfo() {
      return new Promise((resolve, reject) => {
        info().then(res => {
          console.log(res)
          setInfo(res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    upgrapde({ state }) {
      return new Promise((resolve, reject) => {
        check().then(res => {
          state.updateInfo = res
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    frontLogOut({ commit }) {
      return new Promise(resolve => {
        signout().then(() => {
          removeToken()
          resolve()
        })
      })
    }
  }
}
