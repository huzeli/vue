<template>
  <div>
    <el-form :rules="rules"
             ref="loginForm"
             :model="loginForm"
             class="loginContainer"
             v-loading="loading"
             element-loading-text="正在登录中。。。"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">

      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  v-model="loginForm.username"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  auto-complete="false"
                  v-model="loginForm.password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text"
                  auto-complete="false"
                  v-model="loginForm.code"
                  placeholder="点击图片更换验证码"
                  style="width:60%"></el-input>
      </el-form-item>
      <img :src="captchUrl"
           @click="updateCapthUrl" />
      <el-checkbox v-model="checked"
                   class="loginRemenber">请记住我</el-checkbox>
      <el-button type="primary"
                 style="width:100%"
                 @click="submitLoin">登录</el-button>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      captchUrl: '/captche/getCaptche?time=' + new Date(),
      loginForm: {
        username: 'admin',
        password: '123',
        code: ''
      },
      loading: false,
      checked: true,
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    updateCapthUrl () {
      this.captchUrl = '/captche/getCaptche?time=' + new Date()
    },
    submitLoin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.postRequest('/login/login', this.loginForm).then(resp => {
            if (resp) {
              this.loading = true
              alert(resp)
              console.log(resp)
              const tokenStr = resp.tokenHead + resp.token
              window.sessionStorage.setItem('tokenStr', tokenStr)
              this.$router.replace('/home')
            }
          })
        } else {
          this.$message.error('请输入所有字段');
          return false;
        }
      });
    }
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #cac6c6;
  box-shadow: 0 0 25px #cac6c6; /** 阴影 */
}
.loginTitle {
  margin: 0 auto 40px auto;
  text-align: center;
}
.loginRemenber {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>
