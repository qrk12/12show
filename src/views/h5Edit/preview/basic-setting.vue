<template>
  <div class="right-setting">

    <div class="close">
      <i class="el-icon-close icon" @click="onCloseSetting" />
    </div>

    <div class="warp">

      <el-row>
        <el-col :span="6">
          <div @click="imageVisible = true">
            <div class="cover-label">封面图片</div>
            <el-image class="cover-image" :src="h5Json.setting.cover_image.crop" fit="cover" />
          </div>
        </el-col>
        <el-col :span="18">
          <el-form size="mini">
            <el-form-item label="标题">
              <el-input v-model="h5Json.setting.title" />
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="h5Json.setting.description" type="textarea" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-button type="primary" size="medium">发布</el-button>
        <el-button type="default" size="medium" @click="onSave">保存</el-button>
        <el-button type="default" size="medium" @click="onCloseSetting">取消</el-button>
      </el-row>

    </div>

    <ImageGallery :image-visible.sync="imageVisible" :is-crop="true" crop-title="裁剪封面" @selected="onCoverImage" />

  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import ImageGallery from '@/components/ImageGallery'

export default {
  name: 'BasicSetting',
  components: {
    ImageGallery
  },
  data() {
    return {
      // 设置
      setting: {
        cover_image: 'http://d-pic-image.yesky.com/1080x-/uploadImages/2019/044/59/1113V6L3Q6TY.jpg',
        title: '',
        description: ''
      },
      imageVisible: false
    }
  },
  computed: {
    ...mapState(['h5Json'])
  },
  methods: {
    ...mapMutations([
      'setting/onSetting'
    ]),
    ...mapActions(['updateWorks']),
    onCloseSetting() {
      this['setting/onSetting']()
    },
    onCoverImage(url, origin) {
      this.h5Json.setting.cover_image.crop = url
      this.h5Json.setting.cover_image.origin = origin
    },
    onSave() {
      this.updateWorks().then(res => {
        this.$message.success('成功保存')
      }).catch(() => {
        this.$message.error('保存失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.right-setting{
    background-color: #ffffff;
    height: 100vh;

    .close{
        position: absolute;
        right: 10px;
        top: 10px;

        .icon{
            font-size: 24px;

            &:hover{
                color:#F56C6C;
            }
        }
    }

    .warp{
      padding: 60px 20px;

      .cover-label{
        color: #606266;
        font-size: 14px;
      }
      .cover-image{
        margin-top: 10px;
        width: 120px;
        height: 120px;
      }
    }

}
</style>
