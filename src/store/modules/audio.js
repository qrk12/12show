
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
    onPlaying(state, status) {
      state.playing = status
    },
    onPlay(state) {
      state.play += 1
    },
    onPause(state) {
      state.pause += 1
    },
    setMusic(state, music) {
      state.music = music
    },
    setAudioVisible(state, status) {
      state.audioVisible = status
    }
  }
}
