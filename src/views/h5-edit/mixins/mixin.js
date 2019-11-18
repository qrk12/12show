import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['saveWorks', 'publishWorks']),
    onSave() {
      const loading = this.$loading()
      this.saveWorks().then(res => {
        loading.close()
      }).catch(() => {
        loading.close()
        this.$message.error('更新失败')
      })
    },
    onPublish(status) {
      const loading = this.$loading()
      this.publishWorks(status).then(res => {
        loading.close()
      }).catch(() => {
        loading.close()
        this.$message.error('发布失败')
      })
    }
  }
}
