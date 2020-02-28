<template>
  <div class="image-dialog">

    <el-dialog :visible.sync="videoVisible" width="1000px" :before-close="close" :destroy-on-close="false" :modal-append-to-body="false">

      <div slot="title">
        <div class="flex">
          <div class="dialog-title">视频库</div>
          <div class="flex">
            <el-button size="small" type="primary" @click="videoUploadVisible = true">点击上传</el-button>
            <el-button type="info" size="mini" @click="videoLinkVisible = true">外链视频</el-button>
          </div>
        </div>
      </div>

      <el-tabs v-model="tabIndex" class="tab-card" tab-position="left" type="border-card">
        <el-tab-pane label="最近使用" name="update">
          <VideoManage :tab-index="tabIndex" @close="close" @selected="selected" />
        </el-tab-pane>
        <el-tab-pane label="我的上传" name="create">
          <VideoManage ref="uploadRef" :tab-index="tabIndex" @close="close" @selected="selected" />
        </el-tab-pane>
      </el-tabs>

      <VideoLink :video-link-visible.sync="videoLinkVisible" @success="onUploadSuccess" />
      <VideoUpload :video-upload-visible.sync="videoUploadVisible" @success="onUploadSuccess" />

    </el-dialog>
  </div>
</template>

<script>
import VideoManage from './video-manage'
import VideoLink from './video-link'
import VideoUpload from './video-upload'
import { mapState, mapMutations } from 'vuex'

export default {

  components: {
    VideoManage,
    VideoLink,
    VideoUpload
  },
  data() {
    return {
      tabIndex: 'update',
      videoLinkVisible: false,
      videoUploadVisible: false
    }
  },
  computed: {
    ...mapState({
      videoVisible: state => state.setting.videoVisible
    })
  },
  methods: {
    ...mapMutations(['setting/switchVideo']),
    close() {
      this['setting/switchVideo']()
    },
    selected(url, origin) {
      this.$emit('selected', url, origin)
      this.close()
    },
    onUploadSuccess() {
      if (this.tabIndex === 'create') {
        this.$refs.uploadRef.fetchData()
      } else {
        this.tabIndex = 'create'
      }
    }

  }
}
</script>

<style lang="scss">
.image-dialog {

  .el-dialog__header{
    background: #f5f7fa;
  }

  .el-dialog__body{
    padding: 0px;
    height: 550px;
  }

  .dialog-title{
    font-size: 22px;
    color: #000000;
    margin-right: 30px;
  }

  .upload-wrap{
    margin-right: 10px;
  }

  .tab-card{
    height: 550px;
  }

}

</style>
