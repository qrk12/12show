export default {
  namespaced: true,

  state: {
    isSetting: false
  },

  mutations: {
    onSetting(state) {
      state.isSetting = !state.isSetting
    }
  }
}
