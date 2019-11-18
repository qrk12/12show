<template>
  <div>

    <div
      v-if="isActive"
      class="right-click"
      :style="{
        top: top+'px',
        left: left+'px'
      }"
      @mouseleave="leave()"
    >
      <div v-if="isEdit" class="item" @click="imageVisible = true">编辑</div>
      <div class="item" @click="onCopy">复制</div>
      <div v-if="clipboard" class="item" @click="onPaste">粘贴</div>
      <div class="item" @click="setZindex(1)">上移</div>
      <div class="item" @click="setZindex(-1)">下移</div>
      <div class="item" @click="setZindex('top')">置顶</div>
      <div class="item" @click="setZindex('bottom')">置底</div>
      <div class="item" @click="onDelete()">删除</div>
    </div>

    <ImageGallery :image-visible.sync="imageVisible" />

  </div>

</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import ImageGallery from '@/components/ImageGallery'
import mixin from '@/mixins/mixin.js'

export default {
  name: 'RightClick',
  components: {
    ImageGallery
  },
  mixins: [mixin],
  data() {
    return {
      isActive: false,
      top: 0,
      left: 0,
      imageVisible: false,
      isEdit: false,
      // 剪贴板
      clipboard: null
    }
  },
  computed: {
    ...mapState(['rightClickState', 'activeItem']),
    ...mapGetters(['currentItemData', 'currentPageData'])
  },
  watch: {
    rightClickState(newValue) {
      if (newValue !== null) {
        this.top = newValue.clientY
        this.left = newValue.clientX
        this.isActive = true
        if (this.currentItemData.type === 'img') {
          this.isEdit = true
        } else {
          this.isEdit = false
        }
      }
    }
  },
  methods: {
    ...mapMutations(['setActiveItem']),

    leave() {
      this.isActive = false
    },
    setZindex(type) {
      // 当前操作元素的索引下标
      let i = this.activeItem
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

      this.leave()
    },
    onDelete() {
      this.currentPageData.items.splice(this.activeItem, 1)
      this.setActiveItem(null)
    },
    onCopy() {
      this.clipboard = { ...this.currentItemData }
    },
    onPaste() {
      this.clipboard.id = this.timeStamp()
      console.log(this.clipboard)
      this.currentPageData.items.push(this.clipboard)
    }
  }

}
</script>

<style lang="scss" scoped>
.right-click{
    position: absolute;
    top: 0;
    width: 100px;
    background: #fff;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 3px;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    z-index: 9999;

    .item{
        padding: 5px 10px;
        color: #333333;

        &:hover{
            color: #ffffff;
            cursor: pointer;
            background: #409EFF;
        }
    }

}
</style>

