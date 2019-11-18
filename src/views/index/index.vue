<template>
  <div>
    <MobileScene v-if="status === 2" :works-info="worksInfo" />
    <PcMobile v-if="status === 3" :works-info="worksInfo" />

    <div v-if="status === 1" class="flex-center">
      <div class="center">
        <h1>12show</h1>
        <div>免费部署微场景程序</div>
      </div>
    </div>

  </div>

</template>

<script>
import { getWorks } from '@/api/index.js'
import MobileScene from './components/mobile-scene'
import PcMobile from './components/pc-scene'

export default {
  components: {
    MobileScene,
    PcMobile
  },
  data() {
    return {
      status: 1, // 1:没有内容，2:手机，3，电脑
      worksInfo: {}
    }
  },
  created() {
    const wid = this.$route.query.wid
    if (wid) {
      this.fetchData(wid)
    }
  },
  methods: {
    fetchData(wid) {
      getWorks(wid).then(res => {
        if (res) {
          this.worksInfo = JSON.parse(res.content)
          this.checkPhone()
        }
      })
    },
    checkPhone() {
      const mobile = /(Android|iPhone|iPad|iPod|iOS)/i
      if (mobile.test(navigator.userAgent)) {
        this.status = 2
      } else {
        this.status = 3
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.center{
    text-align: center
}
</style>
