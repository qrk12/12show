<template>
  <div class="flex-center">

    <MobileBorder>
      <template v-slot>
        <div class="main show-screen" :style="getBackground">
          <ItemTemplate v-for="(item, index) in currentPageData.item" :key="item.id" :item="item" :show-index="index" />
        </div>
      </template>
    </MobileBorder>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ItemTemplate from './item-template'
import MobileBorder from './mobile-border'

export default {
  name: 'H5Main',
  components: {
    ItemTemplate,
    MobileBorder
  },
  data() {
    return {
      clickActive: false,
      clickTop: 0,
      clickLeft: 0
    }
  },
  computed: {
    ...mapGetters(['currentPageData']),
    getBackground() {
      if (this.currentPageData.background.image) {
        return 'background: url(' + this.currentPageData.background.image + ') center center / cover no-repeat;'
      } else {
        return 'background: ' + this.currentPageData.background.color
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.main{
    width: 320px;
    height: 486px;
    position: relative;
    background: #ffffff;
    overflow: hidden;
}

</style>
