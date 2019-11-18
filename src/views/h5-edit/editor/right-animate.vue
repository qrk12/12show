<template>
  <div>

    <el-collapse v-model="activeNames" @change="handleChange">

      <el-collapse-item v-for="(item,index) in currentItemData.animate" :key="index" :name="index">
        <template slot="title">
          动画 {{ index+1 }}
          <i class="el-icon-delete icon" @click.stop="onDelete(index)" />
          <i class="el-icon-video-play icon" @click.stop="onPlayAnimate(index)" />
        </template>
        <div>
          <AnimateSingle :animate-item="item" :index="index" />
        </div>

      </el-collapse-item>

    </el-collapse>

    <div class="button flex-center">
      <el-button type="primary" size="small" plain @click.stop="addAnimate">添加动画</el-button>
      <el-button type="success" size="small" plain @click.stop="setPreviewAnimate">预览动画</el-button>
    </div>
  </div>
</template>

<script>
import AnimateSingle from './animate-single.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'RightAnimate',
  components: {
    AnimateSingle
  },
  data() {
    return {
      activeNames: [],
      // 初始动画
      initAnimate: {
        animationName: 'fadeIn',
        animationDuration: 2,
        animationDelay: 0.4,
        animationIterationCount: 1,
        isInfinite: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentItemData'])
  },
  methods: {
    ...mapMutations(['setTriggerAnimate', 'setActiveAnimate', 'setPreviewAnimate', 'addHistory']),
    addAnimate() {
      this.currentItemData.animate.push({ ...this.initAnimate })
      this.addHistory()
    },
    handleChange(val) {
      // console.log(val)
    },
    onDelete(index) {
      this.currentItemData.animate.splice(index, 1)
      this.addHistory()
    },
    onPlayAnimate(index) {
      this.setActiveAnimate(index)
      this.setTriggerAnimate()
    }
  }

}
</script>

<style lang="scss" scoped>
.icon{
  margin-left: 10px;
}
.button{
  margin-top: 20px;
}
</style>

