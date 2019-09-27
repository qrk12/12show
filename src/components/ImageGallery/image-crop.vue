<template>
  <div>
    <el-dialog :title="cropTitle" :visible.sync="cropImgVisible" :before-close="close" :append-to-body="true">
      <div class="crop-content">
        <vueCropper
          v-if="cropImgVisible"
          ref="cropper"
          :img="contentSrc"
          :can-move="false"
          :auto-crop="true"
          :center-box="true"
          :fixed="fixed"
          :fixed-number="fixedNumber"
          output-type="jpeg"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import { uploadMedia } from '@/api/media.js'

export default {
  name: 'ImageCrop',
  components: {
    VueCropper
  },
  props: {
    cropImgVisible: {
      type: Boolean,
      default: false
    },
    contentSrc: {
      type: String,
      default: ''
    },
    cropTitle: {
      type: String,
      default: ''
    },
    // 是否开启截图框宽高固定比例
    fixed: {
      type: Boolean,
      default: true
    },
    // 截图框的宽高比例
    fixedNumber: {
      type: Array,
      default() {
        return [1, 1]
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:cropImgVisible', false)
    },
    onConfirm() {
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(async(data) => {
        try {
          // 上传截图
          const upload = await uploadMedia('crop', data)
          this.$emit('selected', upload.path, this.contentSrc)
          this.close()
        } catch (err) {
          this.$message.error('上传失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.crop-content{
  height: 460px;
}
</style>

