<template>
  <div class="audio-dialog">

    <el-dialog :visible.sync="audioVisible" width="1000px" :before-close="close">

      <div slot="title">
        <div class="flex">
          <div class="dialog-title">音乐库</div>
          <div class="flex">
            <el-button size="small" type="primary" @click="audioUploadVisible = true">点击上传</el-button>
            <el-button type="info" size="mini" @click="audioLinkVisible = true">外链音乐</el-button>
            <AudioPlay @close="close" />
          </div>
        </div>

        <div v-if="bgMusic.path" class="bg-music">
          <span>当前背景音乐：</span>
          <span style="color:#F56C6C;">{{ bgMusic.name }}</span>
          <el-button class="button" type="warning" round plain size="mini" @click="onBgMusic">播放</el-button>
          <el-button class="button" type="danger" round plain size="mini" @click="onDeleteBgMusic">删除</el-button>
        </div>

      </div>

      <el-tabs v-model="tabIndex" class="tab-card" tab-position="left" type="border-card">

        <el-tab-pane label="最近使用" name="update">
          <AudioManage :tab-index="tabIndex" @close="close" />
        </el-tab-pane>

        <el-tab-pane label="我的上传" name="create">
          <AudioManage ref="uploadRef" :tab-index="tabIndex" @close="close" />
        </el-tab-pane>

      </el-tabs>

      <AudioLink :audio-link-visible.sync="audioLinkVisible" />
      <AudioUpload :audio-upload-visible.sync="audioUploadVisible" @success="onUploadSuccess" />

    </el-dialog>
  </div>
</template>

<script>
import AudioManage from './audio-manage'
import AudioPlay from './audio-play'
import AudioLink from './audio-link'
import AudioUpload from './audio-upload'
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
  components: {
    AudioManage,
    AudioPlay,
    AudioLink,
    AudioUpload
  },
  data() {
    return {
      tabIndex: 'update',
      audioLinkVisible: false,
      audioUploadVisible: false
    }
  },
  computed: {
    ...mapGetters(['currentPageData', 'bgMusic']),
    ...mapState({
      audioVisible: state => state.audio.audioVisible
    })
  },
  watch: {
    audioVisible(newValue) {
      if (newValue) {
        this['audio/setMusic'](this.bgMusic)
      }
    }
  },
  methods: {
    ...mapMutations([
      'audio/onPause',
      'audio/setMusic',
      'deleteMusic',
      'audio/setAudioVisible'
    ]),
    close() {
      this['audio/onPause']()
      this['audio/setAudioVisible'](false)
    },
    onUploadSuccess() {
      if (this.tabIndex === 'create') {
        this.$refs.uploadRef.fetchData()
      } else {
        this.tabIndex = 'create'
      }
    },
    onBgMusic() {
      this['audio/setMusic'](this.bgMusic)
    },
    onDeleteBgMusic() {
      this.deleteMusic()
    }

  }
}
</script>

<style lang="scss">
.audio-dialog {

  .el-dialog__header{
    background: #f5f7fa;
  }

  .el-dialog__body{
    padding: 0px;
    height: 500px;
  }

  .dialog-title{
    font-size: 22px;
    color: #000000;
    margin-right: 30px;
  }

  .bg-music{
    margin-top: 10px;
    margin-left: 282px;
    color: #606266;
    font-size: 14px;

    .button{
      margin-left: 10px;
    }
  }

  .tab-card{
    height: 500px;
  }

  .upload-wrap{
    margin-right: 10px;
  }

  .audio-controls{
    position: absolute;
    left: 350px;
    top: 0px;
    color: #409EFF;
  }
}

</style>
