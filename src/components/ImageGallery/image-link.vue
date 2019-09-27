<template>
  <div>
    <el-dialog title="外链图片" :visible.sync="imageLinkVisible" :before-close="close" :append-to-body="true">
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">

          <el-form-item label="图片链接" prop="path">
            <el-input v-model.trim="form.path" type="text" />
          </el-form-item>
          <el-form-item v-if="form.path">
            <el-image
              style="width: 120px; height: 120px"
              :src="form.path"
              placeholder="记载中"
              fit="contain"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">提交</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createMedia } from '@/api/media.js'

export default {
  props: {
    imageLinkVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        type: 'img',
        name: 'link image',
        path: null
      },
      rules: {
        path: [
          { required: true, message: '请填写链接', trigger: 'blur' },
          { max: 255, message: '长度必须在255字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:imageLinkVisible', false)
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          createMedia(this.form).then(res => {
            this.$message.success('提交成功')
            this.form.path = null
          })
        }
      })
    }

  }
}
</script>
