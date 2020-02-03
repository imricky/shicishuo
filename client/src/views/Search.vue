<template>
  <div>
    <TopBar />
    <div class="search-container">
<!--      作者-->
      <div class="author">
<!--        头像栏-->
        <div class="avatar">
          <el-avatar shape="square" :size="100" fit="contain" :src="url" ></el-avatar>
        </div>
<!--        作者信息栏-->
        <div class="author-info">
          <p class="author-name">{{author.name}}</p>
          <p class="author-desc">{{author.desc}}</p>
        </div>
      </div>
<!--      标签-->
      <div class="tags">
        <div class="tag-desc">
          相关标签
          <i class="el-icon-magic-stick"></i>
          <i class="el-icon-receiving"></i>
        </div>
        <div class="multi-tag">
          <TagButton :text="tag" v-for="tag in tags" :key="tag"></TagButton>
        </div>
      </div>
<!--      诗词-->
      <div class="poems" >
        <div class="poem-card" v-for="poem in poems" :key="poem.paragraphs[0]">
          <div class="poem-container">
            <p class="poem-title">{{poem.title}}</p>
            <p class="poem-author">{{poem.author}}</p>
            <div class="poem-paragraphs">
              <p v-for="o in poem.paragraphs" :key="o" class="text item">
                {{ o }}
              </p>
            </div>
            <p class="poem-tag">
              <TagButton :text="tag" button-type='success' v-for="tag in poem.tags" :key="tag" class="poem-every-tag"></TagButton>
            </p>

          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          @current-change="changePage"
          :current-page="currentPage">
        </el-pagination>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import Http from '@/api/http';
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
import TagButton from '@/components/TagButton.vue';

export default {
  name: 'Search',
  components: {
    TopBar,
    Footer,
    TagButton,
  },
  data() {
    return {
      keyword: '',
      author: {},
      tags: [],
      poems: [],
      url: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      totalCount: 1000,
      currentPage: 1, // 当前页数
    };
  },
  computed: {},
  methods: {
    // TODO: 高亮搜索关键词
    async search(keyword, page) {
      const result = await Http.search(keyword, page);
      return result.data;
    },
    searchAndRefresh() {
      const _self = this;
      this.search(this.keyword).then((res) => {
        if (res.code === 200) {
          // 作者
          if (res.data.authors.total > 0) {
            // eslint-disable-next-line prefer-destructuring
            _self.author = res.data.authors.hits[0]._source;
          }

          // 标签
          if (res.data.tags.total > 0) {
            let temp = res.data.tags.hits.reduce((total, curValue, curIndex, arr) => {
              total.push(...curValue._source.tags);
              return total;
            }, []);
            temp = [...new Set(temp)]; // 去重
            temp = temp.length > 10 ? temp.slice(0, 10) : temp; // 截取前10个
            _self.tags = temp;
          }

          // 诗句
          if (res.data.poems.total > 0) {
            const temp = res.data.poems.hits.reduce((total, curValue, curIndex, arr) => {
              total.push(curValue._source);
              return total;
            }, []);
            this.poems = temp;
            this.totalCount = res.data.poems.total;
          }

          // console.log(this.author);
          // console.log(this.tags);
          // console.log(this.poems);
        }
      });
    },
    changePage(page) {
      this.currentPage = page;
      Http.search(this.keyword, page).then((res) => {
        const temp = res.data.data.poems.hits.reduce((total, curValue, curIndex, arr) => {
          total.push(curValue._source);
          return total;
        }, []);
        this.poems = temp;
        // 翻页时直接跳到顶部
        window.scrollTo(0, 0);
      });
    },
  },
  created() {
    this.keyword = this.$route.query.keyword;
    this.searchAndRefresh();
  },
  mounted() {
  },
  watch: {
    $route(route) {
      console.log(route);
      this.keyword = route.query.keyword;
      this.searchAndRefresh();
    },
  },
};
</script>

<style scoped lang="scss">
  .search-container{
    max-width: 1000px;
    /*border: 1px solid #DCDFE6;*/
    /*background-color: #E9EEF3;*/
    color: #333;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    margin: 0 auto;
    margin-top: 20px;
  }
  .author{
    width: 100%;
    height: 120px;
    border: 3px solid #DCDFE6;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .avatar{
      /*border: 1px solid red;*/
      margin-left: 20px;
    }
    .author-info{
      margin: 0 20px;
      /*border: 1px solid #DCDFE6;*/
      max-width: 700px;
      .author-name{
        font-size: 30px;
        font-weight: bold;
        margin: 0 0;
      }
      .author-desc{
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box; //作为弹性伸缩盒子模型显示。
        -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
        -webkit-line-clamp:2; //显示的行
      }
    }
  }
  .tags{
    width: 100%;
    height: 60px;
    border: 3px solid #DCDFE6;
    border-radius: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .tag-desc{
      /*border: 1px solid salmon;*/
      width: 100px;
      font-weight: bold;
      margin-left: 20px;
    }
    .multi-tag{
      margin: 0 20px 0 12px;
      /*border: 1px solid goldenrod;*/
      max-width: 700px;
      .every-tag{
        margin-right: 10px;
      }
    }
  }
  .poems{
    width: 100%;
    min-height: 400px;
    border: 3px solid #DCDFE6;
    border-radius: 10px;
    margin-top: 10px;
    .poem-card{
      border: 2px solid #DCDFE6;
      background-color: #EDF5FF;
      border-radius: 4px;
      display: flex;
      flex-direction:column;
      /*justify-content: center;*/
      align-items: flex-start;
      margin: 10px 10px;
      .poem-container{
        margin-left: 10px;
      }
      .poem-title{
        font-size: 18px;
        font-weight: bold;
        color: #303133;
        margin-bottom: 5px;
      }
      .poem-author{
        font-size: 12px;
        color: #606266;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .poem-paragraphs{
        font-size: 14px;
        color: #000000;
        margin-top: 10px;
      }
      .poem-tag{
        margin-left: -5px;
      }
      /*调整tag组件默认的8px边距*/
      .poem-every-tag{
        margin-left: 0;
      }
    }
  }
</style>
