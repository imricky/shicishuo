<template>
  <div>
    <TopBar />
    <div class="search-container mobile-container">
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
          <el-button
            type="primary"
            icon="el-icon-goblet-full"
            v-for="word in commonWord"
            :key="word"
            class="common-word-button"
            @click="getCommonWordList(word)">{{word}}</el-button>
        </el-card>
      </div>
      <!--    展示列表-->
      <div class="common all-list">
        <el-divider content-position="left">搜索结果&nbsp;<i class="el-icon-notebook-2"></i></el-divider>
        <el-card shadow="always">
          <div v-for="p in paragraphsList" :key="p.paragraph" class="animated bounceInDown">
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
      totalCount: 0,
      currentPage: 1, // 当前页数
      commonWord: ['花', '月', '人', '天', '雨', '春', '江'],
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
      let flag = false;
      let res = '';
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes(keyword)) {
          res = arr[i].toString();
          flag = true;
          break;
        }
      }
      if (flag === true) {
        return res;
      }
      // TODO: 优化查找，如果没有找到，那么就不显示，比如查询【后月亦此月】 这一句，只找到一句，其他的都是相关的，不显示
      // 如果没有找到关键字，那么就返回诗词的第一句
      return arr[0];
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

    getCommonWordList(type) {
      Http.getCommonWord(type).then((res) => {
        this.paragraphsList = res.data.data;
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
    margin: 0 auto;
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

  /* 手机以外的分辨率 */
  @media screen and (min-width: 481px) {
    .mobile-container{
      margin-top: 20px;
    }
  }

  /* 横向放置的手机和竖向放置的平板之间的分辨率 */
  @media screen and (max-width: 767px) {

  }

  /* 横向放置的手机及分辨率更小的设备 */
  @media screen and (max-width: 480px) {
    .mobile-container{
      margin-top: 0px;
    }
    .common-word-button{
      margin: 5px 10px;
    }

  }


</style>
