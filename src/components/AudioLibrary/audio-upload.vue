<template>
  <div>
    <el-dialog
      :visible.sync="audioUploadVisible"
      :before-close="close"
      :append-to-body="true"
      width="400px"
    >

      <el-upload
        ref="upload"
        class="upload-wrap"
        :action="uploadUrl"
        :headers="headers"
        :data="{type:'audio'}"
        :on-success="onSucess"
        :on-error="onError"
        accept=".mp3,.3gpp,.ogg,.au"
        multiple
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

    </el-dialog>
  </div>
</template>

<script>
import { uploadUrl } from '@/api/media.js'
import { getToken } from '@/utils/auth'

export default {
  props: {
    audioUploadVisible: {
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
      this.$emit('update:audioUploadVisible', false)
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

