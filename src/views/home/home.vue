<template>
  <div>
    <el-container>
      <el-header class="background-main-color">
        <el-row>
          <el-col :span="8">
            <div class="brand" @click="goHome">
              <svg-icon icon-class="logo" style="width:130px;height:70px;" />
            </div>
          </el-col>
          <el-col :span="8">
            <el-menu
              :default-active="activeIndex"
              class="menu flex-center"
              mode="horizontal"
              background-color="#304156"
              text-color="#fff"
              active-text-color="#409EFF"
              @select="handleSelect"
            >
              <el-menu-item index="WorksTemplate">我的作品</el-menu-item>
              <el-menu-item index="newScene">新建作品</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">
                  <el-badge is-dot class="badge" :hidden="isUpgrade !== 1">其他</el-badge>
                </template>
                <el-menu-item index="UpgradeCore">
                  <el-badge is-dot class="badge" :hidden="isUpgrade !== 1">程序升级</el-badge>
                </el-menu-item>
                <el-menu-item index="UserPassword">修改密码</el-menu-item>
                <el-menu-item index="signout">退出登录</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <component :is="activeIndex" />
      </el-main>

      <CopyrightFooter />
    </el-container>
  </div>
</template>

<script>
import { createWorks } from '@/api/works'
import { initJson } from '@/utils/data.js'
import WorksTemplate from './components/works-template'
import UserPassword from './components/user-password'
import UpgradeCore from './components/upgrade-core'
import CopyrightFooter from '@/components/CopyrightFooter'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    WorksTemplate,
    UserPassword,
    UpgradeCore,
    CopyrightFooter
  },
  data() {
    return {
      activeIndex: 'WorksTemplate'
    }
  },
  computed: {
    ...mapState({
      isUpgrade: state => state.user.updateInfo.isUpgrade,
      currentVersion: state => state.user.updateInfo.currentVersion
    })
  },

  methods: {
    ...mapActions(['user/frontLogOut']),

    handleSelect(key) {
      console.log(key)
      if (key === 'newScene') {
        this.onCreateWorks()
      } else if (key === 'signout') {
        this['user/frontLogOut']().then(() => {
          this.$router.push('/login')
        })
      } else {
        this.activeIndex = key
      }
    },
    // 新建一个作品
    onCreateWorks() {
      const form = {
        title: '默认标题',
        description: '默认描述',
        draft: JSON.stringify(initJson)
      }
      createWorks(form)
        .then(res => {
          this.$router.push({
            path: `/h5-edit/${res.wid}`
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
    goHome() {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.brand {
  font-size: 24px;
  color: #ffffff;
  line-height: 60px;
  cursor: pointer;
}

.badge {
  line-height: 2em;
}

.el-main {
  min-height: 85vh;
}

</style>
