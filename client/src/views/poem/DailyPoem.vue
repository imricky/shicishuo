<template>
  <div>
    <div>
      <TopBar />
    </div>
  <div class="all-container">
    <el-container>
    <el-aside class="aside-container">
      <el-card class="one-card top-ten-poet">
        <div slot="header">
          <span>历史每日诗词</span>
        </div>
        <div>
          <el-table
            :data="historyDailyPoemData"
            stripe
            style="width: 100%"
            @row-click="rowClick">
            <el-table-column
              prop="created"
              label="日期"
              width="60">
            </el-table-column>
            <el-table-column
              prop="author"
              label="作者"
              width="55">
            </el-table-column>
            <el-table-column
              prop="title"
              label="题目">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-aside>
    <el-main class="main">
      <PoemCard :poemCardData="poemCardData"/>
    </el-main>
  </el-container>
  </div>
  <div>
    <Footer />
  </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import PoemCard from '@/components/PoemCard';
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
import Http from '@/api/http';
export default {
  components: {
    PoemCard,
    TopBar,
    Footer,
  },
  name: 'DailyPoem',
  data() {
    return {
      poemCardData: {},
      historyDailyPoemData: [],
    };
  },
  computed: {},
  methods: {
    async getDailyPoem() {
      const res = await Http.getDailyPoem();
      return res;
    },
    async getHistoryDailyPoem() {
      const res = await Http.getHistoryDailyPoem();
      return res;
    },
    async rowClick(row, column, event) {
      console.log(row, column, event);
      try {
        const res = await Http.getOneInfo(row._id);
        // eslint-disable-next-line prefer-destructuring
        this.poemCardData = res.data.data.res[0];
      } catch (e) {
        this.$message({
          message: '获取诗词信息失败',
          type: 'warning',
        });
      }
    },
  },
  created() {
    this.getDailyPoem().then((res) => {
      // eslint-disable-next-line prefer-destructuring
      this.poemCardData = res.data.data[0];
    });
    this.getHistoryDailyPoem().then((res) => {
      res.data.data.res.map((i) => {
        i.created = i.created.substring(5);
      });
      // eslint-disable-next-line prefer-destructuring
      this.historyDailyPoemData = res.data.data.res;
    });
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">

  .one-card{
    /*margin: 20px 0;*/

  }
  .main{
    border: 1px solid rebeccapurple;
    background-color: #E9EEF3;
    color: #333;
    margin: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*TODO: 需要媒体查询,先去掉高度,不然会出现滚动条，不好看*/
    /*height: 460px;*/
  }


  /* 平板电脑和小屏电脑之间的分辨率 */
  @media screen and (min-width: 768px) and (max-width: 979px) {
  }

  /* 横向放置的手机和竖向放置的平板之间的分辨率 */
  @media screen and (max-width: 767px) {

  }

  /* 横向放置的手机及分辨率更小的设备 */
  @media screen and (max-width: 480px) {
    .aside-container{
      display: none;
    }
    .all-container{
      /*display:flex;!*Flex布局*!*/
      /*display: -webkit-flex; !* Safari *!*/
      /*align-items:center;!*指定垂直居中*!*/
      height: 600px;
    }
  }

</style>
