<template>
  <div>

    <el-form label-width="80px" class="style-normal">

      <el-form-item v-if="currentItemData.type === 'text'" label="文字内容">
        <el-input v-model="currentItemData.content" type="textarea" />
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
            <el-color-picker v-model="currentItemData.text.backgroundColor" show-alpha />
          </el-col>
          <el-col :span="19">
            <el-input v-model="currentItemData.text.backgroundColor" size="small" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="文字颜色">
        <el-row>
          <el-col :span="5">
            <el-color-picker v-model="currentItemData.text.color" show-alpha />
          </el-col>
          <el-col :span="19">
            <el-input v-model="currentItemData.text.color" size="small" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="对齐方式">
        <el-select v-model="currentItemData.text.textAlign">
          <el-option label="居左" value="left" />
          <el-option label="居中" value="center" />
          <el-option label="居右" value="right" />
          <el-option label="两端对齐" value="justify" />
        </el-select>
      </el-form-item>

      <el-form-item label="字体">
        <el-select v-model="currentItemData.text.fontFamily">
          <el-option label="默认字体" value="none" />
          <el-option label="仿宋" value="FangSong" />
          <el-option label="黑体" value="SimHei" />
          <el-option label="楷体" value="KaiTi" />

        </el-select>
      </el-form-item>

      <el-form-item label="大小">
        <el-slider
          v-model="currentItemData.text.fontSize"
          show-input
          :min="1"
          :max="256"
        />
      </el-form-item>

      <el-form-item label="不透明度">
        <el-slider
          v-model="currentItemData.text.opacity"
          show-input
          :min="0"
          :max="1"
          :step="0.1"
        />
      </el-form-item>

      <el-form-item label="行高">
        <el-slider
          v-model="currentItemData.text.lineHeight"
          show-input
          :min="0"
          :max="3"
          :step="0.1"
        />
      </el-form-item>

      <el-form-item label="字距">
        <el-slider
          v-model="currentItemData.text.letterSpacing"
          show-input
          :min="0"
          :max="1"
          :step="0.01"
        />
      </el-form-item>

      <el-form-item label="旋转角度">
        <el-slider
          v-model="currentItemData.transform.rotate"
          show-input
          :max="360"
        />
      </el-form-item>

    </el-form>

    <el-dialog title="裁剪图片" :visible.sync="cropImgVisible">
      <div class="crop-content">
        <vueCropper
          v-if="cropImgVisible"
          ref="cropper"
          :img="currentItemData.content"
          :auto-crop="true"
          :center-box="true"
          output-type="jpeg"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cropImgVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfimCrop">确 定</el-button>
      </div>
    </el-dialog>

    <ImageDialog :image-visible.sync="imageVisible" img-type="edit" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VueCropper } from 'vue-cropper'
import ImageDialog from '../header/image-dialog'

export default {
  name: 'StyleNormal',
  components: {
    VueCropper,
    ImageDialog
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
    onSubmit() {
      console.log('submit!')
    },
    onConfimCrop() {
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData((data) => {
        this.currentItemData.content = data
      })
      this.cropImgVisible = false
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

