<template>
  <div class="container flex-justify-align-center">
    <div>
      <IndexShow :works-info="worksInfo" />
    </div>
    <div class="footer background-main-color">
      copyright 12show
    </div>

  </div>
</template>

<script>
import IndexShow from '@/views/h5-edit/preview/index-show'
export default {
  components: {
    IndexShow
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
        line-height: 60px;
        text-align: center;
    }
}

</style>
