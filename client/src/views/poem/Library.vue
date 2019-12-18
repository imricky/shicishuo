<template>
  <div>
  <div>
    <TopBar />
  </div>
  <div class="all-container">
    <el-container>
      <el-aside class="aside-container">
        <el-card class="one-card website-info">
          <div slot="header">
            <span>网站信息</span>
          </div>
          <div>
            <p class="all-poetry">本网站共收录：<span class="poem-count">{{poemCount}}</span>首诗词</p>
            <p>本网站共收录：<span class="author-count">{{authorCount}}</span>位诗人</p>
          </div>
        </el-card>
        <el-card class="one-card top-ten-poet">
          <div slot="header">
            <span>十大高产诗人</span>
          </div>
          <div>
            <el-table
              :data="top10PoemList"
              stripe
              style="width: 100%">
              <el-table-column
                prop="_id"
                label="作者">
              </el-table-column>
              <el-table-column
                prop="count"
                label="数量">
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
              v-for="item in top10Tags"
              :key="item._id"
              effect="plain">
              {{ item._id }}
            </el-tag>
          </div>
        </el-card>
      </el-aside>
      <el-main class="main-container">
        <el-table
          :data="poemList"
          style="width: 100%"
          v-if="poemList.length !== 0">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item class="paragraph-table">
                  <!--                  // TODO: 增加样式-->
                  <div v-for="paragraph in props.row.paragraphs" :key="paragraph" >
                    {{ paragraph }}
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            prop="title">
          </el-table-column>
          <el-table-column
            label="作者"
            prop="author">
          </el-table-column>
          <el-table-column
            label="标签🏷"
            width="180">
            <template slot-scope="scope">
              <!--              :type="scope.row.tag === '家' ? 'primary' : 'success'"-->
              <el-tag type="success" v-for="tag in scope.row.tags" :key="tag">
                {{ tag }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>

        <el-divider></el-divider>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          @current-change="changePage">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
    <div>
      <Footer />
    </div>
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
  name: 'Library',
  data() {
    return {
      authorCount: '', // 诗人总数
      poemCount: '', // 诗歌总数
      top10PoemList: [], // 排名前10 的诗人
      top10Tags: [],
      poemList: [], // 右侧诗词的列表
      totalCount: 1000,
      pageSize: 20,
    };
  },
  computed: {},
  methods: {
    async getDatabaseAllInfo() {
      const res = await Http.getDatabaseAllInfo();
      console.log(res);
      return res;
    },
    async getPoemList() {
      const res = await Http.getPoemList();
      console.log(res);
      return res;
    },
    changePage(page) {
      Http.getPoemList(page).then(((res) => {
        this.poemList = res.data.data.res;
        this.totalCount = res.data.data.totalCount;
      }));
    },
  },
  created() {
    this.getDatabaseAllInfo().then((res) => {
      this.authorCount = res.data.data.authorCount[0].count;
      this.poemCount = res.data.data.poemCount;
      this.top10PoemList = res.data.data.top10PoemArr;
      this.top10Tags = res.data.data.top10Tags;
    });
    this.getPoemList().then((res) => {
      this.poemList = res.data.data.res;
      this.totalCount = res.data.data.totalCount;
    });
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">

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

  .main-container{
    border: 1px solid #409EFF;
    margin-left: 20px;
  }
</style>
