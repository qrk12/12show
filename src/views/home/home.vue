<template>
  <div>
    <el-container>
      <el-header class="background-main-color">
        <el-row>
          <el-col :span="8">
            <div class="brand">12Show</div>
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
              <el-menu-item index="1">模版市场</el-menu-item>
              <el-menu-item index="2">我的模版</el-menu-item>
              <el-menu-item index="3">新建场景</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>

      </el-header>
      <el-main>Main</el-main>
      <el-footer class="background-main-color">
        <div class="footer">
          copyright 12show
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { create } from '@/api/works'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapState(['initJson'])
  },
  methods: {
    handleSelect(key) {
      if (key === '3') {
        this.createWorks()
      } else {
        this.$router.push('/home')
      }
    },
    createWorks() {
      const form = {
        content: JSON.stringify(this.initJson)
      }
      create(form).then(res => {
        // this.setH5Json(this.initJson)
        this.$router.push({
          path: `/h5Edit/${res.wid}`
        })
      })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.brand{
    font-size: 24px;
    color: #ffffff;
    line-height: 60px;
}

.el-main{
    min-height: 85vh;
}

.footer{
  color: #ffffff;
  line-height: 60px;
  text-align: center;
}
</style>
