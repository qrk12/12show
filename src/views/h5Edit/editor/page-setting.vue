<template>
  <div>

    <el-form label-width="70px">

      <div class="form-lable">
        背景图片
      </div>
      <div
        class="show-image flex-justify-align-center"
        @click="imageVisible = true"
      >
        <el-image
          v-if="currentPageData.background.image.crop"
          style="width: 326px; height: 200px"
          :src="currentPageData.background.image.crop"
          fit="contain"
        />
        <i v-else class="el-icon-plus icon" />
      </div>

      <div class="images-button">
        <el-button type="primary" size="mini" icon="el-icon-crop" plain @click="cropImgVisible = true">裁剪图片</el-button>
        <el-button type="primary" size="mini" icon="el-icon-delete" plain @click="onDelete()">删除图片</el-button>
        <el-button type="primary" size="mini" icon="el-icon-refresh" @click="imageVisible = true">更换图片</el-button>

      </div>

      <el-form-item label="背景颜色">
        <el-row>
          <el-col :span="5">
            <el-color-picker v-model="currentPageData.background.color" show-alpha />
          </el-col>
          <el-col :span="19">
            <el-input v-model="currentPageData.background.color" size="small" />
          </el-col>
        </el-row>
      </el-form-item>

    </el-form>

    <ImageGallery :image-visible.sync="imageVisible" :is-crop="true" :fixed-number="[2,3]" @selected="onSelected" />
    <ImageCrop :crop-img-visible.sync="cropImgVisible" :content-src="currentPageData.background.image.origin" :fixed-number="[2,3]" @selected="onSelected" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ImageGallery from '@/components/ImageGallery'
import ImageCrop from '@/components/ImageGallery/image-crop'

export default {
  name: 'PageSetting',
  components: {
    ImageGallery,
    ImageCrop
  },
  data() {
    return {
      imageVisible: false,
      cropImgVisible: false
    }
  },
  computed: {
    ...mapGetters(['currentPageData'])
  },
  watch: {
    'currentPageData.background.image.crop'(newValue) {
      if (newValue) {
        this.currentPageData.background.color = ''
      }
    },
    'currentPageData.background.color'(newValue) {
      if (newValue) {
        this.currentPageData.background.image.crop = ''
        this.currentPageData.background.image.origin = ''
      }
    }
  },
  methods: {
    onDelete() {
      this.currentPageData.background.image.crop = ''
      this.currentPageData.background.image.origin = ''
    },
    onReset(type) {
      this.currentPageData.background[type] = ''
    },
    onSelected(url, origin) {
      this.currentPageData.background.image.crop = url
      this.currentPageData.background.image.origin = origin
    }
  }

}
</script>

<style lang="scss" scoped>
.show-image{
  width: 326px;
  height: 200px;
  margin: 0 auto;
  border: 1px dashed #DCDFE6;
  background: #f5f7fa;

  &:hover{
    cursor: pointer;
    border: 1px dashed #409EFF;
  }
  .icon{
    font-size: 40px;
    color: #909399;
  }
}

.form-lable{
  color: #606266;
  margin-bottom: 10px;
  font-size: 14px;
}

.images-button{
  text-align:center;
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>

