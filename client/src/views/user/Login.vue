<template>
<!--  TODO： 增加背景图-->
  <div class="login-wrap">
    <div class="login-main">
      <div class="logo">
        <p class="logo-word">
          SHICISHUO  -  login
        </p>
      </div>
      <div class="main">
        <el-form label-position="top" label-width="80px" :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-bottom">
        <el-button type="primary" class="login-button" @click="doLogin('loginForm')">登录</el-button>
        <el-link href="/t" target="_blank"  class="forgot">我忘记密码了</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '@/api/http';
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6, message: '长度必须大于6个字符', trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    doLogin(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(this.loginForm);
        if (valid) {
          const _self = this;
          const { username = '', password = '' } = this.loginForm;
          const loginData = {
            username,
            password,
          };
          const res = await Http.login(loginData);
          const { code, msg, data = {} } = res.data;
          if (code === 200) {
            this.$store.dispatch('saveUserToken', data);
            this.$message({
              message: '登录成功,正在跳转中...',
              type: 'success',
              duration: 1000,
              onClose() {
                _self.$router.push({
                  path: '/t',
                });
              },
            });
          } else {
            this.$message({
              message: `登录失败,失败原因：${msg}`,
              type: 'error',
              duration: 1000,
              onClose() {
                _self.loginForm.password = '';
              },
            });
            return false;
          }
        } else {
          this.$message({
            message: 'error submit!!',
            type: 'warning',
          });
          return false;
        }
      });
    },
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .login-wrap{
    height: 100%;
    background: url('../../assets/bg2.jpg');
    background-size: 100% 100%;
    position: relative;
  }
  .login-main{
    width: 500px;
    /*height: 400px;*/
    position: absolute;
    left: 50%;
    top: 50%;
    border: 1px solid #606266;
    transform: translate(-50%,-50%);
    box-shadow: #666 0 0 30px;
  }
  .logo{
    border: 1px solid #E6A23C;
    height: 50px;
    margin: 20px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo-word{
      color: #00B7FF;
    }
  }

  /*输入框区域*/
  .main{
    margin: 20px;
  }

  /*按钮区域*/
  .login-bottom{
    display: flex;
    flex-direction: column; //垂直对齐
    justify-content: center;
    align-items: center;
    margin: 20px 40px;
    .forgot{
      margin-top: 10px;
    }
  }

</style>
