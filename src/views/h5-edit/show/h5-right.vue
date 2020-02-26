<template>
  <div v-if="activeItem !== null" class="h5-right">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="样式" name="style">
        <RightStyle />
      </el-tab-pane>
      <el-tab-pane label="动画" name="animate">
        <RightAnimate />
      </el-tab-pane>
      <el-tab-pane label="点击" name="click">
        <ClickEvent />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RightStyle from '../editor/right-style.vue'
import RightAnimate from '../editor/right-animate.vue'
import ClickEvent from '../editor/click-event.vue'
import { mapState } from 'vuex'
export default {
  name: 'H5Right',
  components: {
    RightStyle,
    RightAnimate,
    ClickEvent
  },
  data() {
    return {
      activeName: 'style'
    }
  },
  computed: {
    ...mapState(['activeItem'])
  }
}
</script>

<style lang="scss" scoped>
.h5-right{
    height: calc(100vh - 70px);
    overflow: scroll;
}
</style>
