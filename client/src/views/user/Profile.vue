<template>
  <div>
    <div class="user-info">
      <div class="user-header">
        <div class="user-avatar">
          <img src="../../assets/logo.png" alt="用户头像">
          用户头像
        </div>
        <div class="user-other">
          <div class="user-name">用户名</div>
          <div class="user-desc">简介</div>
          <div class="user-collection">被关注，被收藏，点赞数</div>
          <div class="user-setting">
            <el-button type="primary">设置</el-button>
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
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的创作" name="second">markdown</el-tab-pane>
          <el-tab-pane label="还在规划" name="third">还在规划中</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      activeName: 'first',
      collectionList: ['1'],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
    };
  },
  computed: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  created() {

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
        .user-name{
          font-size: 20px;
          font-weight: bold;
          line-height: 45px;
          border: 1px solid #E6A23C;
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

  .main-container{
    width: 680px;
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
