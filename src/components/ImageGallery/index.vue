<template>
  <div class="image-dialog">

    <el-dialog :visible.sync="imageVisible" width="1000px" :before-close="close">

      <div slot="title">
        <span class="dialog-title">图片库</span>
        <el-button type="primary" size="mini">点击上传</el-button>
        <el-button type="info" size="mini">外链图片</el-button>
      </div>

      <el-tabs v-model="tabIndex" class="tab-card" tab-position="left" type="border-card">
        <el-tab-pane label="最近使用" name="first">
          <ImageManage :is-crop="isCrop" :crop-title="cropTitle" @close="close" @selected="selected" />
        </el-tab-pane>
        <el-tab-pane label="我的上传" name="second">
          <ImageManage :is-crop="isCrop" :crop-title="cropTitle" @close="close" @selected="selected" />
        </el-tab-pane>
      </el-tabs>

    </el-dialog>
  </div>
</template>

<script>
import ImageManage from './image-manage'

export default {
  name: 'ImageGallery',
  components: {
    ImageManage
  },
  props: {
    imageVisible: {
      type: Boolean,
      default: false
    },
    // 是否裁剪
    isCrop: {
      type: Boolean,
      default: false
    },
    cropTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabIndex: 'first'
    }
  },
  methods: {
    close() {
      this.$emit('update:imageVisible', false)
    },
    selected(url) {
      this.$emit('selected', url)
      this.close()
    }
  }
}
</script>

<style lang="scss">
.image-dialog {

  .el-dialog__header{
    background: #f5f7fa;
  }

  .el-dialog__body{
    padding: 0px;
    height: 500px;
  }

  .dialog-title{
    color: #000000;
    margin-right: 30px;
  }

  .tab-card{
    height: 500px;
  }

  .upload-image{
    position: absolute;
    bottom: 0;
    left: 0;
  }
}

</style>
