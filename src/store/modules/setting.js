export default {
  namespaced: true,

  state: {
    isSetting: false,
    isLink: false
  },

  mutations: {
    onSetting(state) {
      state.isSetting = !state.isSetting
    },
    setLink(state) {
      state.isLink = !state.isLink
    }
  }
}
