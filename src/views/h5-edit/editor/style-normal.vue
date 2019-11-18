<template>
  <div>

    <el-form label-width="80px" class="style-normal">

      <el-form-item v-if="currentItemData.type === 'text'" label="文字内容">
        <el-input v-model="currentItemData.content" type="textarea" @change="addHistory" />
      </el-form-item>

      <div v-if="currentItemData.type === 'img'" class="el-form-item">
        <div class="show-image" :style="{ 'background-image': 'url(' + currentItemData.content + ')' }" />
        <div class="images-button">
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click="imageVisible = true">修改图片</el-button>
          <el-button type="default" size="mini" icon="el-icon-crop" @click="cropImgVisible = true">裁剪图片</el-button>
        </div>
      </div>

      <el-form-item label="背景颜色">
        <el-row>
          <el-col :span="5">
            <el-color-picker v-model="currentItemData.text.backgroundColor" show-alpha @change="addHistory" />
          </el-col>
          <el-col :span="19">
            <el-input v-model="currentItemData.text.backgroundColor" size="small" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item v-if="currentItemData.type === 'text'" label="文字颜色">
        <el-row>
          <el-col :span="5">
            <el-color-picker v-model="currentItemData.text.color" show-alpha @change="addHistory" />
          </el-col>
          <el-col :span="19">
            <el-input v-model="currentItemData.text.color" size="small" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item v-if="currentItemData.type === 'text'" label="对齐方式">
        <el-select v-model="currentItemData.text.textAlign" @change="addHistory">
          <el-option label="居左" value="left" />
          <el-option label="居中" value="center" />
          <el-option label="居右" value="right" />
          <el-option label="两端对齐" value="justify" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="currentItemData.type === 'text'" label="字体">
        <el-select v-model="currentItemData.text.fontFamily" @change="addHistory">
          <el-option label="默认字体" value="none" />
          <el-option label="宋体" value="SimSun" />
          <el-option label="仿宋" value="FangSong" />
          <el-option label="黑体" value="SimHei" />
          <el-option label="楷体" value="KaiTi" />
          <el-option label="微软雅黑" value="Microsoft YaHei" />
          <el-option label="苹方" value="PingFang SC" />
          <el-option label="华文黑体" value="STHeiti" />
          <el-option label="华文宋体" value="STSong" />
          <el-option label="华文仿宋" value="STFangsong" />
          <el-option label="华文中宋" value="STZhongsong" />

        </el-select>
      </el-form-item>

      <el-form-item v-if="currentItemData.type === 'text'" label="大小">
        <el-slider
          v-model="currentItemData.text.fontSize"
          show-input
          :min="12"
          :max="256"
          @change="addHistory"
        />
      </el-form-item>

      <el-form-item v-if="currentItemData.type === 'text'" label="行高">
        <el-slider
          v-model="currentItemData.text.lineHeight"
          show-input
          :min="0"
          :max="3"
          :step="0.1"
          @change="addHistory"
        />
      </el-form-item>

      <el-form-item v-if="currentItemData.type === 'text'" label="字距">
        <el-slider
          v-model="currentItemData.text.letterSpacing"
          show-input
          :min="0"
          :max="1"
          :step="0.01"
          @change="addHistory"
        />
      </el-form-item>

      <el-form-item label="不透明度">
        <el-slider
          v-model="currentItemData.text.opacity"
          show-input
          :min="0"
          :max="1"
          :step="0.1"
          @change="addHistory"
        />
      </el-form-item>

      <el-form-item label="旋转角度">
        <el-slider
          v-model="currentItemData.transform.rotate"
          show-input
          :max="360"
          @change="addHistory"
        />
      </el-form-item>

    </el-form>

    <ImageGallery :image-visible.sync="imageVisible" :is-crop="false" @selected="onSelected" />

    <ImageCrop :crop-img-visible.sync="cropImgVisible" :content-src="currentItemData.content" :fixed="false" title="裁剪图片" @selected="onSelected" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ImageGallery from '@/components/ImageGallery'
import ImageCrop from '@/components/ImageGallery/image-crop'

export default {
  name: 'StyleNormal',
  components: {
    ImageGallery,
    ImageCrop
  },
  data() {
    return {
      cropImgVisible: false,
      imageVisible: false
    }
  },
  computed: {
    ...mapGetters(['currentItemData'])
  },
  methods: {
    ...mapMutations(['addHistory']),
    onSelected(url) {
      this.currentItemData.content = url
      this.addHistory()
    }
  }
}
</script>

<style lang="scss" scoped>
.show-image{
  width: 140px;
  height: 140px;
  overflow: hidden;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
  margin: 0 auto;
}
.images-button{
  margin-top: 10px;
  text-align: center;
}

.crop-content{
  height: 460px;
}
</style>

