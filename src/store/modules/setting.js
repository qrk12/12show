export default {
  namespaced: true,

  state: {
    isSetting: false,
    videoVisible: false
  },

  mutations: {
    onSetting(state) {
      state.isSetting = !state.isSetting
    },
    switchVideo(state) {
      state.videoVisible = !state.videoVisible
    }

  }
}
