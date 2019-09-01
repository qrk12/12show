<template>
  <div class="mobile-side">
    <div class="mobile-border">

      <div class="main" @mousedown="onMousedown" @mouseup="onCancelDrag" @mouseleave="onCancelDrag" @mousemove="onMousemove">

        <transition name="fade-in-up">

          <div v-if="show" class="show-screen" :style="getBackground(itemPage.background)">

            <ItemTemplate v-for="(item, index) in itemPage.item" :key="item.id" :item="item" :show-index="index" />

          </div>

        </transition>

        <i class="el-icon-arrow-up arrow-up" />
        <svg-icon class="music-icon" icon-class="music" />

      </div>

      <el-progress :percentage="percentage" :show-text="false" :stroke-width="3" />

    </div>

    <div class="sidebar">
      <div class="page-button" @click="onPrePage">上一页</div>
      <div class="page-button" @click="onNextPage">下一页</div>
    </div>

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

  data() {
    return {
      activeIndex: 0,
      // 控制切换页面动画
      show: true,
      isDrag: false,
      // 鼠标按下的坐标
      initX: 0,
      initY: 0
    }
  },
  computed: {
    ...mapState(['h5Json']),
    itemPage() {
      return this.h5Json.pages[this.activeIndex]
    },
    pagesLength() {
      return this.h5Json.pages.length
    },
    percentage() {
      const currentPage = this.activeIndex + 1
      return currentPage * 100 / this.pagesLength
    }
  },
  methods: {
    getBackground(background) {
      if (background.image) {
        return 'background: url(' + background.image + ') center center / cover no-repeat;'
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
      this.initX = e.clientX
      this.initY = e.clientY
      this.isDrag = true
    },
    onMousemove(e) {
      if (this.isDrag) {
        // 往上拖动20个像素翻页
        if (this.initY - e.clientY > 20) {
          this.onNextPage()
          this.onCancelDrag()
        }
      }
    },
    onCancelDrag() {
      this.isDrag = false
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
    z-index: 9999;
    top: 455px;
    left: 140px;
    font-size: 24px;
    font-weight: bold;
    // color: #ffffff;
    animation: fadeInUp 1.5s infinite;
  }
  .music-icon{
    position: absolute;
    z-index: 9999;
    top: 20px;
    left: 270px;
    font-size: 24px;
    animation: circle 1.5s infinite linear;
  }

  @keyframes circle{
    from {transform:rotate(0deg);}
    to {transform: rotate(360deg)}
  }
}

</style>
