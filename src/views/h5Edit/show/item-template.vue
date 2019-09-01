<template>
  <div class="h5-item" @contextmenu.prevent="rightClick($event)" @click.stop="selectElement">

    <VueDragResize
      :is-active="showIndex === activeItem"
      :w="itemJson.positionSize.width"
      :h="itemJson.positionSize.height"
      :x="itemJson.positionSize.left"
      :y="itemJson.positionSize.top"
      :minw="1"
      :minh="1"
      @resizing="resize"
      @dragging="resize"
    >
      <div v-if="item.type === 'text'" class="show-item" :style="[itemJson.text, tempAnimate]">
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
    }
  },
  data() {
    return {
      // 预览动画
      tempAnimate: {}
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
    }
  },

  methods: {
    ...mapMutations(['setActiveItem', 'setRightClickState']),
    // 选择元素
    selectElement() {
      this.setActiveItem(this.showIndex)
    },
    // 处理阴影方向值
    handleShadowDire(boxShadow) {
      return boxShadow.hShadow + 'px ' + boxShadow.vShadow + 'px ' + boxShadow.blur + 'px ' + boxShadow.spread + 'px ' + boxShadow.color
    },
    // 播放动画
    playAnimate(currentAnimate) {
      console.log(currentAnimate)
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
    rightClick(event) {
      this.setRightClickState(event)
      this.selectElement()
    },
    // 拖动拉拽
    resize(newRect) {
      this.item.positionSize.width = newRect.width
      this.item.positionSize.height = newRect.height
      this.item.positionSize.top = newRect.top
      this.item.positionSize.left = newRect.left
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

