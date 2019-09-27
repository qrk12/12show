<template>
  <div>
    <el-dialog title="外链音乐" :visible.sync="audioLinkVisible" :before-close="close" :append-to-body="true">
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">

          <el-form-item label="音乐名称" prop="name">
            <el-input v-model.trim="form.name" type="text" />
          </el-form-item>
          <el-form-item label="音乐链接" prop="path">
            <el-input v-model.trim="form.path" type="text" />
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
    audioLinkVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        type: 'audio',
        name: '',
        path: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请填写链接', trigger: 'blur' },
          { max: 255, message: '长度必须在255字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:audioLinkVisible', false)
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          createMedia(this.form).then(res => {
            this.$message.success('提交成功')
            // 还原
            this.form = {
              type: 'audio',
              name: '',
              path: ''
            }
          })
        }
      })
    }

  }
}
</script>
