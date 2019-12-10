<template>
  <div>
    <el-button @click="testClick">点击</el-button>
  </div>
</template>

<script>

const origin = {
  methods: {
    testClick() {
      console.log(1232)
    }
  }
}

console.log(JSON.stringify(origin))
const mixin = JSON.parse(JSON.stringify(origin))
console.log(mixin)

export default {
  mixins: [origin]
}
</script>
