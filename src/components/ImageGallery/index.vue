<template>
  <div class="image-dialog">

    <el-dialog :visible.sync="imageVisible" width="1000px" :before-close="close" :destroy-on-close="false" :modal-append-to-body="false">

      <div slot="title">
        <div class="flex">
          <div class="dialog-title">图片库</div>
          <div class="flex">
            <el-upload
              class="upload-wrap"
              :action="uploadUrl"
              :headers="headers"
              :data="{type:'img'}"
              :on-success="onSucess"
              :on-error="onError"
              :show-file-list="false"
              :on-change="onChange"
              accept=".jpg,.png,.gif"
              multiple
            >
              <el-button :loading="loading" size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button type="info" size="mini" @click="imageLinkVisible = true">外链图片</el-button>
          </div>
        </div>
      </div>

      <el-tabs v-model="tabIndex" class="tab-card" tab-position="left" type="border-card">
        <el-tab-pane label="最近使用" name="update">
          <ImageManage :tab-index="tabIndex" :is-crop="isCrop" :crop-title="cropTitle" :fixed="fixed" :fixed-number="fixedNumber" @close="close" @selected="selected" />
        </el-tab-pane>
        <el-tab-pane label="我的上传" name="create">
          <ImageManage ref="uploadRef" :tab-index="tabIndex" :is-crop="isCrop" :crop-title="cropTitle" :fixed="fixed" :fixed-number="fixedNumber" @close="close" @selected="selected" />
        </el-tab-pane>
      </el-tabs>

      <ImageLink :image-link-visible.sync="imageLinkVisible" />

    </el-dialog>
  </div>
</template>

<script>
import ImageManage from './image-manage'
import ImageLink from './image-link'
import { uploadUrl } from '@/api/media.js'
import { getToken } from '@/utils/auth'

export default {
  name: 'ImageGallery',
  components: {
    ImageManage,
    ImageLink
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
    },
    fixed: {
      type: Boolean,
      default: true
    },
    fixedNumber: {
      type: Array,
      default() {
        return [1, 1]
      }
    }
  },
  data() {
    return {
      uploadUrl,
      headers: {
        Authorization: getToken()
      },
      tabIndex: 'update',
      loading: false,
      imageLinkVisible: false

    }
  },
  methods: {
    close() {
      this.$emit('update:imageVisible', false)
    },
    selected(url, origin) {
      this.$emit('selected', url, origin)
      this.close()
    },
    onSucess() {
      if (this.tabIndex === 'create') {
        this.$refs.uploadRef.fetchData()
      } else {
        this.tabIndex = 'create'
      }
    },
    onError() {
      this.$message.error('上传失败')
    },
    onChange() {
      this.loading = !this.loading
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
    font-size: 22px;
    color: #000000;
    margin-right: 30px;
  }

  .upload-wrap{
    margin-right: 10px;
  }

  .tab-card{
    height: 500px;
  }

}

</style>
