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
          <el-menu-item index="3" @click="onMusic">音乐</el-menu-item>
          <!-- <el-menu-item index="4">视频</el-menu-item> -->
          <!-- <el-submenu index="5">
            <template slot="title">表单</template>
            <el-menu-item index="2-1">输入框</el-menu-item>
            <el-menu-item index="2-2">单选</el-menu-item>
            <el-menu-item index="2-3">多选</el-menu-item>
            <el-menu-item index="2-4">下拉框</el-menu-item>
          </el-submenu> -->
          <el-menu-item index="6" @click="onImageGallery(true)">背景</el-menu-item>

        </el-menu>

      </el-col>
      <el-col class="right-wrap" :span="8">
        <div class="right-button">

          <el-badge :is-dot="isModify" class="item">
            <el-button type="primary" size="mini" @click="onSave()">保存</el-button>
          </el-badge>
          <el-badge :is-dot="isPublish" class="item">
            <el-button type="success" size="mini" @click="onPublish()">发布</el-button>
          </el-badge>
          <el-badge class="item">
            <el-button type="default" size="mini" @click="onSetting()">预览和设置</el-button>
          </el-badge>
        </div>
      </el-col>
    </el-row>

    <ImageGallery :image-visible.sync="imageVisible" :is-crop="isCrop" crop-title="裁剪背景" :fixed-number="[2,3]" @selected="onAddimage" />

    <AudioLibrary />

    <JumpLink v-if="currentItemData" />

  </div>
</template>

<script>
import mixin from '@/mixins/mixin.js'
import mixinWorks from '../mixins/mixin.js'
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
import ImageGallery from '@/components/ImageGallery'
import AudioLibrary from '@/components/AudioLibrary'
import JumpLink from '@/components/JumpLink/index.vue'
import { defaultItem } from '@/utils/data.js'

export default {
  name: 'H5Header',
  components: {
    ImageGallery,
    AudioLibrary,
    JumpLink
  },
  mixins: [mixin, mixinWorks],
  data() {
    return {
      isCrop: false,
      imageVisible: false,
      navActive: null
    }
  },
  computed: {
    ...mapGetters(['currentPageData', 'currentItemData']),
    ...mapState(['isModify', 'isPublish'])
  },
  methods: {
    ...mapMutations([
      'setting/onSetting',
      'addItem',
      'audio/setAudioVisible',
      'addHistory'
    ]),
    ...mapActions(['saveWorks', 'publishWorks']),
    addText() {
      const item = this.deepCopy(defaultItem)
      item.id = this.timeStamp()
      item.type = 'text'
      item.content = '编辑的文本'

      this.addItem(item)

      this.addHistory()
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
        this.addHistory()
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
      const item = this.deepCopy(defaultItem)
      item.id = this.timeStamp()
      item.type = 'img'
      item.content = url

      const imgSize = this.hangleImgSize(url)
      item.positionSize.width = imgSize.width
      item.positionSize.height = imgSize.height
      this.addItem(item)
      this.addHistory()
    },
    onMusic() {
      this['audio/setAudioVisible'](true)
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
    height: 60px;
    color: rgb(191, 203, 217);
    overflow: hidden;

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
      .item{
        margin-left: 10px;
      }
    }
}
</style>

