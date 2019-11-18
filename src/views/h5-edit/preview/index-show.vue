<template>
  <div class="mobile-side">
    <div class="mobile-border">

      <div class="main" @mousedown="onMousedown" @mouseup="onCancelDrag" @mouseleave="onCancelDrag" @mousemove="onMousemove">

        <transition name="fade-in-up">

          <div v-if="show" class="show-screen" :style="getBackground(itemPage.background)">

            <ItemTemplate v-for="(item, index) in itemPage.items" :key="item.id" :item="item" :show-index="index" />

          </div>

        </transition>

        <i class="el-icon-arrow-up arrow-up" />

        <svg-icon v-if="pagesData.bgMusic.path" class="music-icon" :class="{'music-icon-circle':audioPlaying}" icon-class="music" @click.stop="onPlayPause()" />

      </div>

      <el-progress :percentage="percentage" :show-text="false" :stroke-width="3" />

    </div>

    <div class="sidebar">
      <div class="page-button" @click="onPrePage">上一页</div>
      <div class="page-button" @click="onNextPage">下一页</div>
    </div>

    <audio
      ref="audio"
      loop
      autoplay
      autobuffer
      preload="auto"
      :src="pagesData.bgMusic.path"
    />

  </div>
</template>

<script>

import { mapState } from 'vuex'
import ItemTemplate from './item-template'

export default {
  name: 'IndexShow',
  components: {
    ItemTemplate
  },
  props: {
    worksInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeIndex: 0,
      // 控制切换页面动画
      show: true,
      isDrag: false,
      // 鼠标按下的坐标
      initY: 0,
      // 页面数据
      pagesData: {},
      audioPlaying: true
    }
  },

  computed: {
    ...mapState(['h5Json']),
    itemPage() {
      console.log(this.pagesData.pages[this.activeIndex])
      return this.pagesData.pages[this.activeIndex]
    },
    pagesLength() {
      return this.pagesData.pages.length
    },
    percentage() {
      const currentPage = this.activeIndex + 1
      return currentPage * 100 / this.pagesLength
    }
  },
  watch: {
    worksInfo: {
      handler: 'initData',
      immediate: true
    }
  },
  methods: {
    initData() {
      if (this.worksInfo === null) {
        this.pagesData = this.h5Json
      } else {
        this.pagesData = this.worksInfo
      }
    },
    getBackground(background) {
      if (background.image) {
        return 'background: url(' + background.image.crop + ') center center / cover no-repeat;'
      } else {
        return 'background: ' + background.color
      }
    },
    pageAnimate() {
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 10)
    },
    onPrePage() {
      if (this.activeIndex <= 0) {
        this.activeIndex = this.pagesLength - 1
      } else {
        this.activeIndex -= 1
      }
      this.pageAnimate()
    },
    onNextPage() {
      if (this.activeIndex + 1 >= this.pagesLength) {
        this.activeIndex = 0
      } else {
        this.activeIndex += 1
      }
      this.pageAnimate()
    },
    onMousedown(e) {
      console.log('mouse down', e)
      this.initY = e.clientY
      this.isDrag = true
    },
    onMousemove(e) {
      if (this.isDrag) {
        // 往上拖动20个像素翻页
        if (this.initY - e.clientY > 10) {
          this.onNextPage()
          this.onCancelDrag()
        } else if (e.clientY - this.initY > 10) {
          this.onPrePage()
          this.onCancelDrag()
        }
      }
    },
    onCancelDrag() {
      this.isDrag = false
    },
    onPlayPause() {
      if (this.audioPlaying) {
        this.audioPause()
      } else {
        this.audioPlay()
      }
    },
    audioPlay() {
      this.$refs.audio.play()
      this.audioPlaying = true
    },
    audioPause() {
      this.$refs.audio.pause()
      this.audioPlaying = false
    }
  }
}
</script>

<style lang="scss" scope>

.fade-in-up-enter-active {
  animation: fadeInUp 1s;
}

.mobile-side{
    display: flex;

    .mobile-border{
        position: relative;
        padding: 50px 5px;
        background: #C0C4CC;
        border-radius: 30px;
    }

  .main{
    width: 320px;
    height: 486px;
    position: relative;
    background: #ffffff;
    overflow: hidden;

    .show-screen{
      width: 100%;
      height: 100%;
    }

  }

  .sidebar{
    margin-top: 140px;
    letter-spacing: 10px;
    cursor: default;

    .page-button{
      margin-bottom: 10px;
      padding: 20px 5px 5px 5px;
      writing-mode:tb-rl;
      text-align: center;
      background: #409EFF;
      color: #ffffff;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      outline: none;
    }
  }

  .arrow-up{
    position: absolute;
    z-index: 1501;
    top: 455px;
    left: 140px;
    font-size: 24px;
    font-weight: bold;
    // color: #ffffff;
    animation: fadeInUp 1.5s infinite;
  }
  .music-icon{
    position: absolute;
    z-index: 1501;
    top: 20px;
    left: 270px;
    font-size: 24px;
  }
  .music-icon-circle{
    animation: circle 1.5s infinite linear;
  }

  @keyframes circle{
    from {transform:rotate(0deg);}
    to {transform: rotate(360deg)}
  }
}

</style>
