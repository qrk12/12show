<template>
  <div class="video-play flex">

    <div>
      <i v-if="!playing" class="el-icon-video-play icon" @click="onPlay()" />
      <i v-if="playing" class="el-icon-video-pause icon" @click="onPause()" />
    </div>

    <div class="video-right">
      <div class="flex-space-between">
        <span class="name">{{ music.name }}</span>
        <span class="time">{{ currentTime | formatSecond }}/{{ duration | formatSecond }}</span>
      </div>
      <div @mouseenter="hovering = true" @mouseleave="hovering = false">
        <el-slider v-model="sliderTime" :max="duration" class="video-progress" input-size="mini" :show-tooltip="false" @change="changeCurrentTime" />

      </div>
    </div>

    <div class="handle">
      <el-button :type="isDefault ? 'primary' : 'info'" size="mini" plain @click="onDefault">默认音乐</el-button>
      <el-button type="primary" size="mini" @click="onConfirm">确定</el-button>
    </div>

    <audio
      ref="audio"
      loop
      :src="music.url"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    >
      您的浏览器不支持 audio 音乐。
    </audio>
  </div>
</template>

<script>
import { realFormatSecond } from '@/utils/time.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AudioPlay',
  filters: {
    formatSecond(time) {
      return realFormatSecond(time)
    }
  },
  data() {
    return {
      hovering: false,
      duration: 0,
      currentTime: 0,
      sliderTime: 0,
      isDefault: false
    }
  },
  computed: {
    ...mapState({
      playing: state => state.audio.playing,
      play: state => state.audio.play,
      pause: state => state.audio.pause,
      music: state => state.audio.music,
      defaultMusic: state => state.h5Json.defaultMusic
    })
  },
  watch: {
    play() {
      this.$refs.audio.play()
    },
    pause() {
      this.$refs.audio.pause()
    },
    music(newValue) {
      if (newValue.url !== '' && newValue.url === this.defaultMusic.url) {
        this.isDefault = true
      } else {
        this.isDefault = false
      }
    }
  },
  methods: {
    ...mapMutations([
      'audio/onPlay',
      'audio/onPause',
      'setMusic',
      'setDefaultMusic'
    ]),
    onPlay() {
      this['audio/onPlay']()
    },
    onPause() {
      this['audio/onPause']()
    },
    // 播放监听
    onTimeupdate(res) {
      this.currentTime = parseInt(res.target.currentTime)
      if (!this.hovering) {
        this.sliderTime = this.currentTime
      }
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      this.duration = parseInt(res.target.duration)
      this.onPlay()
    },
    // 拖动进度条，改变当前时间
    changeCurrentTime(time) {
      this.$refs.audio.currentTime = time
    },
    onConfirm() {
      this.setMusic(this.music)
      this.$emit('close', false)
    },
    onDefault() {
      this.setDefaultMusic(this.music)
      this.isDefault = true
    }

  }

}
</script>

<style lang="scss">
.video-play{
  position: absolute;
  top: 5px;
  left: 300px;
  // transform: translate(-50%, 0);
  border-radius: 10px;
  color: #303133;
  padding-top: 3px;
  font-size: 14px;

  .icon{
    font-size: 46px;
    color: #409EFF;
  }

  .video-right{
    margin-top: 3px;
    margin-left: 20px;
    width: 350px;
  }

  .name{
    display: inline-block;
    min-width: 100px;
  }

  .time{
      margin-left: 30px;
  }

  .el-slider__runway{
    margin: 5px 0px;
  }
  .el-slider__button{
    width: 10px;
    height: 10px;
  }

  .handle{
    margin-left: 20px;
    padding-top: 10px;
  }

}
</style>
