<template>
  <div>
      <TopBar />
    <div>
      <div class="user-container">
        <div class="user-header">
          <img src="../../assets/logo.png" alt="用户头像">
        </div>
        <div class="user-info">
          <p class="user-name">
            {{userInfo.username}}
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              style="margin-left: 10px"
              @click="userSetting">设置</el-button>
          </p>
<!--          TODO: 加入用户设置页面-->
          <span class="user-desc">宝剑锋从磨砺出，梅花香自苦寒来</span>
          <p class="user-stat">
            <span>点赞数：<span style="color: #67C23A">213</span></span>
            <span>收藏数：<span style="color: #409EFF">456</span></span>
            <span>被收藏数：<span style="color: #F56C6D">789</span></span>
          </p>
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
      <Footer />
  </div>
</template>

<script>
import Http from '@/api/http';
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    TopBar,
    Footer,
  },
  name: 'Profile',
  data() {
    return {
      activeName: 'first',
      collectionList: [], // 收藏列表
      collectionTotalCount: 100, // 收藏诗词的数量
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
        // TODO： 加入容错机制和提醒，提取公共方法（这里写了两遍）
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
      this.$message({
        message: '敬请期待',
        type: 'success',
        duration: 1000,
      });
    },
  },
  created() {
    // 处理没有的情况
    this.getCollectionsByUserId().then((res) => {
      // 如果收藏列表里存在 则赋值进去
      if (res.data.data && res.data.data.res.length !== 0) {
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
  .user-container{
    border: 1px solid red;
    height: 160px;
    /*width: 100%;*/
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .user-header{
      width: 120px;
      height: 120px;
      border: 1px solid #AA314D;
      overflow: hidden;
      img{
        /*将图片填充满div*/
        width: 100%;
        height: 100%;
        object-fit:cover;
      }
    }
    .user-info{
      height: 120px;
      /*min-width: 300px;*/
      border: 1px solid #F56C6C;
      overflow: hidden;
      .user-name{
        font-size: 24px;
        font-weight: bold;
        margin: 0;
        margin-bottom: 10px;
      }
      .user-desc{
        font-size: 12px;
        color: #909399;
      }
      .user-stat{
        font-size: 16px;
        > :nth-child(n){
          margin: 0 10px;
        }
        > :first-child{
          margin-left: 0px;
        }
      }
    }
  }


  .main-container{
    max-width: 1000px;
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

  /* 手机以外的分辨率 */
  @media screen and (min-width: 481px) {
    .user-container{
      margin-top: 20px;
    }
    .user-header{
      margin-left: 40px;
    }
    .user-info{
      margin-left: 40px;
    }
  }

  /* 横向放置的手机和竖向放置的平板之间的分辨率 */
  @media screen and (max-width: 767px) {

  }

  /* 横向放置的手机及分辨率更小的设备 */
  @media screen and (max-width: 480px) {
    .user-container{
      margin-top: 0px;
    }
    .user-header{
      margin-left: 0;
    }
    .user-info{
      margin-left: 20px;
    }

  }
</style>
