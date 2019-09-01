
export default {
  namespaced: true,

  state: {
    play: 0,
    pause: 0,
    playing: false,
    music: {
      name: '',
      url: ''
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
    }
  }
}
