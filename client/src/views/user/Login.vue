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
          <el-button type="primary" @click="doLogin('loginForm')">登录</el-button>
          <el-link href="/t" target="_blank"  class="forgot">我忘记密码了</el-link>
        </div>
      </div>
      <div class="mobile-all">
            <div class="mobile-title">
              <h1 class="mobile-logo-word">
                SHICISHUO  -  login
              </h1>
            </div>
            <div class="mobile-main">
              <el-form label-position="top" label-width="80px" :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="mobile-bottom">
              <el-button type="primary" class="mobile-login-button" @click="doLogin('loginForm')">登录</el-button>
              <el-link href="/t" target="_blank"  class="mobile-forget">我忘记密码了</el-link>
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

  /*移动端显示*/
  .mobile-all{
    display: none;
  }

  /* 平板电脑和小屏电脑之间的分辨率 */
  @media screen and (min-width: 768px) and (max-width: 979px) {
  }

  /* 横向放置的手机和竖向放置的平板之间的分辨率 */
  @media screen and (max-width: 767px) {

  }

  /* 横向放置的手机及分辨率更小的设备 */
  @media screen and (max-width: 480px) {
    .login-main{
      display: none;
    }

    .mobile-all{
      display: block;
    }
    .mobile-title{
      /*border: 1px solid red;*/
      position: absolute;
      top: 25%;
      transform: translateY(-50%);
      margin: 0 auto;
      width: 100%;
      text-align: center;
    }

    .mobile-logo-word{
    }
    .mobile-main{
      /*border: 1px solid red;*/
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      margin: 0 auto;
      padding: 0 20px;
    }
    .mobile-bottom{
      /*border: 1px solid red;*/
      position: absolute;
      top: 70%;
      transform: translateY(-50%);
      width: 100%;
      margin: 0 auto;
      text-align: center;
      margin-top: 20px;
    }
    .mobile-login-button{
      display: block;
      margin: 0 auto;
      margin-bottom: 10px;
    }
    .mobile-forget{
      display: block;
      margin: 0 auto;
      margin-bottom: 10px;
    }

  }

</style>
