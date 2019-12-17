<template>
  <div>
  <div>
    <TopBar />
  </div>
  <div class="all-container">
    <el-container>
      <el-aside class="aside-container">
        <el-collapse accordion v-model="activeNames" :change="changeCollapse">
          <el-collapse-item name="1">
            <template slot="title">
<!--              TODO: 更改图标-->
              <span class="aside-title">标签 Tags</span><i class="header-icon el-icon-info"></i>
            </template>
            <div class="aside-type">
              <el-link
                v-for="tag in top20Tags"
                :key="tag._id"
                @click="searchListByTag(tag._id)">
                {{ tag._id }}
              </el-link>
            </div>

          </el-collapse-item>

          <el-collapse-item name="2">
            <template slot="title">
              <span class="aside-title">作者 Feedback</span><i class="header-icon el-icon-info"></i>
            </template>
            <div class="aside-type">
              <el-link
                v-for="author in top20Authors"
                :key="author._id"
                @click="searchListByAuthor(author._id)">
                {{ author._id }}
              </el-link>
            </div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <span class="aside-title">朝代 Efficiency</span><i class="header-icon el-icon-info"></i>
            </template>
            <div class="aside-type">
              <el-link >唐</el-link>
              <el-link >宋</el-link>
              <el-link >元</el-link>
              <el-link >明</el-link>
              <el-link >清</el-link>
            </div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template slot="title">
              <span class="aside-title">形式 Controllability</span><i class="header-icon el-icon-info"></i>
            </template>
            <div class="aside-type">
              <el-link href="https://element.eleme.io" target="_blank">test1</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test2</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test3</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test4</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test5</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test6</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test7</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test8</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test7</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test8</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test7</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test8</el-link>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-main class="main-container">
        <div><i class="el-icon-s-promotion"></i> 点击左侧标签，探索你的爱❤️</div>
        <el-table
          :data="poemList"
          style="width: 100%">
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
          @current-change="changePage"
          :current-page="currentPage">
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
  name: 'ExploreGoodPoetry',
  components: {
    TopBar,
    Footer,
  },
  data() {
    return {
      activeNames: '1', // 激活的手风琴
      top20Tags: [],
      top20Authors: [],
      currentClickType: '', // 当前选择的是哪一个种类,哪一个标签
      poemList: [], // 右侧诗词的列表
      totalCount: 100, // 分页条的总数量
      currentTag: '', // 当前选中的标签
      currentPage: 1, // 当前页数
      currentAuthor: '', // 当前选中的作者
    };
  },
  computed: {},
  methods: {
    async exploreGoodPoemAll() {
      const res = await Http.exploreGoodPoemAll();
      console.log(res);
      return res;
    },
    searchListByTag(tag) {
      this.currentTag = tag; // 当前选中的tag，用于分页的时候带上
      this.currentPage = 1; // 切换标签的时候，将分页条设置为1
      Http.getPoemsByTags(tag).then(((res) => {
        this.poemList = res.data.data.res;
        this.totalCount = res.data.data.totalCount;
      }));
    },
    searchListByAuthor(author) {
      this.currentAuthor = author; // 当前选中的author，用于分页的时候带上
      this.currentPage = 1; // 切换标签的时候，将分页条设置为1
      Http.getPoemsByAuthor(author).then(((res) => {
        this.poemList = res.data.data.res;
        this.totalCount = res.data.data.totalCount;
      }));
    },
    changePage(page) {
      if (this.activeNames === '1') {
        Http.getPoemsByTags(this.currentTag, page).then(((res) => {
          this.poemList = res.data.data.res;
          this.totalCount = res.data.data.totalCount;
          this.currentPage = page; // 将分页条的页数等于当前页
        }));
      } else if (this.activeNames === '2') {
        Http.getPoemsByAuthor(this.currentAuthor, page).then(((res) => {
          this.poemList = res.data.data.res;
          this.totalCount = res.data.data.totalCount;
          this.currentPage = page; // 将分页条的页数等于当前页
        }));
      }
    },
    changeCollapse(activeItem) {
      this.activeNames = activeItem;
    },
  },
  created() {
    this.exploreGoodPoemAll().then((res) => {
      this.top20Tags = res.data.data.top20Tags;
      this.top20Authors = res.data.data.top20Authors;
    });
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">

  .aside-title{
    padding: 0 10px;
    font-size: 15px;
  }
  .aside-type{
    /*display: flex;*/
    /*justify-content: flex-start;*/
    float: left;
    > :nth-child(n){
      font-size: 14px;
      width: 50px;
      padding: 5px 10px;
      float: left;
    }
  }

  .main-container{
    border: 1px solid #409EFF;
    margin-left: 20px;
  }
  .paragraph-table{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
