<template>
  <div class="explore-good-poetry">
    <el-container>
      <el-aside class="aside-container">
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
<!--              TODO: 更改图标-->
              <span class="aside-title">类型 Consistency</span><i class="header-icon el-icon-info"></i>
            </template>
            <div class="aside-type">
              <el-link href="https://element.eleme.io" target="_blank">抒情</el-link>
              <el-link href="https://element.eleme.io" target="_blank">写景</el-link>
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
              <el-link href="https://element.eleme.io" target="_blank">test7</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test8</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test7</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test8</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test7</el-link>
              <el-link href="https://element.eleme.io" target="_blank">test8</el-link>
            </div>

          </el-collapse-item>

          <el-collapse-item>
            <template slot="title">
              <span class="aside-title">作者 Feedback</span><i class="header-icon el-icon-info"></i>
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
          <el-collapse-item>
            <template slot="title">
              <span class="aside-title">朝代 Efficiency</span><i class="header-icon el-icon-info"></i>
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
          <el-collapse-item>
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
      <div v-for="item in 4" :key="item">
        <el-card class="box-card" shadow="hover">

          <div slot="header" class="top">
            <span class="title"> 鸿鹄歌</span>
            <span class="author-info">[两汉] 刘邦</span>

            <div class="collect-container">
              <el-button type="primary" icon="el-icon-share" size="small" class="collect-button">收藏</el-button>
            </div>
          </div>

          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
          <el-divider></el-divider>
          <div class="tag">
            <el-tag>标签一</el-tag>
            <el-tag type="success" @click="test">标签二</el-tag>
            <el-tag type="info">标签三</el-tag>
            <el-tag type="warning">标签四</el-tag>
            <el-tag type="danger">标签五</el-tag>
          </div>
        </el-card>
      </div>

        <el-divider></el-divider>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ExploreGoodPoetry',
  data() {
    return {
      activeNames: ['1'],
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
  .explore-good-poetry{
    max-width: 1000px;
    border: 1px solid rebeccapurple;
    background-color: #E9EEF3;
    color: #333;
    /*margin: 10px 20px;*/
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  .aside-container{
    width: 200px;
    border: 1px solid #E6A23C;
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
  }
  .main-container{
    border: 1px solid #409EFF;
    margin-left: 20px;
    .box-card{
      margin: 20px 0;
    }
    .top{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    /*TODO:把卡片作为一个单独的组件，每页显示10个*/
    .collect-container{
      align-self: flex-start;
    }
    .collect-button{
    }
    .author-info{
      margin-left: 150px;
    }
    .title{
      font-size: 30px;
    }
    .text {
      font-size: 14px;
    }
    .item {
      margin-bottom: 18px;
    }
    .tag{
      float: left;
      margin-bottom: 20px;
      > :nth-child(n){
        margin-left: 5px;
      }
    }
  }
</style>
