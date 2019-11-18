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
            <el-image v-if="h5Json.setting.cover_image.crop" class="cover-image" :src="h5Json.setting.cover_image.crop" fit="cover" />
            <img v-else src="@/assets/placeholder.png" class="cover-image">

          </div>
        </el-col>
        <el-col :span="18">
          <el-form size="mini">
            <el-form-item label="标题">
              <el-input v-model="h5Json.setting.title" @change="addHistory" />
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="h5Json.setting.description" type="textarea" @change="addHistory" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row class="status-wrap">
        <span class="cover-label">当前状态：</span>
        <el-tag v-if="worksInfo.status === 1" class="tag" type="info" size="mini">未发布</el-tag>
        <el-tag v-if="worksInfo.status === 2" class="tag" type="success" size="mini">已发布</el-tag>
      </el-row>

      <el-row class="button-group">

        <el-badge :is-dot="isModify" class="item">
          <el-button type="primary" size="medium" @click="onSave()">保存</el-button>
        </el-badge>

        <el-badge :is-dot="isPublish" class="item">
          <el-button type="success" size="medium" @click="onPublish(2)">发布</el-button>
        </el-badge>

        <el-badge v-if="worksInfo.status===2" class="item">
          <el-button type="default" size="medium" @click="onPublish(1)">取消发布</el-button>
        </el-badge>

        <el-badge class="item">
          <el-button type="info" size="medium" @click="onPreview">手机预览</el-button>
        </el-badge>

      </el-row>

      <el-row v-if="preview_url" class="mobile-preview">
        <div>
          链接：{{ preview_url }}
        </div>
        <div>
          <VueQrcode :value="preview_url" :options="{ width: 200 }" />
        </div>
      </el-row>

    </div>

    <ImageGallery :image-visible.sync="imageVisible" :is-crop="true" crop-title="裁剪封面" @selected="onCoverImage" />

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ImageGallery from '@/components/ImageGallery'
import mixinWorks from '../mixins/mixin.js'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { previewWorks } from '@/api/works.js'

export default {
  components: {
    ImageGallery,
    VueQrcode
  },
  mixins: [mixinWorks],
  data() {
    return {
      // 设置
      setting: {
        cover_image: 'http://d-pic-image.yesky.com/1080x-/uploadImages/2019/044/59/1113V6L3Q6TY.jpg',
        title: '',
        description: ''
      },
      imageVisible: false,
      preview_url: null
    }
  },
  computed: {
    ...mapState(['h5Json', 'worksInfo', 'isModify', 'isPublish'])
  },
  methods: {
    ...mapMutations([
      'setting/onSetting',
      'addHistory'
    ]),

    onCloseSetting() {
      this['setting/onSetting']()
    },
    onCoverImage(url, origin) {
      this.h5Json.setting.cover_image.crop = url
      this.h5Json.setting.cover_image.origin = origin
      this.addHistory()
    },
    onPreview() {
      // 保存草稿
      this.onSave()

      // 生成预览链接
      previewWorks(this.worksInfo.wid).then(res => {
        this.preview_url = res.preview_url
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
      .button-group{
        margin-top: 20px;
        .item{
          margin-right: 10px;
        }
      }
      .mobile-preview{
        margin-top: 40px;
      }
    }

}
</style>
