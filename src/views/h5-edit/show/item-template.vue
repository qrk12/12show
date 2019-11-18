<template>
  <!-- <div class="h5-item" @contextmenu.prevent="rightClick($event)" @click="selectElement"> -->
  <div class="h5-item" @click="selectElement">

    <VueDragResize
      :is-active="!isPageTemplate && showIndex === activeItem || isActive"
      :w="itemJson.positionSize.width"
      :h="itemJson.positionSize.height"
      :x="itemJson.positionSize.left"
      :y="itemJson.positionSize.top"
      :minw="1"
      :minh="1"
      :prevent-active-behavior="true"
      @resizestop="resizeDrog"
      @dragstop="resizeDrog"
    >
      <div
        v-if="item.type === 'text'"
        class="show-item"
        :style="[itemJson.text, tempAnimate, positionSize]"
      >
        {{ item.content }}
      </div>

      <img
        v-if="item.type === 'img'"
        class="show-item"
        :width="itemJson.positionSize.width"
        :height="itemJson.positionSize.height"
        :style="[itemJson.text, tempAnimate]"
        :src="item.content"
      >
    </VueDragResize>

  </div>
</template>

<script>
import mixin from '@/mixins/mixin.js'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { setTimeout } from 'timers'
import VueDragResize from 'vue-drag-resize'

export default {
  name: 'ItemTemplate',
  components: {
    VueDragResize
  },
  mixins: [mixin],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    showIndex: {
      type: Number,
      default: 0
    },
    // 框选范围
    framePosition: {
      type: Object,
      default() {
        return {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 0
        }
      }
    },
    mainRect: {
      type: Object,
      default() {
        return {}
      }
    },
    isMouseDown: {
      type: Boolean,
      default: false
    },
    // 是不是页面模版
    isPageTemplate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 预览动画
      tempAnimate: {},
      isActive: false
    }
  },
  computed: {
    ...mapState(['activeItem', 'triggerAnimate', 'previewAnimate']),
    ...mapGetters(['currentAnimate']),
    itemJson() {
      const item = this.deepCopy(this.item)
      // 堆叠顺序
      item.positionSize.zIndex = this.showIndex
      // 添加单位
      const unit = 'px'
      item.text.fontSize += unit
      item.text.padding += unit
      item.text.borderWidth += unit
      item.text.borderRadius += unit

      const em = 'em'
      item.text.letterSpacing += em
      item.text.lineHeight += em

      item.text.transform = `rotate(${item.transform.rotate}deg)`

      item.text.boxShadow = this.handleShadowDire(item.boxShadow)

      return item
    },
    positionSize() {
      return {
        width: this.item.positionSize.width + 'px',
        height: this.item.positionSize.height + 'px',
        left: this.item.positionSize.left + 'px',
        top: this.item.positionSize.top + 'px'
      }
    }
  },
  watch: {
    // 触发动画
    triggerAnimate(newValue) {
      if (this.showIndex === this.activeItem) {
        console.log('animate', this.currentAnimate)

        this.playAnimate(this.currentAnimate)
      }
    },
    // 元素切换，取消动画
    activeItem() {
      this.tempAnimate = {}
    },
    // 预览动画
    previewAnimate() {
      if (this.showIndex === this.activeItem) {
        const animate = this.item.animate
        console.log('preview animate', animate)
        if (animate.length === 1) {
          const currentAnimate = animate[0]
          this.playAnimate(currentAnimate)
        } else if (animate.length > 1) {
          const currentAnimate = animate[0]
          this.playAnimate(currentAnimate)

          const delay = (currentAnimate.animationDuration + currentAnimate.animationDelay) * currentAnimate.animationIterationCount
          console.log(delay)

          setTimeout(() => {
            this.loopAnimate(1, animate.length)
          }, delay * 1000)
        }
      }
    },
    framePosition: {
      handler: 'frameSelect',
      deep: true
    }
  },

  methods: {
    ...mapMutations(['setActiveItem', 'setRightClickState', 'addHistory']),
    // 选择元素
    selectElement() {
      console.log(this.showIndex)
      this.setActiveItem(this.showIndex)
    },
    // 处理阴影方向值
    handleShadowDire(boxShadow) {
      return boxShadow.hShadow + 'px ' + boxShadow.vShadow + 'px ' + boxShadow.blur + 'px ' + boxShadow.spread + 'px ' + boxShadow.color
    },
    // 播放动画
    playAnimate(currentAnimate) {
      // console.log(currentAnimate)
      // 初始化
      this.tempAnimate = {}
      setTimeout(() => {
        this.tempAnimate = { ...currentAnimate }
        if (this.tempAnimate.isInfinite === true) {
          this.tempAnimate.animationIterationCount = 'infinite'
        }

        this.tempAnimate.animationDuration += 's'
        this.tempAnimate.animationDelay += 's'
      }, 10)
    },
    // 递归循环动画
    loopAnimate(index, total) {
      const currentAnimate = this.item.animate[index]
      this.playAnimate(currentAnimate)

      const delay = (currentAnimate.animationDuration + currentAnimate.animationDelay) * currentAnimate.animationIterationCount

      setTimeout(() => {
        if (index + 1 < total) {
          this.loopAnimate(index + 1, total)
        }
      }, delay * 1000)
    },
    // 右键点击
    // rightClick(event) {
    //   if (this.isPageTemplate === true) {
    //     return false
    //   }
    //   this.setRightClickState(event)
    //   this.selectElement()
    // },
    // 拖动拉拽
    resizeDrog(newRect) {
      console.log('stopDrogResiz', newRect)
      this.item.positionSize.width = newRect.width
      this.item.positionSize.height = newRect.height
      this.item.positionSize.top = newRect.top
      this.item.positionSize.left = newRect.left
      this.addHistory()
    },
    frameSelect(val) {
      const clientX = this.mainRect.left + this.item.positionSize.left
      const clientY = this.mainRect.top + this.item.positionSize.top

      if (this.isMouseDown &&
        val.startX <= clientX &&
        clientX <= val.endX &&
        val.startY <= clientY &&
        clientY <= val.endY) {
        this.isActive = true
      } else {
        this.isActive = false
      }

      this.$emit('onFramSelect', this.showIndex, this.isActive)
    }

  }
}
</script>

<style lang="scss" scoped>
.h5-item{
  position: absolute;
  cursor: default;
}

</style>

