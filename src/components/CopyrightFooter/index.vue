<template>
  <el-footer class="background-main-color">
    <div class="footer">
      <div class="item">
        <el-link href="https://support.qq.com/products/115566" type="warning" target="_blank" icon="el-icon-question">问题反馈</el-link>
      </div>
      <div class="item">copyright 12show 自由部署的H5制作程序 {{ currentVersion }}</div>
    </div>
  </el-footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      currentVersion: state => state.user.updateInfo.currentVersion
    })
  }
}
</script>

<style lang="scss" scoped>
.footer {
  color: #ffffff;
  text-align: center;
  .item{
    padding-top: 5px;
    font-size: 14px;
  }
}
</style>
