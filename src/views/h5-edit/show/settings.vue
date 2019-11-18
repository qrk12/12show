<template>
  <div v-if="isSetting" class="setting">
    <el-row>
      <el-col class="flex-justify-align-center left" :span="14">
        <IndexShow />
      </el-col>

      <el-col :span="10">
        <BasicSetting />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import IndexShow from '../preview/index-show'
import BasicSetting from '../preview/basic-setting'

export default {
  name: 'Settings',
  components: {
    IndexShow,
    BasicSetting
  },
  computed: {
    ...mapState({
      isSetting: state => state.setting.isSetting
    })
  }
}
</script>

<style lang="scss" scoped>
    .setting{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1500;
        width: 100%;
        height: 100%;

        .left{
            height: 100vh;
            background-color: rgba(0,0,0,.7);
        }
    }
</style>
