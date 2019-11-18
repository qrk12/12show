export default {
  namespaced: true,

  state: {
    index: -1, // 当前下标
    maxLength: 20, // 缓存历史数
    editorHistory: [],
    isAdd: true
  },

  getters: {
    // 是否可撤销
    isRevoke: (state) => {
      const len = state.editorHistory.length
      if (len !== 0 && state.index > 0) {
        return true
      } else {
        return false
      }
    },
    // 是否可恢复
    isRecover: (state) => {
      const len = state.editorHistory.length
      if (len !== 0 && state.index + 1 < len) {
        return true
      } else {
        return false
      }
    }
  },
  actions: {
    add({ state, rootState }) {
      if (state.isAdd === false) {
        state.isAdd = true
        return
      }

      const len = state.editorHistory.length
      console.log(rootState)
      let data = {
        activePage: rootState.activePage,
        activeItem: rootState.activeItem,
        h5Json: rootState.h5Json
      }
      data = JSON.stringify(data)

      if (state.index + 1 === len) {
        if (len < state.maxLength) {
          state.editorHistory.push(data)
          state.index += 1
        } else if (len === state.maxLength) {
          // 删除第一个，新增一个
          state.editorHistory.splice(0, 1)
          state.editorHistory.push(data)
        }
      } else if (state.index + 1 < len) {
        state.editorHistory.splice(state.index)
        state.editorHistory.push(data)
      }
    },
    // 撤销
    onRevoke({ state, commit }) {
      console.log('revoke', state.index)
      state.isAdd = false
      if (state.index > 0) {
        state.index -= 1
        const data = JSON.parse(state.editorHistory[state.index])
        commit('setH5Json', data.h5Json, { root: true })
        commit('setActivePage', data.activePage, { root: true })
        commit('setActiveItem', data.activeItem, { root: true })
      }
    },
    // 恢复
    onRecover({ state, commit }) {
      console.log('recover')
      state.isAdd = false
      const len = state.editorHistory.length
      if (state.index + 1 < len) {
        state.index += 1
        const data = JSON.parse(state.editorHistory[state.index])
        commit('setH5Json', data.h5Json, { root: true })
        commit('setActivePage', data.activePage, { root: true })
        commit('setActiveItem', data.activeItem, { root: true })
      }
    }
  }
}

