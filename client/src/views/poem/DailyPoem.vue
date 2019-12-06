<template>
  <div>
    <div>
      <TopBar />
    </div>
  <div class="daily-poem">
    <el-container>
    <el-aside class="aside-container">
      <el-card class="one-card website-info">
        <div slot="header">
          <span>网站信息</span>
        </div>
        <div>
          <p class="all-poetry">本网站共收录：<span class="poem-count">20000</span>首诗词</p>
          <p>本网站共收录：<span class="author-count">3000</span>位诗人</p>
        </div>
      </el-card>
      <el-card class="one-card top-ten-poet">
        <div slot="header">
          <span>十大高产诗人</span>
        </div>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{{ props.row.shopId }}</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{{ props.row.category }}</span>
                  </el-form-item>
                  <el-form-item label="店铺地址">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="商品 ID"
              prop="id">
            </el-table-column>
            <el-table-column
              label="商品名称"
              prop="name">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="one-card popular-words">
        <div slot="header">
          <span>热门词语</span>
        </div>
        <div>
          <el-tag
            v-for="item in items"
            :key="item.label"
            :type="item.type"
            effect="plain">
            {{ item.label }}
          </el-tag>
        </div>
      </el-card>
    </el-aside>
    <el-main class="main">
          <PoemCard :poemCardData="poemCardData"/>
<!--      <el-aside class="aside">-->
<!--        123dasldasd-->
<!--        sdhjkasdhjaksdjh-->
<!--      </el-aside>-->
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
    };
  },
  computed: {},
  methods: {
    async getDailyPoem() {
      const res = await Http.getDailyPoem();
      return res;
    },
  },
  created() {
    this.getDailyPoem().then((res) => {
      // eslint-disable-next-line prefer-destructuring
      this.poemCardData = res.data[0];
      // console.log(res);
    });
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .daily-poem{
    max-width: 1040px;
    border: 1px solid indianred;
    /*background: #F56C6C;*/
    margin: 0 auto;
    margin-top: 20px;
  }
  .aside-container{
    width: 200px;
    border: 1px solid #E6A23C;
    .one-card{
      margin-bottom: 20px;
    }
    .all-poetry{
      margin-bottom: 10px;
      .poem-count{
        font-weight: bold;
        color: #AA314D;
      }
      /*border-bottom: 1px solid gray;*/
    }
    .author-count{
      font-weight: bold;
      /*TODO: 各种颜色需要调整*/
      color: aquamarine;
    }
  }
  .main{
    border: 1px solid rebeccapurple;
    background-color: #E9EEF3;
    color: #333;
    margin: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*TODO: 需要媒体查询,先去掉高度,不然会出现滚动条，不好看*/
    /*height: 460px;*/
  }

</style>
