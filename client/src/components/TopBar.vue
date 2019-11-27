<template>
  <div class="center">
    <el-container>
      <el-header>
        <el-row :gutter="10" justify="space-between">
          <el-col :span="4" :xs="8" :sm="6" :md="4" :lg="4" :xl="4">
            <div class="grid-content bg-purple">
              <i class="el-icon-location"></i>
<!--              TODO:最后换logo-->
            <span class="logo-word">SHICISHUO</span>
          </div>
          </el-col>

<!--          中间的标签和搜索栏-->
          <el-col :span="16"  :xs="4" :sm="6" :md="14" :lg="16" :xl="16">
            <div class="middle-content bg-purple">
              <el-menu :default-active="activeIndex" class="top-bar-middle"
                       mode="horizontal" @select="handleSelect"
                       text-color="#303133"
                       active-text-color="#ffd04b">
<!--                TODO:换icon-->
                <el-menu-item index="1"><i class="el-icon-postcard"></i>每日诗词</el-menu-item>
                <el-menu-item index="2"><i class="el-icon-search"></i>探索好诗</el-menu-item>
                <el-menu-item index="3"><i class="el-icon-files"></i>文库大全</el-menu-item>
                <el-menu-item index="4"><i class="el-icon-potato-strips"></i>实验楼</el-menu-item>
              </el-menu>
              <span class="search">
                <el-input
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  v-model="input2">
                </el-input>
              </span>
            </div>

          </el-col>

          <el-col :span="4" :xs="4" :sm="6" :md="4" :lg="4" :xl="4">
            <div class="grid-content bg-purple">
              <div v-if="!isLogin" class="login-container">
<!--                <el-avatar icon="el-icon-user-solid" class="user-avatar"></el-avatar>-->
                <el-dropdown placement="bottom">
                  <span class="el-dropdown-link">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-s-custom">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-remove">注销</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else class="login-container">
                <el-button type="primary" plain >signin</el-button>
                <el-button type="success" plain >signup</el-button>
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
      input2: '',
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
  .center{
    max-width: 1040px;
    border: 1px solid indianred;
    background: #F56C6C;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    margin: 0 auto;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  /*顶栏的css*/
  .top-header{
    margin-left: -20px;
  }
  .logo-word{
    /*padding-left: 40px;*/
    /*text-align: center;*/
  }
  .grid-content {
    border-radius: 4px;
    min-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /*中间栏的css*/
  .top-middle{
    /*<!--margin-left: -60px;-->*/
  }
  .middle-content{
    border-radius: 4px;
    /*min-height: 60px;*/
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /*background: #409EFF;*/
  }
  .top-bar-middle{
    /*第一个子元素负-20px*/
    &:nth-child(1){
      margin-left: -20px;
    }
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .search{
    /*width: 200px;*/
    margin: 0 10px;
  }

  /*右侧的登录注册css*/
  .login-container{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-avatar{
    /*margin-right: 10px;*/
  }

</style>
