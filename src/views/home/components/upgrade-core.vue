<template>
  <div class="container">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card shadow="always">
          <div class="item">
            <span>当前版本：{{ updateInfo.currentVersion }}</span>

            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              element-loading-text="正在升级中，请耐心等候，不要刷新或退出"
              class="upgrade-button"
              type="danger"
              size="mini"
              @click="onUpgrade"
            >
              <span v-if="updateInfo.isUpgrade === 1">现在升级</span>
              <span v-else>已是最新版，覆盖升级</span>
            </el-button>

            <div class="note">更新之前，先备份数据库和文件</div>

          </div>
          <div class="item">最新版本：{{ updateInfo.version }}</div>
          <div class="item">更新日志：</div>
          <div class="item change-log">{{ updateInfo.change_log }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { upgrade } from '@/api/upgrade.js'

export default {
  name: 'UpdateCore',

  data() {
    return {
      fullscreenLoading: false
    }
  },
  computed: {
    ...mapState({
      updateInfo: state => state.user.updateInfo
    })
  },
  created() {
    this['user/upgrapde']()
  },
  methods: {
    ...mapActions(['user/upgrapde']),
    onUpgrade() {
      this.$confirm('已备份数据库和网站文件, 确定升级?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.fullscreenLoading = true
        upgrade().then(() => {
          this.fullscreenLoading = false
          this.$message.success('更新成功')
          this['user/upgrapde']()
        }).catch(() => {
          this.fullscreenLoading = false
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  white-space: pre-wrap;
  line-height: 2em;

  .note{
    color:#F56C6C;
    font-size: 14px;
  }
}
.change-log{
  background: #F2F6FC;
  padding: 10px;
  border-radius: 10px;
}
.upgrade-button{
  margin-left: 10px;
}
</style>
