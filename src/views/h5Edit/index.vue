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

export default {
  components: {
    H5Header,
    H5Left,
    H5Main,
    H5Right,
    RightClick,
    Settings
  }
}
</script>

<style lang="scss" scoped>
.main-container{
  position: relative;
  top: 10px;
}
</style>

