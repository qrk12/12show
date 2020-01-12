import { mapActions } from 'vuex'

export default {
  data() {
    return {
      saveLoading: false,
      publishLoading: false,
      cancelLoading: false
    }
  },
  methods: {
    ...mapActions(['saveWorks', 'publishWorks']),
    onSave() {
      this.saveLoading = true
      this.saveWorks().then(res => {
        this.saveLoading = false
      }).catch(() => {
        this.saveLoading = false
        this.$message.error('更新失败')
      })
    },
    onPublish(status) {
      this.publishStatus(status, true)
      this.publishWorks(status).then(res => {
        this.publishStatus(status, false)
      }).catch(() => {
        this.publishStatus(status, false)
        this.$message.error('发布失败')
      })
    },
    publishStatus(status, isLoading) {
      if (status === 1) {
        this.cancelLoading = isLoading
      } else {
        this.publishLoading = isLoading
      }
    }
  }
}
