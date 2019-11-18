<template>
  <div class="login background-main-color">

    <div class="form">
      <div class="title">12show</div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item class="form-item" prop="login">
          <el-input v-model="form.login" placeholder="账号" />
        </el-form-item>

        <el-form-item class="form-item" prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码" />
        </el-form-item>

        <el-form-item class="form-item">
          <el-button class="submit-button" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data() {
    return {
      form: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { type: 'string', min: 5, max: 16, message: '账号不在有效范围内', trigger: 'blur' }

        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 8, max: 30, message: '密码错误', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    ...mapActions(['user/login']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this['user/login'](this.form).then(res => {
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .form{
        width: 350px;
        height: 300px;
        color: #eee;

        .title{
            font-size: 42px;
            text-align: center;
        }
        .form-item{
            margin-top: 20px;
        }
        .submit-button{
            width: 100%;
        }
    }
}
</style>
