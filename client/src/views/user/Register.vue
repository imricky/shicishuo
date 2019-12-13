<template>
  <!--  TODO： 增加背景图-->
  <div class="register-wrap1">
    <div class="register-main">
      <div class="logo">
        <p class="logo-word">
          SHICISHUO  -  register
        </p>
      </div>
      <div class="main">
        <el-form label-position="top" label-width="80px" :model="registerForm" :rules="rules" ref="registerForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input type="password" v-model="registerForm.repassword"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email" placeholder="后期用于找回密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="register-bottom">
        <el-button type="primary" class="register-button" @click="doRegister('registerForm')">注册</el-button>
        <el-link class="already-have-username" @click="goLogin">已有账号？登录</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '@/api/http';
export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_-]{3,10}$/;
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!reg.test(value)) {
        callback(new Error('用户名长度应为3-10位、支持字母、数字、下划线、减号'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码长度必须6位及以上'));
      } else {
        if (this.registerForm.repassword !== '') {
          this.$refs.registerForm.validateField('repassword');
        }
        callback();
      }
    };
    const validateRepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        username: '',
        password: '',
        repassword: '',
        email: '',
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        repassword: [
          { validator: validateRepassword, trigger: 'blur' },
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  computed: {},
  methods: {
    doRegister(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const _self = this;
          const {
            username = '', password = '', repassword = '', email = '',
          } = this.registerForm;
          const registerData = {
            username,
            password,
            repassword,
            email,
          };
          const res = await Http.register(registerData);
          const { code, msg } = res.data;
          if (code === 200) {
            this.$message({
              message: '注册成功,正在跳转到登录页面...',
              type: 'success',
              duration: 2000,
              onClose() {
                _self.$router.push({
                  path: '/login',
                });
              },
            });
          } else {
            this.$message({
              message: `注册失败,失败原因：${msg}`,
              type: 'error',
              duration: 2000,
              onClose() {
                _self.$refs[formName].resetFields();
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
    goLogin() {
      this.$router.push({
        path: '/login',
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
  .register-wrap{
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
  .register-main{
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
  .register-bottom{
    display: flex;
    flex-direction: column; //垂直对齐
    justify-content: center;
    align-items: center;
    margin: 20px 40px;
    .already-have-username{
      margin-top: 10px;
    }
  }

</style>
