<template>
  <div class="page" @touchstart="onMousedown" @touchend="onCancelDrag" @touchmove="onMousemove">

    <div class="main">

      <transition name="fade-in-up">

        <div v-if="show" class="show-screen" :style="getBackground(itemPage.background)">

          <ItemTemplate
            v-for="(item, index) in itemPage.items"
            :key="item.id"
            :item="item"
            :show-index="index"
            :width-rate="widthRate"
            :height-rate="heightRate"
            @jumpPage="jumpPage"
          />

        </div>

      </transition>

      <i class="el-icon-arrow-up arrow-up" />

      <svg-icon v-if="pagesData.bgMusic.path" class="music-icon" :class="{'music-icon-circle':audioPlaying}" icon-class="music" @click.stop="onPlayPause()" />

      <el-progress :percentage="percentage" :show-text="false" :stroke-width="3" class="percentage" />

    </div>

    <audio
      ref="audio"
      loop
      autoplay
      preload="auto"
      :src="pagesData.bgMusic.path"
      @playing="audioPlaying = true"
      @pause="audioPlaying = false"
    />

  </div>
</template>

<script>

// import ItemTemplate from './item-template'
import ItemTemplate from '@/components/ItemTemplate'
import { mediaPath } from '@/utils/validate.js'

export default {
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
      audioPlaying: false,
      widthRate: 1,
      heightRate: 1
    }
  },

  computed: {
    itemPage() {
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
      handler: function() {
        console.log('worksinfo', this.worksInfo)
        this.pagesData = this.worksInfo
      },
      immediate: true
    }
  },
  created() {
    this.initData()
    console.log(this.pagesData.bgMusic.path)
  },
  methods: {
    initData() {
      // 屏幕的宽度
      const clientWidth = window.screen.width
      // 屏幕的高度
      const clientHeight = window.screen.height

      // 宽高单位的比例
      this.widthRate = clientWidth / 320
      this.heightRate = clientHeight / 486
    },
    getBackground(background) {
      if (background.image.crop) {
        const crop = mediaPath(background.image.crop)
        return 'background: url(' + crop + ') center center / cover no-repeat;'
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
      this.initY = e.touches[0].clientY
      this.isDrag = true
    },
    onMousemove(e) {
      if (this.isDrag) {
        // 往上拖动20个像素翻页
        if (this.initY - e.touches[0].clientY > 10) {
          this.onNextPage()
          this.onCancelDrag()
        } else if (e.touches[0].clientY - this.initY > 10) {
          // 返回上一页
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
    },
    audioPause() {
      this.$refs.audio.pause()
    },
    jumpPage(index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="scss" scope>

.fade-in-up-enter-active {
  animation: fadeInUp 1s;
}

.page{
    width: 100vw;
    height: 100vh;
    position: relative;
    background: #ffffff;
    overflow: hidden;

  .main{
    width: 100%;
    height: 100%;
    .show-screen{
      width: 100%;
      height: 100%;
    }
  }

  .arrow-up{
    position: absolute;
    z-index: 1501;
    bottom: 20px;
    left: 50%;
    margin-left: -12px;
    font-size: 24px;
    font-weight: bold;
    animation: fadeInUp 1.5s infinite;
  }
  .music-icon{
    position: absolute;
    z-index: 1501;
    top: 5%;
    right: 5%;
    font-size: 24px;
  }
  .music-icon-circle{
    animation: circle 1.5s infinite linear;
  }

  .percentage{
      position: absolute;
      bottom: 0px;
      z-index: 1500;
      width: 100%;
      height: 3px;
  }

  @keyframes circle{
    from {transform:rotate(0deg);}
    to {transform: rotate(360deg)}
  }
}

</style>
