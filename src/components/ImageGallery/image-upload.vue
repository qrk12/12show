<template>
  <div>
    <el-dialog
      :visible.sync="imageUploadVisible"
      :before-close="close"
      :append-to-body="true"
      width="400px"
    >

      <el-upload
        ref="upload"
        class="upload-wrap"
        :action="uploadUrl"
        :headers="headers"
        :data="{type:'img'}"
        :on-success="onSucess"
        :on-error="onError"
        accept=".jpg,.png,.gif"
        multiple
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过2M</div>
      </el-upload>

    </el-dialog>
  </div>
</template>

<script>
import { uploadUrl } from '@/api/media.js'
import { getToken } from '@/utils/auth'

export default {
  props: {
    imageUploadVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadUrl,
      headers: {
        UserToken: getToken()
      }}
  },
  methods: {
    close() {
      this.$emit('success', true)
      this.$refs.upload.clearFiles()
      this.$emit('update:imageUploadVisible', false)
    },
    onSucess() {
      // this.$emit('success', true)
    },
    onError() {
      this.$message.error('上传失败')
    }
  }
}
</script>

