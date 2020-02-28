<template>
  <ICountUp
    v-if="reStart"
    :delay="extras.delay * 1000"
    :end-val="extras.endVal"
    :options="extras.options"
  />
</template>

<script>
// 动态数字
import ICountUp from 'vue-countup-v2'

export default {
  components: {
    ICountUp
  },
  props: {
    extras: {
      type: Object,
      default() {
        return {
          delay: 0,
          endVal: 100,
          options: {
            startVal: 0,
            decimalPlaces: 0,
            duration: 10,
            useGrouping: true,
            separator: ',',
            decimal: '.'
          }
        }
      }
    }
  },
  data() {
    return {
      reStart: true
    }
  },
  watch: {
    extras: {
      deep: true,
      handler: function(val) {
        console.log(val)
        this.reStart = false
        setTimeout(() => {
          this.reStart = true
        }, 10)
      }
    }
  }
}
</script>

