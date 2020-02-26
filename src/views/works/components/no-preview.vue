<template>
  <div class="container">
    <div class="content">
      <h2>您的作品不存在或未发布，还不能被浏览、分享</h2>
    </div>

    <div class="footer">
      <CopyrightFooter />
    </div>

  </div>
</template>

<script>
import CopyrightFooter from '@/components/CopyrightFooter'

export default {
  components: {
    CopyrightFooter
  }
}
</script>

<style lang="scss" scoped>
.content{
    max-width: 600px;
    margin: 50px auto;
    padding: 0 10px;
    text-align: center;
}
.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #304156;
    color: #ffffff;
}
</style>
