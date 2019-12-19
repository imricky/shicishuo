<template>
  <div>
<!--    <div>-->
<!--      <TopBar />-->
<!--    </div>-->
    <div>
      <div class="user-info">
        <div class="user-header">
          <div class="user-avatar">
            <img src="../../assets/logo.png" alt="用户头像">
            用户头像
          </div>
          <div class="user-other">
            <div class="user-name animated" :class="{ jello: usernameAnimate }"  ref="username" :contenteditable="isInSetting">
              {{userInfo.username}}
            </div>
            <div class="user-desc">{{userInfo.userDescription}}</div>
            <div class="user-collection">被关注，被收藏，点赞数</div>
            <div class="user-setting">
              <span v-if="isInSetting === false">
                <el-button type="primary" size="mini" @click="userSetting">设置</el-button>
              </span>
              <span v-else>
                <el-button type="primary" size="mini" @click="userSettingSave">保存</el-button>
                <el-button type="primary" size="mini" @click="userSettingCancel">取消</el-button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="main-container">
        <div class="main">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="收藏列表" name="first">
              <div class="no-collection-list" v-if="collectionList.length === 0">
                您还没有收藏过诗词呢
              </div>
              <div v-else>
                <el-table
                  :data="collectionList"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    prop="title"
                    label="标题"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="author"
                    label="作者"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="tags"
                    label="标签">
                  </el-table-column>
                  <el-table-column
                    prop="created"
                    label="创建时间">
                  </el-table-column>
                </el-table>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total=collectionTotalCount
                  @current-change="changeCollectionPage">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我的创作" name="second">markdown</el-tab-pane>
            <el-tab-pane label="还在规划" name="third">还在规划中</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Http from '@/api/http';
// import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    // TopBar,
    Footer,
  },
  name: 'Profile',
  data() {
    return {
      activeName: 'first',
      collectionList: [], // 收藏列表
      collectionTotalCount: 100, // 收藏诗词的数量
      isInSetting: false, // 是否正在设置，默认为false
      usernameAnimate: false, // 用户名修改输入框的动效
      userInfo: {
        username: '',
        userDescription: '',
        userAvatar: '',
        userHaveBeenCollected: 1,
        userHaveBeenThumbsUp: 1,
      },
    };
  },
  computed: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取用户的收藏列表
    async getCollectionsByUserId(page) {
      // TODO： 加入容错机制和提醒，提取公共方法（这里写了两遍）
      const _id = window.localStorage.getItem('_id');
      const res = await Http.getCollectionsByUserId(_id, page);
      return res;
    },
    // 翻页的方法
    changeCollectionPage(page) {
      this.getCollectionsByUserId(page).then((res) => {
        // 如果收藏列表里存在 则赋值进去
        if (res.data.data.res.length !== 0) {
          this.collectionList = res.data.data.res[0].poems;
          this.collectionTotalCount = res.data.data.totalCount;
        }
      });
    },
    // 获取用户信息
    async getUserInfo() {
      const _id = window.localStorage.getItem('_id');
      const res = await Http.getUserInfo(_id);
      return res;
    },
    // 点击设置
    userSetting() {
      this.isInSetting = true;
      this.usernameAnimate = true;
    },
    userSettingCancel() {
      this.isInSetting = false;
      this.usernameAnimate = false;
    },
    async userSettingSave() {
      const _self = this;
      const username = this.$refs.username.innerHTML;
      // 原来的username,更新失败了就恢复,必须要从vuex里取，不能直接oldUsername = this.$refs.username.innerHTML;
      const oldUsername = this.$store.state.user.username;
      const { _id } = this.$store.state.user;
      const res = await Http.updateUserInfo(_id, username);
      // 如果更新成功
      if (res.data.code === 200) {
        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 1000,
          onClose() {
            window.localStorage.setItem('username', username);
            _self.isInSetting = false;
          },
        });
      } else {
        this.$message({
          message: res.data.msg,
          type: 'warning',
          duration: 1000,
          onClose() {
            _self.isInSetting = false;
            _self.$refs.username.innerHTML = oldUsername;
          },
        });
      }
      // 最后全部设置为false
      this.isInSetting = false;
      this.usernameAnimate = false;
    },
  },
  created() {
    // 处理没有的情况
    this.getCollectionsByUserId().then((res) => {
      // 如果收藏列表里存在 则赋值进去
      if (res.data.data.res.length !== 0) {
        this.collectionList = res.data.data.res[0].poems;
        this.collectionTotalCount = res.data.data.totalCount;
      }
    });

    // 获取用户信息
    this.getUserInfo().then((res) => {
      this.userInfo.username = res.data.data[0].username;
      this.userInfo.userDescription = 'test1';
    });
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .user-info{
    width: 680px;
    height: 250px;
    border: 1px solid #409EFF;
    margin: 0 auto;
    margin-top: 20px;
    .user-header{
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .user-avatar{
        margin-left: 20px;
        border: 1px solid red;
        width: 100px;
        height: 100px;
        overflow: hidden;
      }
      .user-other{
        border: 1px solid darkcyan;
        text-align: left;
        // 模拟光标闪动
        .user-name{
          font-size: 20px;
          font-weight: bold;
          line-height: 45px;
          border: 1px solid #E6A23C;
          &[contenteditable=true]{
            /*TODO: 改变输入框的颜色*/
            border: 1px solid #409EFF;
            animation: blink 1s infinite steps(1, start);
          }
        }
        .user-desc{
          margin-top: 20px;
          font-size: 16px;
          line-height: 40px;
          border: 1px solid #42b983;
        }
        .user-collection{
          margin-top: 20px;
          height: 30px;
          border: 1px solid #42b983;
        }
        .user-setting{
          margin-top: 20px;
          border: 1px solid #00B7FF;
        }
      }
    }
  }

  /*这里设置动画blink*/
  @keyframes blink {
    0%, 100% {
      background-color: #000;
      color: #aaa;
    }
    50% {
      background-color: #bbb; /* not #aaa because it's seem there is Google Chrome bug */
      color: #000;
    }
  }


  .main-container{
    width: 680px;
    min-height: 270px;
    height: 100%;
    border: 1px solid #E6A23C;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    .main{
      text-align: left;
    }
  }
</style>
