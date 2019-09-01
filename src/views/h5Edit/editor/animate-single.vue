<template>
  <div>
    <el-form label-width="80px">

      <el-form-item label="动画">
        <el-select v-model="animateItem.animationName" clearable @visible-change="onNameBlur">
          <el-option-group
            v-for="group in animateOptions"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-form-item label="时长">
        <el-slider
          v-model="animateItem.animationDuration"
          show-input
          :min="0"
          :max="20"
          :step="0.1"
        />
      </el-form-item>

      <el-form-item label="延时">
        <el-slider
          v-model="animateItem.animationDelay"
          show-input
          :min="0"
          :max="20"
          :step="0.1"
        />
      </el-form-item>

      <el-form-item label="次数">
        <div>
          <el-input-number v-model="animateItem.animationIterationCount" :min="1" :max="10" size="mini" />
          <el-checkbox v-model="animateItem.isInfinite" border size="mini" class="loop-number">循环播放</el-checkbox>
        </div>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'AnimateSigle',
  props: {
    animateItem: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      animateOptions: [
        {
          label: '强调类',
          options: [{
            value: 'bounce',
            label: '弹跳'
          },
          {
            value: 'flash',
            label: '闪烁'
          },
          {
            value: 'pulse',
            label: '脉冲'
          },
          {
            value: 'rubberBand',
            label: '橡皮筋'
          },
          {
            value: 'shake',
            label: '左右弱晃动'
          },
          {
            value: 'wobble',
            label: '左右强晃动'
          },
          {
            value: 'swing',
            label: '上下摆动'
          },
          {
            value: 'tada',
            label: '缩放摆动'
          },

          {
            value: 'jello',
            label: '拉伸抖动'
          },
          {
            value: 'heartBeat',
            label: '心跳'
          }]
        },
        {
          label: '弹跳进入',
          options: [
            {
              value: 'bounceIn',
              label: '弹跳进入'
            },
            {
              value: 'bounceInDown',
              label: '向下弹跳进入'
            },
            {
              value: 'bounceInLeft',
              label: '向右弹跳进入'
            },
            {
              value: 'bounceInRight',
              label: '向左弹跳进入'
            },
            {
              value: 'bounceInUp',
              label: '向上弹跳进入'
            }
          ]
        },
        {
          label: '弹跳退出',
          options: [
            {
              value: 'bounceOut',
              label: '弹跳退出'
            },
            {
              value: 'bounceOutDown',
              label: '向下弹跳退出'
            },
            {
              value: 'bounceOutLeft',
              label: '向右弹跳退出'
            },
            {
              value: 'bounceOutRight',
              label: '向左弹跳退出'
            },
            {
              value: 'bounceOutUp',
              label: '向上弹跳退出'
            }
          ]
        },
        {
          label: '淡入类',
          options: [
            {
              value: 'fadeIn',
              label: '淡入'
            },
            {
              value: 'fadeInDown',
              label: '向下淡入'
            },
            {
              value: 'fadeInDownBig',
              label: '向下快速淡入'
            },
            {
              value: 'fadeInLeft',
              label: '向右淡入'
            },
            {
              value: 'fadeInLeftBig',
              label: '向右快速淡入'
            },
            {
              value: 'fadeInRight',
              label: '向左淡入'
            },
            {
              value: 'fadeInRightBig',
              label: '向左快速淡入'
            },
            {
              value: 'fadeInUp',
              label: '向上淡入'
            },
            {
              value: 'fadeInUpBig',
              label: '向上快速淡入'
            }

          ]
        },
        {
          label: '淡出类',
          options: [
            {
              value: 'fadeOut',
              label: '淡出'
            },
            {
              value: 'fadeOutDown',
              label: '向下淡出'
            },
            {
              value: 'fadeOutDownBig',
              label: '向下快速淡出'
            },
            {
              value: 'fadeOutLeft',
              label: '向左淡出'
            },
            {
              value: 'fadeOutLeftBig',
              label: '向左快速淡出'
            },
            {
              value: 'adeOutRight',
              label: '向右淡出'
            },
            {
              value: 'fadeOutRightBig',
              label: '向右快速淡出'
            },
            {
              value: 'fadeOutUp',
              label: '向上淡出'
            },
            {
              value: 'fadeOutUpBig',
              label: '向上快速淡出'
            }
          ]
        },
        {
          label: '翻转类',
          options: [
            {
              value: 'flip',
              label: '翻转'
            },
            {
              value: 'flipInX',
              label: '水平翻转进入'
            },
            {
              value: 'flipInY',
              label: '垂直翻转进入'
            },
            {
              value: 'flipOutX',
              label: '水平翻转退出'
            },
            {
              value: 'flipOutY',
              label: '垂直翻转退出'
            }

          ]
        },
        {
          label: '光速',
          options: [
            {
              value: 'lightSpeedIn',
              label: '光速进入'
            },
            {
              value: 'lightSpeedOut',
              label: '光速退出'
            }
          ]
        },
        {
          label: '旋转进入',
          options: [
            {
              value: 'rotateIn',
              label: '顺时针旋转进入'
            },
            {
              value: 'rotateInDownLeft',
              label: '从左往下旋入'
            },
            {
              value: 'rotateInDownRight',
              label: '从右往下旋入'
            },
            {
              value: 'rotateInUpLeft',
              label: '从左往上旋入'
            },
            {
              value: 'rotateInUpRight',
              label: '从右往上旋入'
            }
          ]
        },
        {
          label: '旋转退出',
          options: [
            {
              value: 'rotateOut',
              label: '顺时针旋转退出'
            },
            {
              value: 'rotateOutDownLeft',
              label: '向左下旋出'
            },
            {
              value: 'rotateOutDownRight',
              label: '向右下旋出'
            },
            {
              value: 'rotateOutUpLeft',
              label: '向左上旋出'
            },
            {
              value: 'rotateOutUpRight',
              label: '向右上旋出'
            }
          ]
        },
        {
          label: '滑入',
          options: [
            {
              value: 'slideInUp',
              label: '从下往上滑入'
            },
            {
              value: 'slideInDown',
              label: '从上往下滑入'
            },
            {
              value: 'slideInLeft',
              label: '从左滑入'
            },
            {
              value: 'slideInRight',
              label: '从右滑入'
            }

          ]
        },
        {
          label: '滑出',
          options: [
            {
              value: 'slideOutUp',
              label: '从下往上滑出'
            },
            {
              value: 'slideOutDown',
              label: '从上往下滑出'
            },
            {
              value: 'slideOutLeft',
              label: '往左滑出'
            },
            {
              value: 'slideOutRight',
              label: '往右滑出'
            }
          ]
        },
        {
          label: '缩放进入',
          options: [
            {
              value: 'zoomIn',
              label: '从下放大进入'
            },
            {
              value: 'zoomInDown',
              label: '从上往下放大进入'
            },
            {
              value: 'zoomInLeft',
              label: '从左放大进入'
            },
            {
              value: 'zoomInRight',
              label: '从右放大进入'
            },
            {
              value: 'zoomInUp',
              label: '从下往上放大进入'
            }
          ]
        },
        {
          label: '缩放退出',
          options: [
            {
              value: 'zoomOut',
              label: '从下缩小进入'
            },
            {
              value: 'zoomOutDown',
              label: '从上往下缩小进入'
            },
            {
              value: 'zoomOutLeft',
              label: '从左缩小进入'
            },
            {
              value: 'zoomOutRight',
              label: '从左缩小进入'
            },
            {
              value: 'zoomOutUp',
              label: '从下往上缩小进入'
            }
          ]
        },
        {
          label: '特别',
          options: [
            {
              value: 'hinge',
              label: '反弹铰链'
            },
            {
              value: 'jackInTheBox',
              label: '玩偶'
            },
            {
              value: 'rollIn',
              label: '弹跳滚动进入'
            },
            {
              value: 'rollOut',
              label: '弹跳滚动移出'
            }
          ]
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['setTriggerAnimate', 'setActiveAnimate']),
    onNameBlur(selectState) {
      if (selectState === false) {
        console.log(selectState)
        this.setActiveAnimate(this.index)
        this.setTriggerAnimate()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loop-number{
    margin-left: 20px;
}
</style>

