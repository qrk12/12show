<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="currentItemData.click"
      :rules="rules"
      class="form"
      label-width="40px"
    >
      <el-form-item label="点击">
        <el-select v-model="currentItemData.click.type" placeholder="点击" clearable @change="onType">
          <el-option label="无" value="" />
          <el-option label="跳转链接" value="link" />
          <el-option label="跳转页面" value="page" />
          <el-option label="拨打电话" value="tel" />
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

      <el-form-item v-if="currentItemData.click.type === 'tel'" label="电话" prop="tel">
        <el-input v-model="currentItemData.click.tel" type="number" placeholder="电话号码" clearable />
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
          page: '',
          tel: ''
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

