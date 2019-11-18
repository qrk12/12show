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
              <el-menu-item index="works">我的作品</el-menu-item>
              <el-menu-item index="newScene">新建场景</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>

      </el-header>
      <el-main>

        <WorksTemplate v-if="activeIndex === 'works'" />

      </el-main>
      <el-footer class="background-main-color">
        <div class="footer">
          copyright 12show
        </div>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import { createWorks } from '@/api/works'
import WorksTemplate from './components/works-template'
import { initJson } from '@/utils/data.js'

export default {
  components: {
    WorksTemplate
  },
  data() {
    return {
      activeIndex: 'works'
    }
  },

  methods: {
    handleSelect(key) {
      if (key === 'newScene') {
        this.onCreateWorks()
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
      createWorks(form).then(res => {
        this.$router.push({
          path: `/h5-edit/${res.wid}`
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
