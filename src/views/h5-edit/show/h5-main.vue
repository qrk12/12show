<template>
  <div class="flex-center" @mousedown="onMousedown" @mousemove="onMousemove" @mouseup="onMouseup">

    <div ref="frame-select" class="frame-select" :style="frameStyle" />

    <MobileBorder>
      <template v-slot>
        <div ref="main" class="main show-screen" :style="getBackground">
          <ItemTemplate
            v-for="(item, index) in currentPageData.items"
            :key="item.id"
            :item="item"
            :show-index="index"
            :frame-position="framePosition"
            :main-rect="mainRect"
            :is-mouse-down="isMouseDown"
            @onFramSelect="onFramSelect"
          />
        </div>
      </template>
    </MobileBorder>

    <RightOperation :frame-select="frameSelect" />

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ItemTemplate from './item-template'
import MobileBorder from './mobile-border'
import RightOperation from '../editor/right-operation'
import { mediaPath } from '@/utils/validate.js'

export default {
  name: 'H5Main',
  components: {
    ItemTemplate,
    MobileBorder,
    RightOperation
  },
  data() {
    return {
      isMouseDown: false,
      frameStyle: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      framePosition: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
      },
      // main 的位置
      mainRect: {},
      // 框选的元素
      frameSelect: {}
    }
  },
  computed: {
    ...mapGetters(['currentPageData']),
    getBackground() {
      if (this.currentPageData.background.image.crop) {
        const imgUrl = mediaPath(this.currentPageData.background.image.crop)
        return 'background: url(' + imgUrl + ') center center / cover no-repeat;'
      } else if (this.currentPageData.background.color) {
        return 'background: ' + this.currentPageData.background.color
      } else {
        // 默认白色背景
        return 'background:#ffffff;'
      }
    }
  },
  mounted() {
    const rect = this.$refs.main.getBoundingClientRect()
    this.mainRect.left = rect.left
    this.mainRect.top = rect.top
  },
  methods: {
    ...mapMutations(['setRightClickState']),
    onMousedown(e) {
      this.framePosition.startX = e.clientX
      this.framePosition.startY = e.clientY

      this.frameStyle = {
        left: e.clientX + 'px',
        top: e.clientY + 'px',
        widht: 0,
        height: 0
      }
      this.isMouseDown = true
    },
    onMousemove(e) {
      if (this.isMouseDown) {
        this.framePosition.endX = e.clientX
        this.framePosition.endY = e.clientY
        this.frameStyle.width = e.clientX - this.framePosition.startX
        this.frameStyle.height = e.clientY - this.framePosition.startY
        this.frameStyle.width += 'px'
        this.frameStyle.height += 'px'
        // console.log(this.frameStyle)
      }
    },
    onMouseup() {
      this.isMouseDown = false
    },
    onFramSelect(index, item) {
      // this.frameSelect[index] = item
      this.$set(this.frameSelect, index, item)
      // console.log(this.frameSelect)
    }
  }
}
</script>

<style lang="scss" scoped>
.frame-select{
  position: fixed;
  border: 1px solid rgb(120,196,241);
  background: rgba(187,215,236, 0.2);
  z-index: 10000;
}
.main{
    width: 320px;
    height: 486px;
    position: relative;
    background: #ffffff;
    overflow: hidden;
}

</style>
