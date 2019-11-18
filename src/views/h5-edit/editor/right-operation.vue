<template>

  <div class="operation">

    <div class="item" @mousedown.stop="onRevoke">
      <el-tooltip effect="dark" content="撤销" placement="right">
        <i class="el-icon-refresh-right icon" :class="{active:isRevoke}" />
      </el-tooltip>
    </div>
    <div class="item" @mousedown.stop="onRecover">
      <el-tooltip effect="dark" content="恢复" placement="right">
        <i class="el-icon-refresh-left icon" :class="{active:isRecover}" />
      </el-tooltip>
    </div>
    <div class="item" @mousedown.stop="onCopy">
      <el-tooltip effect="dark" content="复制" placement="right">
        <i class="el-icon-copy-document icon" :class="{active: activeItem !== null || isFrameSelect === true}" />
      </el-tooltip>
    </div>
    <div class="item" @mousedown.stop="onPaste">
      <el-tooltip effect="dark" content="粘贴" placement="right">
        <i class="el-icon-document-copy icon" :class="{active: clipboard.length !== 0}" />
      </el-tooltip>
    </div>
    <div class="item" @mousedown.stop="setZindex(1)">
      <el-tooltip effect="dark" content="上移" placement="right">
        <i class="el-icon-top icon" :class="{active: activeItem !== null}" />
      </el-tooltip>
    </div>
    <div class="item" @mousedown.stop="setZindex(-1)">
      <el-tooltip effect="dark" content="下移" placement="right">
        <i class="el-icon-bottom icon" :class="{active: activeItem !== null}" />
      </el-tooltip>
    </div>
    <div class="item" @mousedown.stop="setZindex('top')">
      <el-tooltip effect="dark" content="置顶" placement="right">
        <i class="el-icon-upload2 icon" :class="{active: activeItem !== null}" />
      </el-tooltip>
    </div>
    <div class="item" @mousedown.stop="setZindex('bottom')">
      <el-tooltip effect="dark" content="置底" placement="right">
        <i class="el-icon-download icon" :class="{active: activeItem !== null}" />
      </el-tooltip>
    </div>
    <div class="item" @mousedown.stop="onDelete()">
      <el-tooltip effect="dark" content="删除" placement="right">
        <i class="el-icon-delete icon" :class="{active: activeItem !== null || isFrameSelect === true}" />
      </el-tooltip>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import mixin from '@/mixins/mixin.js'

export default {
  mixins: [mixin],
  props: {
    frameSelect: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 剪贴板
      clipboard: [],
      // 是否框选
      isFrameSelect: false
    }
  },
  computed: {
    ...mapState(['activeItem']),
    ...mapGetters(['currentItemData', 'currentPageData', 'bgMusic', 'isRevoke', 'isRecover'])
  },
  watch: {
    frameSelect: {
      handler: function(val) {
        this.isFrameSelect = false
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            const element = val[key]
            if (element) {
              this.isFrameSelect = true
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations([
      'setActiveItem',
      'audio/setAudioVisible',
      'addItem',
      'onRevoke',
      'onRecover'
    ]),
    setZindex(type) {
    //   console.log(type)
      // 当前操作元素的索引下标
      let i = this.activeItem

      if (i === null) {
        return
      }

      // 当前页面的元素
      const items = this.currentPageData.items
      const itemsLenth = items.length
      if (type === -1) {
        // 下移
        // 将当前数组index索引与前面一个元素互换位置
        if (i !== 0) {
          items[i] = items.splice(i - 1, 1, items[i])[0]
          this.setActiveItem(i - 1)
        }
      } else if (type === 1) {
        // 上移
        // 将当前数组index索引与后面一个元素互换位置
        if (i + 1 !== itemsLenth) {
          items[i] = items.splice(i + 1, 1, items[i])[0]
          this.setActiveItem(i + 1)
        }
      } else if (type === 'bottom') {
        // 置底

        while (i > 0) {
          items[i] = items.splice(i - 1, 1, items[i])[0]
          i--
        }

        this.setActiveItem(0)
      } else if (type === 'top') {
        while (i + 1 < itemsLenth) {
          items[i] = items.splice(i + 1, 1, items[i])[0]
          i++
        }

        this.setActiveItem(itemsLenth - 1)
      }
    },
    onDelete() {
      if (this.isFrameSelect) {
        const indexs = []
        for (const key in this.frameSelect) {
          if (this.frameSelect.hasOwnProperty(key)) {
            const element = this.frameSelect[key]
            if (element) {
              indexs.push(key)
            }
          }
        }

        const len = indexs.length
        if (len !== 0) {
          // 逆向循环删除
          for (let index = len - 1; index >= 0; index--) {
            const item = +indexs[index]
            this.currentPageData.items.splice(item, 1)
          }
        }
      } else if (this.activeItem !== null) {
        this.currentPageData.items.splice(this.activeItem, 1)
        this.setActiveItem(null)
      }
    },
    onCopy() {
      if (this.isFrameSelect) {
        // 框选
        const clipboard = []
        for (const key in this.frameSelect) {
          if (this.frameSelect.hasOwnProperty(key)) {
            const element = this.frameSelect[key]
            if (element) {
              let item = this.currentPageData.items[key]
              console.log(item)
              item = this.deepCopy(item)
              console.log(item)
              clipboard.push(item)
            }
          }
        }
        if (clipboard.length !== 0) {
          this.clipboard = clipboard
        }
      } else if (this.activeItem !== null) {
        const clipboard = this.deepCopy(this.currentItemData)
        this.clipboard = [clipboard]
      }
    },
    onPaste() {
      for (let index = 0; index < this.clipboard.length; index++) {
        let element = this.clipboard[index]
        // 防止id重复
        element.id = this.timeStamp() + index
        element.positionSize.left += 20
        element.positionSize.top += 20
        element = this.deepCopy(element)
        this.addItem(element)
      }
    },
    onMusic() {
      this['audio/setAudioVisible'](true)
    }
  }
}
</script>

<style lang="scss" scoped>
.operation{
  margin-left: 40px;
  margin-top: 50px;
  padding: 60px 6px 0px 6px;
  height: 428px;
  background: #C0C4CC;
  color:#909399;

  .item{
    margin-bottom: 10px;
    .icon{
      font-size: 26px;
      outline: none;
      cursor: pointer;

      &.active{
          color:#ffffff;
      }
    }
  }

}
</style>
