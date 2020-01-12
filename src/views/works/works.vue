<template>
  <div>
    <NoPreview v-if="status === 1" />
    <MobileScene v-if="status === 2" :works-info="worksInfo" />
    <PcScene v-if="status === 3" :works-info="worksInfo" />
  </div>
</template>

<script>
import { getWorks } from '@/api/index.js'
import { isMobile } from '@/utils/validate.js'
import MobileScene from './components/mobile-scene'
import PcScene from './components/pc-scene'
import NoPreview from './components/no-preview'

export default {
  components: {
    MobileScene,
    PcScene,
    NoPreview
  },
  data() {
    return {
      status: null, // 1:没有内容，2:手机，3，电脑
      worksInfo: {}
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const wid = this.$route.params.id

      const loading = this.$loading()
      getWorks(wid).then(res => {
        loading.close()

        if (res) {
          this.worksInfo = JSON.parse(res.content)

          // 修改title和description
          document.title = res.title
          const description = document.querySelector('meta[name=description]')
          description.setAttribute('content', res.description)

          if (isMobile()) {
            this.status = 2
          } else {
            this.status = 3
          }
        } else {
          // 作品不存在或未发布
          this.status = 1
        }
      }).catch(() => {
        loading.close()
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.center{
    text-align: center
}
</style>
