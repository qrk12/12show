<template>
  <div class="audio-dialog">

    <el-dialog :visible.sync="audioVisible" width="1000px" :before-close="close">

      <div slot="title">

        <span class="dialog-title">音乐库</span>
        <el-button type="primary" size="mini">点击上传</el-button>
        <el-button type="info" size="mini">外链音乐</el-button>

        <AudioPlay @close="close" />
      </div>

      <el-tabs v-model="tabIndex" class="tab-card" tab-position="left" type="border-card">
        <el-tab-pane label="最近使用" name="first">
          <AudioManage @close="close" />
        </el-tab-pane>
        <el-tab-pane label="我的上传" name="second">
          <AudioManage @close="close" />
        </el-tab-pane>
      </el-tabs>

    </el-dialog>
  </div>
</template>

<script>
import AudioManage from './audio-manage'
import AudioPlay from './audio-play'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'ImageDialog',
  components: {
    AudioManage,
    AudioPlay
  },
  props: {
    audioVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabIndex: 'first'
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
    color: #000000;
    margin-right: 30px;
  }

  .tab-card{
    height: 500px;
  }

  .upload-image{
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .audio-controls{
    position: absolute;
    left: 350px;
    top: 0px;
    color: #409EFF;
  }
}

</style>
