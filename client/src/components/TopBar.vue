<template>
  <div class="center">
    <el-container>
      <el-header>
        <el-row :gutter="10" justify="center">
          <el-col :span="4" :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
            <div class="grid-content bg-purple">
              <i class="el-icon-location"></i>
            <span class="logo-word">SHICISHUO</span>
          </div>
          </el-col>
          <el-col :span="14" :offset="2" :xs="4" :sm="6" :md="14" :lg="14" :xl="14">
            <div class="middle-content bg-purple-light">
              <el-menu :default-active="activeIndex" class="top-bar-middle"
                       mode="horizontal" @select="handleSelect"
                       text-color="#303133"
                       active-text-color="#ffd04b">
<!--                TODO:换icon-->
                <el-menu-item index="1"><i class="el-icon-location"></i>每日诗词</el-menu-item>
                <el-menu-item index="2"><i class="el-icon-location"></i>探索好诗</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-location"></i>文库大全</el-menu-item>
                <el-menu-item index="4"><i class="el-icon-location"></i>实验楼</el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="4" :xs="4" :sm="6" :md="4" :lg="4" :xl="4">
            <div class="grid-content bg-purple">
              <div v-if="!isLogin" class="login-container">
                <el-avatar icon="el-icon-user-solid" class="user-avatar"></el-avatar>
                <div class="logout"><el-button type="success" plain>注销</el-button></div>
              </div>
              <div v-else class="login-container">
                <el-button type="primary" plain >signin</el-button>
                <el-button type="success" plain>signup</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      activeIndex: '1',
      isLogin: false,
    };
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    /*background: #e5e9f2;*/
  }
  .grid-content {
    border-radius: 4px;
    min-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .middle-content{
    border-radius: 4px;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .logo-word{
    /*padding-left: 40px;*/
    /*text-align: center;*/
  }
  .top-bar-middle{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .login-container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-avatar{
    margin-right: 10px;
  }
  .logout{
    margin-left: 10px;
  }
</style>
