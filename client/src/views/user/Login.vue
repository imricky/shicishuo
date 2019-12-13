<template>
<!--  TODO： 增加背景图-->
  <div class="login-wrap1">
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
                  path: '/1',
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
    background: url('../../assets/bg2.jpg');
    /*让整个div固定在屏幕的最上方和最左方*/
    position: fixed;
    top: 0;
    left: 0;
    /*让整个div跟屏幕实现一模一样的大小，从而达到全屏效果，
    而min-width是为了实现让屏幕宽度在1000px以内时，div的大小保持不变，
    也就是说在这种情况下，缩放屏幕宽度时，图片不要缩放（只有在1000px以内才有效）*/
    width: 100%;
    height: 100%;
    min-width: 600px;
    /*整个div在HTML页面中各个层级的下方*/
    z-index: -10;
    zoom: 1;
    background-color: #000;
    /*上面这个是背景不要重复*/
    background-repeat: no-repeat;
    /*就是让图片随屏幕大小同步缩放，但是有部分可能会被裁切，不过不至于会露白*/
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    /*这句的意思就是图片的位置，居中，靠左对齐*/
    background-position: center 0;
    /*background-color: #AA314D;*/
    /*position: relative;*/  //必须要注释掉才能居中，不清楚为啥

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
