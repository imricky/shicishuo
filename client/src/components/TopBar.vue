<template>
  <div class="topall">
  <div class="topbar-center">
    <el-container>
      <el-header>
        <el-row :gutter="10" justify="space-between">
          <el-col :span="4" :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
            <router-link id="logo" to="/">
              <div class="grid-content bg-purple">
                <i class="el-icon-location"></i>
                <!--              TODO:最后换logo-->
                <span class="logo-word">SHICISHUO</span>
              </div>
            </router-link>
          </el-col>
<!--          中间的标签和搜索栏-->
          <el-col :span="16"  :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <div class="middle-content bg-purple">
              <el-menu :default-active="activeIndex" class="top-bar-middle"
                       mode="horizontal" @select="handleMenuSelect"
                       text-color="#303133"
                       active-text-color="#ffd04b"
                       :router="true">
<!--                TODO:换icon-->
                <el-menu-item index="DailyPoem" route="DailyPoem"><i class="el-icon-postcard"></i>每日诗词</el-menu-item>
                <el-menu-item index="ExploreGoodPoetry" route="ExploreGoodPoetry"><i class="el-icon-search"></i>探索好诗</el-menu-item>
                <el-menu-item index="Library" route="Library"><i class="el-icon-files"></i>文库大全</el-menu-item>
                <el-menu-item index="CoolExploration" route="CoolExploration"><i class="el-icon-potato-strips"></i>实验楼</el-menu-item>
                <el-menu-item>
<!--                  <el-input-->
<!--                    placeholder="请输入内容"-->
<!--                    prefix-icon="el-icon-search"-->
<!--                    v-model="input2">-->
<!--                  </el-input>-->
<!--                  <el-autocomplete-->
<!--                    v-model="input2"-->
<!--                    :fetch-suggestions="querySearchAsync"-->
<!--                    placeholder="李白"-->
<!--                    @select="handleSelect"-->
<!--                  ></el-autocomplete>-->

                  <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="input2"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入搜索内容"
                    @select="handleSelect"
                    :select-when-unmatched="true"
                    :trigger-on-focus="false"
                    :popper-append-to-body="false">
                    <i
                      class="el-icon-search"
                      slot="suffix"
                      @click="handleIconClick">
                    </i>
                  </el-autocomplete>
                </el-menu-item>
              </el-menu>
<!--              <span class="search">-->
<!--                <el-input-->
<!--                  placeholder="请输入内容"-->
<!--                  prefix-icon="el-icon-search"-->
<!--                  v-model="input2">-->
<!--                </el-input>-->
<!--              </span>-->
            </div>

          </el-col>

          <el-col :span="4" :xs="2" :sm="2" :md="4" :lg="4" :xl="4">
            <div class="grid-content bg-purple">
              <div v-if="user.token !== '' && user.username !== ''" class="login-container">
<!--                <el-avatar icon="el-icon-user-solid" class="user-avatar"></el-avatar>-->
                <el-dropdown placement="bottom" @command="handleCommand">
                  <span class="el-dropdown-link">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-s-custom" command="userProfile">个人中心</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-remove" command="logout">注销</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else class="login-container">
                <el-button type="primary" plain @click="goLogin">登录</el-button>
                <el-button type="success" plain @click="goRegister">注册</el-button>
<!--                <el-dropdown placement="bottom">-->
<!--                  <span class="el-dropdown-link">-->
<!--                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>-->
<!--                  </span>-->
<!--                  <el-dropdown-menu slot="dropdown">-->
<!--                    <el-dropdown-item icon="el-icon-s-custom">signin</el-dropdown-item>-->
<!--                    <el-dropdown-item icon="el-icon-remove">signup</el-dropdown-item>-->
<!--                  </el-dropdown-menu>-->
<!--                </el-dropdown>-->
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
  </div>
</template>

<script>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex';
import Http from '@/api/http';
import router from '../router';

export default {
  name: 'TopBar',
  data() {
    return {
      isLogin: false,
      // 搜索框相关
      input2: '',
      searchList: [],
      state: '',
      timeout: null,
    };
  },
  computed: {
    ...mapState({
      // 传字符串参数 'count' 等同于 `state => state.count`
      activeIndex: 'menubarActiveIndex',
    }),
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    // eslint-disable-next-line consistent-return
    handleMenuSelect(key) {
      // eslint-disable-next-line no-debugger
      if (key === 'search') {
        return false;
      }
      this.$store.dispatch('updateMenubarActiveIndex', key);
    },
    goLogin() {
      this.$router.push({
        path: '/login',
      });
    },
    goRegister() {
      this.$router.push({
        path: '/register',
      });
    },
    handleCommand(command) {
      const _self = this;
      if (command === 'logout') {
        this.$message({
          message: '注销成功',
          type: 'success',
          duration: 1000,
          onClose() {
            _self.$store.dispatch('removeUserToken');
          },
        });
      }
      if (command === 'userProfile') {
        this.$router.push({
          path: '/userProfile',
        });
      }
    },

    // 搜索相关
    // TODO: 搜索时智能提示显示最关键的词
    async querySearchAsync(queryString, cb) {
      const queryRes = await Http.search(queryString);
      // 作者信息， 这里不给出标签提示
      const authorInfo = queryRes.data.data.authors.hits;
      const authorSuggest = authorInfo.length > 0 ? [authorInfo[0]._source.name] : [];
      console.log(authorSuggest);

      // 诗词信息
      const poemsInfo = queryRes.data.data.poems.hits;
      let poemsSuggest;
      if (poemsInfo.length > 0) {
        poemsSuggest = poemsInfo.reduce((total, curValue, curIndex, arr) => {
          total.push(curValue._source.paragraphs.toString());
          return total;
        }, []);
      }
      this.searchList = authorSuggest.concat(poemsSuggest);
      console.log(this.searchList);
      // 再把最后的数组的每一项变成一个对象[{value:'杜甫'}]
      this.searchList = this.searchList.reduce((total, curValue, curIndex, arr) => {
        const obj = {};
        obj.value = curValue;
        total.push(obj);
        return total;
      }, []);

      console.log(this.searchList);
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(this.searchList);
      }, 3000 * Math.random());
    },
    handleSelect(item) {
      console.log(item);
      // this.$router.push(`/s?keyword=${item.value}`);
      this.$router.push({ path: '/s', query: { keyword: item.value } });
    },
    handleIconClick(ev) {
      this.$router.push(`/s?keyword=${this.input2}`);
    },
  },
  created() {

  },
  mounted() {
  },
  watch: {
    // 监听router，清空输入框
    $route(route) {
      if (route.query.keyword) {
        this.input2 = '';
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .topall{
    width: 100%;
    border-bottom: 1px solid red;
  }
  .topbar-center{
    max-width: 1040px;
    /*border: 1px solid indianred;*/
    background: #ffffff;
    margin: 0 auto;
    /*border-bottom: 1px solid #00B7FF;*/
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #ffffff;
  }
  .bg-purple {
    background: #ffffff;
  }
  /*顶栏左侧的css*/
  .logo-word{
    font-size: 20px;
    font-weight: bold;
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
    min-height: 60px;
    display: flex;
    /*justify-content: space-between;*/
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    background: #ffffff;
    .top-bar-middle{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .search{
    /*padding-left: 80px;*/
    /*align-self: center;*/
    /*margin-right: 10px;*/
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
