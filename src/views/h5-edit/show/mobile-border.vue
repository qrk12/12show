<template>
  <div class="mobile-border">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MobileBorder'
}
</script>

<style lang="scss" scoped>
.mobile-border{
  padding: 50px 5px;
  background: #C0C4CC;
  border-radius: 30px;
}
</style>
