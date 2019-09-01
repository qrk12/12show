<template>
  <div class="header background-main-color">
    <el-row>
      <el-col :span="8">
        <div>
          <span class="text">h5 Page</span>
          <svg-icon icon-class="eye" />

        </div>
      </el-col>
      <el-col :span="8">

        <el-menu
          :default-active="navActive"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#409EFF"
        >
          <el-menu-item index="1" @click="addText">文本</el-menu-item>
          <el-menu-item index="2" @click="onImageGallery(false)">图片</el-menu-item>
          <el-menu-item index="3" @click="audioVisible = true">音频</el-menu-item>
          <el-menu-item index="4">视频</el-menu-item>
          <el-submenu index="5">
            <template slot="title">表单</template>
            <el-menu-item index="2-1">输入框</el-menu-item>
            <el-menu-item index="2-2">单选</el-menu-item>
            <el-menu-item index="2-3">多选</el-menu-item>
            <el-menu-item index="2-4">下拉框</el-menu-item>
          </el-submenu>
          <el-menu-item index="6" @click="onImageGallery(true)">背景</el-menu-item>

        </el-menu>

      </el-col>
      <el-col :span="8">
        <div class="flex-row-reverse">
          <span class="text" @click="onSetting()">预览和设置</span>
          <span class="text">保存</span>
        </div>
      </el-col>
    </el-row>

    <ImageGallery :image-visible.sync="imageVisible" :is-crop="isCrop" crop-title="裁剪背景" :fixed-number="[2,3]" @selected="onAddimage" />
    <AudioDialog :audio-visible.sync="audioVisible" />
  </div>
</template>

<script>
import mixin from '@/mixins/mixin.js'
import { mapGetters, mapMutations, mapState } from 'vuex'
import ImageGallery from '@/components/ImageGallery'
import AudioDialog from '../header/audio-dialog'

export default {
  name: 'H5Header',
  components: {
    ImageGallery,
    AudioDialog
  },
  mixins: [mixin],
  data() {
    return {
      isCrop: false,
      imageVisible: false,
      audioVisible: false,
      navActive: null
    }
  },
  computed: {
    ...mapGetters(['currentPageData', 'currentItemData']),
    ...mapState(['defaultItem'])

  },
  methods: {
    ...mapMutations([
      'setting/onSetting'
    ]),
    addText() {
      const item = this.deepCopy(this.defaultItem)
      item.id = this.timeStamp()
      item.type = 'text'
      item.content = '编辑的文本'
      const zIndex = this.currentPageData.item.length
      item.positionSize.zIndex = zIndex + 1
      this.currentPageData.item.push(item)
    },
    onImageGallery(isCrop) {
      this.isCrop = isCrop
      this.imageVisible = true
    },
    onAddimage(url) {
      if (this.isCrop) {
        // 添加背景
        this.currentPageData.background.image = url
      } else {
        // 添加元素背景
        this.addImage(url)
      }
    },
    onSetting() {
      this['setting/onSetting']()
    },
    // 处理图片高度
    hangleImgSize(url) {
      const img = new Image()
      img.src = url

      // 外壳的宽高一半
      const halfWidth = 160
      const halfiHeight = 243
      const scale = img.width / img.height

      let width = img.width
      let height = img.height
      if (img.width > halfWidth) {
        width = halfWidth
        height = halfWidth / scale
      } else if (img.height > halfiHeight) {
        height = halfWidth
        width = scale * img.width
      }

      return {
        width,
        height
      }
    },
    // 新增图片
    addImage(url) {
      const item = this.deepCopy(this.defaultItem)
      item.id = this.timeStamp()
      item.type = 'img'
      const zIndex = this.currentPageData.item.length
      item.positionSize.zIndex = zIndex + 1

      item.content = url

      const imgSize = this.hangleImgSize(url)
      item.positionSize.width = imgSize.width
      item.positionSize.height = imgSize.height
      this.currentPageData.item.push(item)
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
    height: 60x;
    color: rgb(191, 203, 217);
    overflow: hidden;

    .text{
      line-height: 60px;
      margin: 0 10px;
      cursor: default;
    }
}
</style>

