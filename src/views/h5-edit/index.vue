<template>
  <div>

    <H5Header />

    <div class="main-container">
      <el-row>
        <el-col :span="6">
          <H5Left />
        </el-col>

        <el-col :span="12">
          <H5Main />
        </el-col>

        <el-col :span="6">
          <H5Right />
        </el-col>
      </el-row>
    </div>

    <!-- 设置 -->
    <Settings />

    <!-- 右键点击面板 -->
    <RightClick />

  </div>
</template>

<script>
import H5Header from './show/h5-header'
import H5Left from './show/h5-left'
import H5Main from './show/h5-main'
import H5Right from './show/h5-right'
import Settings from './show/settings'
import RightClick from './editor/right-click'

import { getWorks } from '@/api/works.js'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    H5Header,
    H5Left,
    H5Main,
    H5Right,
    RightClick,
    Settings
  },
  data() {
    return {
      // 第一次
      isOne: true
    }
  },
  computed: {
    ...mapState(['h5Json', 'isModify'])
  },
  watch: {
    h5Json: {
      handler: function(val) {
        // 第一次拉数据的不修改
        if (this.isOne === false) {
          this.setModify(true)
        } else {
          this.isOne = false
        }
      },
      deep: true
    }
  },
  async beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (this.isModify) {
      const answer = window.confirm('您的修改未保存，确定离开吗？')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  created() {
    const wid = this.$route.params.id
    this.fetchData(wid)
  },
  mounted() {
    window.onbeforeunload = e => { // 刷新时弹出提示
      if (this.isModify) {
        return '您的修改未保存，确定关闭吗？'
      }
    }
  },
  methods: {
    ...mapMutations([
      'setH5Json',
      'setWorksInfo',
      'setModify',
      'setPublish',
      'addHistory']),
    fetchData(wid) {
      getWorks(wid).then(res => {
        this.setWorksInfo(res)
        this.setH5Json(JSON.parse(res.draft))
        this.addHistory()
        if (res.update_time !== res.publish_time) {
          // 有草稿可发布
          this.setPublish(true)
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.main-container{
  // position: relative;
  // top: 10px;
  margin-top: 10px;
}
</style>

