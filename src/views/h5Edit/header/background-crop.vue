<template>
  <div>
    <el-dialog title="背景裁切" :visible.sync="cropImgVisible" :before-close="close" append-to-body>
      <div class="crop-content">
        <vueCropper
          v-if="cropImgVisible"
          ref="cropper"
          :img="contentSrc"
          :auto-crop="true"
          :center-box="true"
          :fixed="true"
          :fixed-number="[2,3]"
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
import { mapGetters } from 'vuex'

export default {
  name: 'BackgroundCrop',
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
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['currentPageData'])
  },
  methods: {
    close() {
      this.$emit('update:cropImgVisible', false)
    },
    onConfirm() {
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData((data) => {
        // console.log(data)
        this.currentPageData.background.image = data
        this.$emit('backgroundSuccess', true)
        this.close()
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

