<template>
  <div class="container">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card shadow="always">
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="账号" prop="login">
              <el-input v-model="form.login" disabled="" />
            </el-form-item>
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input v-model="form.oldPassword" type="password" />
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input v-model="form.password" type="password" />
              <div class="note">安全建议：密码由大小写字母、数字、特殊字符组合，16位以上</div>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="form.confirmPassword" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">确认</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { update } from '@/api/user'
import { getInfo } from '@/utils/auth'
import { mapActions } from 'vuex'

export default {
  name: 'UserPassword',
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        uid: '',
        login: '',
        oldPassword: '',
        password: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 9, message: '密码长度在9位以上', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions(['user/frontLogOut']),

    fetchData() {
      const info = getInfo()
      this.form.uid = info.uid
      this.form.login = info.login
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          update(this.form.uid, this.form).then(res => {
            this.$message({
              message: '修改成功，将重新登录',
              type: 'success',
              onClose: () => {
                this['user/frontLogOut']()
                this.$router.push('/login')
              }
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.note{
    color: #C0C4CC;
}
</style>
