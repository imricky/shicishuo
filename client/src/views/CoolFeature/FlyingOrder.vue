<template>
  <div>
    <TopBar />
    <div class="search-container">
      <!--    飞花令输入框-->
      <div class="common input">
        <el-card shadow="always" >
          <p>飞花令关键词：</p>
          <span class="search">
            <el-input
              placeholder="请输入内容"
              v-model="input"
              clearable
              prefix-icon="el-icon-reading"
              class="input-box">
            </el-input>
            <el-button
             type="primary"
             icon="el-icon-search"
             @click="searchWord">
              搜索
            </el-button>
          </span>

        </el-card>
      </div>
      <!--    常用关键词-->
      <div class="common common-words">
        <el-card shadow="always" >
          <p>常见飞花令：</p>
          <el-button>花</el-button>
          <el-button type="primary">月</el-button>
          <el-button type="success" icon="el-icon-star-off">云</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </el-card>
      </div>
      <!--    展示列表-->
      <div class="common all-list">
        <el-divider content-position="left">搜索结果&nbsp;<i class="el-icon-notebook-2"></i></el-divider>
        <el-card shadow="always">
          <div v-for="p in paragraphsList" :key="p.paragraph">
            <div class="paragraph" >
              <span class="verse">{{p.paragraph}}</span>
              <span>
              <span>——</span>&nbsp;
              <span class="author">{{p.author}}</span>
              <span class="from">《{{p.title}}》</span>
            </span>
            </div>
            <el-divider></el-divider>
          </div>
        </el-card>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          @current-change="changePage"
          :current-page="currentPage"
          class="paging-bar">
        </el-pagination>
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
  name: 'FlyingOrder',
  components: {
    TopBar,
    Footer,
  },
  data() {
    return {
      input: '',
      paragraphsList: [], // 飞花令搜索结果 10条记录
      totalCount: 1000,
      currentPage: 1, // 当前页数
    };
  },
  computed: {},
  methods: {
    async searchWord() {
      const poems = await Http.flyingOrderSearch(this.input);
      this.totalCount = poems.data.data.total;
      const _self = this;
      // 如果查询有记录
      if (poems.data.data.total > 0) {
        this.paragraphsList = poems.data.data.hits.reduce((total, curValue, curIndex, arr) => {
          const obj = Object.create(null);
          obj.paragraph = this.findParagraphs(curValue._source.paragraphs, _self.input);
          obj.title = curValue._source.title;
          obj.author = curValue._source.author;
          total.push(obj);
          return total;
        }, []);
      }
    },
    // 从N句诗里，找到含有关键词的一句诗词，并返回
    findParagraphs(arr, keyword) {
      let res = '';
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes(keyword)) {
          res = arr[i].toString();
          break;
        }
      }
      return res;
    },

    changePage(page) {
      this.currentPage = page;
      const _self = this;
      Http.flyingOrderSearch(this.input, page).then((res) => {
        if (res.data.data.total > 0) {
          this.paragraphsList = res.data.data.hits.reduce((total, curValue, curIndex, arr) => {
            const obj = Object.create(null);
            obj.paragraph = this.findParagraphs(curValue._source.paragraphs, _self.input);
            obj.title = curValue._source.title;
            obj.author = curValue._source.author;
            total.push(obj);
            return total;
          }, []);
        }
        // 翻页时直接跳到顶部
        window.scrollTo(0, 0);
      });
    },
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .search-container{
    max-width: 1000px;
    border: 1px solid #DCDFE6;
    background-color: #E9EEF3;
    color: #333;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    margin: 0 auto;
    margin-top: 20px;
  }
  .common{
    margin: 0 20px;
  }
  .search{
    display: flex;
    justify-content: center;
    align-items: center;
    .input-box{
      margin-right: 20px;
    }
  }
  .common-words{
    margin-top: 10px;
  }
  .all-list{
    margin-top: 10px;
    .paragraph{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .verse{
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .paging-bar{
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
