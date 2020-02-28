<template>
  <div>
    <el-dialog :visible.sync="videoPreviewVisible" :before-close="close" append-to-body>
      <div class="text-center">
        <video ref="video" class="video" :src="previewUrl" autoplay controls />
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    videoPreviewVisible: {
      type: Boolean,
      default: false
    },
    previewUrl: {
      type: String,
      default: ''
    }
  },

  methods: {
    close() {
      this.$refs.video.pause()
      this.$emit('update:videoPreviewVisible', false)
    }

  }
}
</script>

<style lang="scss" scoped>
.video{
    max-height: 70vh;
    max-width: 100%;
}
</style>
