<template>
  <div class="login background-main-color">

    <div class="form" @keyup.enter="onSubmit">
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
          <el-button class="submit-button" type="primary" :loading="loading" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import setting from '@/setting.js'

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
      },
      loading: false
    }
  },
  created() {
    if (setting.isDemo) {
      this.form = {
        login: 'admin',
        password: 'admin'
      }
    }
  },
  methods: {
    ...mapActions(['user/login', 'user/getInfo', 'user/upgrapde']),
    onSubmit() {
      console.log('enter')
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this['user/login'](this.form).then(res => {
            this['user/getInfo']()
            this['user/upgrapde']()
            this.loading = false
            this.$router.push('/home')
          }).catch(() => {
            this.loading = false
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
