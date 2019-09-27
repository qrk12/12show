<template>
  <div class="audio-dialog">

    <el-dialog :visible.sync="audioVisible" width="1000px" :before-close="close">

      <div slot="title">
        <div class="flex">
          <div class="dialog-title">音乐库</div>
          <div class="flex">
            <el-upload
              class="upload-wrap"
              :action="uploadUrl"
              :headers="headers"
              :data="{type:'audio'}"
              :on-success="onSucess"
              :on-error="onError"
              :show-file-list="false"
              :on-change="onChange"
              accept=".mp3,.3gpp,.ogg,.au"
              multiple
            >
              <el-button :loading="loading" size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button type="info" size="mini" @click="audioLinkVisible = true">外链图片</el-button>
            <AudioPlay @close="close" />
          </div>
        </div>
      </div>

      <el-tabs v-model="tabIndex" class="tab-card" tab-position="left" type="border-card">
        <el-tab-pane label="最近使用" name="update">
          <AudioManage :tab-index="tabIndex" @close="close" />
        </el-tab-pane>
        <el-tab-pane label="我的上传" name="create">
          <AudioManage :tab-index="tabIndex" @close="close" />
        </el-tab-pane>
      </el-tabs>

      <AudioLink :audio-link-visible.sync="audioLinkVisible" />
    </el-dialog>
  </div>
</template>

<script>
import AudioManage from './audio-manage'
import AudioPlay from './audio-play'
import AudioLink from './audio-link'
import { mapMutations, mapGetters } from 'vuex'
import { uploadUrl } from '@/api/media.js'
import { getToken } from '@/utils/auth'

export default {
  name: 'ImageDialog',
  components: {
    AudioManage,
    AudioPlay,
    AudioLink
  },
  props: {
    audioVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadUrl,
      headers: {
        Authorization: getToken()
      },
      loading: false,
      tabIndex: 'update',
      audioLinkVisible: false
    }
  },
  computed: {
    ...mapGetters(['currentPageData'])
  },
  watch: {
    audioVisible(newValue) {
      if (newValue) {
        if (this.currentPageData.music.url !== '') {
          this['audio/setMusic'](this.currentPageData.music)
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      'audio/onPause',
      'audio/setMusic'
    ]),
    close() {
      this['audio/onPause']()
      this.$emit('update:audioVisible', false)
    },
    onSucess() {
      if (this.tabIndex === 'create') {
        this.$refs.uploadRef.fetchData()
      } else {
        this.tabIndex = 'create'
      }
    },
    onError() {
      this.$message.error('上传失败')
    },
    onChange() {
      this.loading = !this.loading
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
