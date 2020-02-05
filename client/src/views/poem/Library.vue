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
            <TagButton :text="item._id" button-type='success' v-for="item in top10Tags" :key="item._id"></TagButton>
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
              <TagButton :text="tag" button-type='success' v-for="tag in scope.row.tags" :key="tag"></TagButton>
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

  <div class="mobile-all">
      <div class="mobile-tip">
        文库大全
      </div>
      <div class="mobile-top">
        <el-card class="one-card website-info">
          <div slot="header">
            <span>网站信息</span>
          </div>
          <div>
            <p class="all-poetry">本网站共收录：<span class="poem-count">{{poemCount}}</span>首诗词</p>
            <p>本网站共收录：<span class="author-count">{{authorCount}}</span>位诗人</p>
          </div>
        </el-card>
<!--        移动端去掉10大高产诗人-->
        <el-card class="one-card popular-words">
          <div slot="header">
            <span>热门词语</span>
          </div>
          <div>
            <TagButton :text="item._id" button-type='success' v-for="item in top10Tags" :key="item._id"></TagButton>
          </div>
        </el-card>
      </div>
      <div class="mobile-main ">
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
              <TagButton :text="tag" button-type='success' v-for="tag in scope.row.tags" :key="tag"></TagButton>
            </template>
          </el-table-column>
        </el-table>
        <div class="mobile-paging-bar">
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="totalCount"
            :page-size="pageSize"
            @current-change="changePage">
          </el-pagination>
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
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
import TagButton from '@/components/TagButton.vue';

export default {
  components: {
    TopBar,
    Footer,
    TagButton,
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

  /*移动端显示*/
  .mobile-all{
    display: none;
  }

  /* 平板电脑和小屏电脑之间的分辨率 */
  @media screen and (min-width: 768px) and (max-width: 979px) {
  }

  /* 横向放置的手机和竖向放置的平板之间的分辨率 */
  @media screen and (max-width: 767px) {

  }

  /* 横向放置的手机及分辨率更小的设备 */
  @media screen and (max-width: 480px) {
    .all-container{
      display: none;
    }

    .mobile-all{
      display: block;
      border: 1px solid rebeccapurple;
      width: 100%;
      .mobile-top{
        border: 1px solid #AA314D;
        margin: 0 auto;
      }
      .mobile-tip{
        margin: 0 auto;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
      }

      .mobile-main{
        border: 1px solid #139250;
        margin: 0 auto;
      }

      .mobile-aside-type{
        > :nth-child(n){
          font-size: 14px;
          width: 80px;
          padding: 5px 10px;
          float: left;
        }
      }

      .paragraph-table{
        margin: 0 auto;
        > :nth-child(n){
          text-align: center;
        }
      }

      .mobile-paging-bar{
        display: block;
        margin: 0 auto;
        width: 100%;
        margin-top: 10px;
      }
    }

  }
</style>
