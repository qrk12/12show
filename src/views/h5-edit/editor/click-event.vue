<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="currentItemData.click"
      :rules="rules"
      class="form"
      label-width="40px"
    >
      <el-form-item label="跳转">
        <el-select v-model="currentItemData.click.type" placeholder="点击" clearable @change="onType">
          <el-option label="链接" value="link" />
          <el-option label="页面" value="page" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="currentItemData.click.type === 'link'" label="链接" prop="link">
        <el-input v-model="currentItemData.click.link" type="url" placeholder="https://" clearable />
      </el-form-item>

      <el-form-item v-if="currentItemData.click.type === 'page'" label="页面" prop="page">
        <el-select v-model="currentItemData.click.page" placeholder="请选择" :clearable="true">
          <el-option v-for="(item,index) in scenePages" :key="index" :label="item" :value="index" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      rules: {
        link: [{ type: 'url', message: '请输入正确的网址', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState({
      pages: state => state.h5Json.pages,
      activeItem: state => state.activeItem
    }),
    ...mapGetters(['currentItemData']),
    scenePages() {
      const pages = ['无']
      for (let index = 0; index < this.pages.length; index++) {
        pages.push(`第${index + 1}页`)
      }
      return pages
    }
  },
  watch: {
    activeItem: {
      immediate: true,
      handler: 'handlerData'
    }
  },
  methods: {
    handlerData() {
      console.log('handlerData')
      if (this.currentItemData.click === undefined) {
        const data = {
          type: '',
          link: '',
          page: ''
        }
        this.$set(this.currentItemData, 'click', data)
      }
    },
    onType(type) {
      this.$refs.ruleForm.clearValidate()
      console.log(this.currentItemData.click)
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
}
</style>
