<template>
  <div class="h5-item" :style="[itemJson.positionSize]">
    <div
      v-if="item.type === 'text'"
      ref="item"
      class="show-item"
      :style="[itemJson.text, tempAnimate]"
      @click="onJump(item)"
    >{{ item.content }}</div>

    <img
      v-if="item.type === 'img'"
      ref="item"
      class="show-item"
      :width="itemJson.positionSize.width"
      :height="itemJson.positionSize.height"
      :style="[itemJson.text, tempAnimate]"
      :src="item.content | handleImg"
      @click="onJump(item)"
    >

    <video
      v-if="item.type === 'video'"
      ref="item"
      class="show-item"
      :width="itemJson.positionSize.width"
      :height="itemJson.positionSize.height"
      :style="[itemJson.text, tempAnimate]"
      :src="item.content | handleImg"
      controls
    />

    <div
      v-if="item.type === 'countUp'"
      class="show-item"
      :style="[itemJson.text, tempAnimate]"
    >
      <CountUp
        v-if="item.type === 'countUp'"
        :extras="item.extras"
      />
    </div>

  </div>
</template>

<script>
import mixin from '@/mixins/mixin.js'
import CountUp from '../CountUp'

export default {
  components: {
    CountUp
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
    widthRate: {
      type: Number,
      default: 1
    },
    heightRate: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // 预览动画
      tempAnimate: {}
    }
  },
  computed: {
    itemJson() {
      const item = this.deepCopy(this.item)

      // 堆叠顺序
      item.positionSize.zIndex = this.showIndex
      // 添加单位
      const unit = 'px'
      item.text.fontSize = item.text.fontSize * this.widthRate + unit
      item.text.padding = item.text.padding * this.widthRate + unit
      item.text.borderWidth = item.text.borderWidth * this.widthRate + unit
      item.text.borderRadius = item.text.borderRadius * this.widthRate + unit
      item.positionSize.left = item.positionSize.left * this.widthRate + unit

      item.positionSize.top = item.positionSize.top * this.heightRate + unit

      // 框宽度
      item.positionSize.width = item.positionSize.width * this.widthRate + unit
      item.positionSize.height =
        item.positionSize.height * this.widthRate + unit

      const em = 'em'
      item.text.letterSpacing += em
      item.text.lineHeight += em

      item.text.transform = `rotate(${item.transform.rotate}deg)`

      item.text.boxShadow = this.handleShadowDire(item.boxShadow)

      this.delayLoopAnimate()

      return item
    }
  },
  methods: {
    // 处理阴影方向值
    handleShadowDire(boxShadow) {
      return (
        boxShadow.hShadow +
        'px ' +
        boxShadow.vShadow +
        'px ' +
        boxShadow.blur +
        'px ' +
        boxShadow.spread +
        'px ' +
        boxShadow.color
      )
    },
    // 等页面动画完成,执行元素动画
    delayLoopAnimate() {
      const animateLength = this.item.animate.length
      if (animateLength > 0) {
        setTimeout(() => {
          this.loopAnimate(0, animateLength)
        }, 1000)
      }
    },
    // 播放动画
    playAnimate(currentAnimate) {
      // 初始化
      this.tempAnimate = {}
      setTimeout(() => {
        this.tempAnimate = { ...currentAnimate }
        if (this.tempAnimate.isInfinite === true) {
          this.tempAnimate.animationIterationCount = 'infinite'
        }

        this.tempAnimate.animationDuration += 's'
        this.tempAnimate.animationDelay += 's'

        // 动画完成后，保留最后一个状态
        this.tempAnimate.animationFillMode = 'forwards'
      }, 10)
    },
    // 递归循环动画
    loopAnimate(index, total) {
      const currentAnimate = this.item.animate[index]
      this.playAnimate(currentAnimate)

      const delay =
        (currentAnimate.animationDuration + currentAnimate.animationDelay) *
        currentAnimate.animationIterationCount

      setTimeout(() => {
        if (index + 1 < total) {
          this.loopAnimate(index + 1, total)
        }
      }, delay * 1000)
    }, // 跳转
    onJump(item) {
      console.log('click', item)
      if (item.click) {
        if (item.click.type === 'link' && item.click.link !== '') {
          window.open(item.click.link)
        } else if (item.click.type === 'page' && item.click.page !== '') {
          this.$emit('jumpPage', item.click.page - 1)
        } else if (item.click.type === 'tel' && item.click.tel !== '') {
          window.location.href = 'tel:' + item.click.tel
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.h5-item {
  position: absolute;
  cursor: default;
}
</style>

