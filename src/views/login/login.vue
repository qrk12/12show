<template>
  <div class="login background-main-color">

    <div class="form">
      <div class="title">
        <svg-icon icon-class="logo" style="width:300px;height:70px;" />
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item class="form-item" prop="login">
          <el-input v-model.trim="form.login" placeholder="账号" />
        </el-form-item>

        <el-form-item class="form-item" prop="password">
          <el-input v-model.trim="form.password" type="password" placeholder="密码" />
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
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['user/login', 'user/getInfo', 'user/upgrapde']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this['user/login'](this.form).then(res => {
            this['user/getInfo']()
            this['user/upgrapde']()
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
