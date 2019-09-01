<template>
  <div class="h5-left">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="模版管理" name="template">
        <LeftPage />
      </el-tab-pane>
      <el-tab-pane label="页面管理" name="page-manager">
        <LeftPage />
      </el-tab-pane>
      <el-tab-pane label="页面设置" name="page-setting">
        <PageSetting />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import LeftPage from '../editor/left-page.vue'
import PageSetting from '../editor/page-setting'

export default {
  name: 'H5Left',
  components: {
    LeftPage,
    PageSetting
  },
  data() {
    return {
      activeName: 'page-manager'
    }
  }
}
</script>

<style lang="scss" scoped>
.h5-left{
    height: calc(100vh - 70px);
    overflow: scroll;
}
</style>

