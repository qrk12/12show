
export default {
  namespaced: true,

  state: {
    audioVisible: false,
    play: 0,
    pause: 0,
    playing: false,
    music: {
      path: null,
      name: null
    }
  },

  mutations: {
    onPlay(state) {
      state.play += 1
      state.playing = true
    },
    onPause(state) {
      state.pause += 1
      state.playing = false
    },
    setMusic(state, music) {
      state.music = music
    },
    setAudioVisible(state, status) {
      state.audioVisible = status
    }
  }
}
