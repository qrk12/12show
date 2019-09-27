<template>
  <div class="header background-main-color">
    <el-row>
      <el-col :span="8">
        <div class="brand">
          12Show
        </div>
      </el-col>
      <el-col :span="8">

        <el-menu
          :default-active="navActive"
          class="flex-center"
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
        <div class="right-button">
          <!-- <span class="text" @click="onSetting()">预览和设置</span> -->
          <!-- <span class="text" @click="onSave()">保存</span> -->
          <el-button type="default" size="mini" @click="onSave()">保存</el-button>
          <el-button :loading="loading" type="default" size="mini" @click="onSetting()">预览和设置</el-button>
        </div>
      </el-col>
    </el-row>

    <ImageGallery :image-visible.sync="imageVisible" :is-crop="isCrop" crop-title="裁剪背景" :fixed-number="[2,3]" @selected="onAddimage" />
    <AudioDialog :audio-visible.sync="audioVisible" />
  </div>
</template>

<script>
import mixin from '@/mixins/mixin.js'
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
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
      navActive: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['currentPageData', 'currentItemData']),
    ...mapState(['defaultItem'])

  },
  methods: {
    ...mapMutations([
      'setting/onSetting',
      'addItem'
    ]),
    ...mapActions(['updateWorks']),
    addText() {
      const item = this.deepCopy(this.defaultItem)
      item.id = this.timeStamp()
      item.type = 'text'
      item.content = '编辑的文本'
      const zIndex = this.currentPageData.items.length
      item.positionSize.zIndex = zIndex + 1
      this.addItem(item)
    },
    onImageGallery(isCrop) {
      this.isCrop = isCrop
      this.imageVisible = true
    },
    onAddimage(url, origin) {
      if (this.isCrop) {
        // 添加背景
        this.currentPageData.background.image.crop = url
        this.currentPageData.background.image.origin = origin
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
      const zIndex = this.currentPageData.items.length
      item.positionSize.zIndex = zIndex + 1

      item.content = url

      const imgSize = this.hangleImgSize(url)
      item.positionSize.width = imgSize.width
      item.positionSize.height = imgSize.height
      this.addItem(item)
    },
    onSave() {
      this.loading = true
      this.updateWorks().then(res => {
        this.loading = false
      })
        .catch(() => {
          this.$message.error('更新失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
    height: 60px;
    color: rgb(191, 203, 217);
    overflow: hidden;

    // .text{
    //   line-height: 60px;
    //   margin: 0 10px;
    //   cursor: default;
    // }
    .brand{
      margin: 0 10px;
      font-size: 24px;
      color: #ffffff;
      line-height: 60px;
    }

    .right-button{
      text-align: right;
      margin-top: 15px;
      margin-right: 10px;
    }
}
</style>

