<template>
  <div class="container flex-justify-align-center">
    <div>
      <IndexShow :works-info="worksInfo" />
    </div>
    <div class="footer">
      <CopyrightFooter />
    </div>

  </div>
</template>

<script>
import IndexShow from '@/views/h5-edit/preview/index-show'
import CopyrightFooter from '@/components/CopyrightFooter'
export default {
  components: {
    IndexShow,
    CopyrightFooter
  },
  props: {
    worksInfo: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
    width: 100vw;
    height: 100vh;

    .footer{
        position: fixed;
        bottom: 0;
        width: 100vw;
        color: #ffffff;
        text-align: center;
    }
}

</style>
