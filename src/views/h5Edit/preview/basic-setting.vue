<template>
  <div class="right-setting">

    <div class="close">
      <i class="el-icon-close icon" @click="onCloseSetting" />
    </div>

    <div class="warp">

      <el-row>
        <el-col :span="6">
          <div class="cover-label">封面图片</div>
          <el-image class="cover-image" :src="setting.coverImage" fit="cover" />
        </el-col>
        <el-col :span="18">
          <el-form size="mini">
            <el-form-item label="标题">
              <el-input v-model="setting.title" />
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="setting.description" type="textarea" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-button type="primary" size="medium">发布</el-button>
        <el-button type="default" size="medium">保存</el-button>
        <el-button type="default" size="medium">取消</el-button>
      </el-row>

    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'BasicSetting',
  data() {
    return {
      // 设置
      setting: {
        coverImage: 'http://d-pic-image.yesky.com/1080x-/uploadImages/2019/044/59/1113V6L3Q6TY.jpg',
        title: '',
        description: ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'setting/onSetting'
    ]),
    onCloseSetting() {
      this['setting/onSetting']()
    }
  }
}
</script>

<style lang="scss" scoped>
.right-setting{
    position: relative;
    background-color: #ffffff;
    height: 100vh;
    z-index: 100;

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
