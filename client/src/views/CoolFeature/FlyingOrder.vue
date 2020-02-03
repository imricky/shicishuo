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
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
          <div class="paragraph">
            <span class="verse">正是江南好风景，落花时节又逢君。</span>
            <span>
              <span>——</span>&nbsp;
              <span class="author">杜甫</span>
              <span class="from">《江南逢李龟年》</span>
            </span>
          </div>
          <el-divider></el-divider>
          <div class="paragraph">
            <span class="verse">正是江南好风景，落花时节又逢君。</span>
            <span>
              <span>——</span>&nbsp;
              <span class="author">杜甫</span>
              <span class="from">《江南逢李龟年》</span>
            </span>
          </div>
          <el-divider></el-divider>
          <div class="paragraph">
            <span class="verse">正是江南好风景，落花时节又逢君。</span>
            <span>
              <span>——</span>&nbsp;
              <span class="author">杜甫</span>
              <span class="from">《江南逢李龟年》</span>
            </span>
          </div>
        </el-card>
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
      totalCount: 200,
    };
  },
  computed: {},
  methods: {},
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
</style>
