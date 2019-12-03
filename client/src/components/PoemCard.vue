<template>
  <div class="poem-card">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="top">
        {{poemCardData}}
        <span class="title"> {{poemCardData.title}}</span>
        <span class="author-info">[唐] {{poemCardData.author}}</span>

        <div class="collect-container">
          <el-button type="primary" icon="el-icon-share" size="small" class="collect-button">收藏</el-button>
        </div>
      </div>

      <div v-for="o in poemCardData.paragraphs" :key="o" class="text item">
        {{ o }}
      </div>
      <el-divider></el-divider>
      <div class="tag" v-for="i in poemCardData.tags" :key="i">
        <el-tag>{{i}}</el-tag>
<!--        <el-tag>标签一</el-tag>-->
<!--        <el-tag type="success" @click="test">标签二</el-tag>-->
<!--        <el-tag type="info">标签三</el-tag>-->
<!--        <el-tag type="warning">标签四</el-tag>-->
<!--        <el-tag type="danger">标签五</el-tag>-->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PoemCard',
  props: {
    poemCardData: Object,
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {
    test() {
      console.log(123);
    },
  },
  created() {
    console.log(this.poemCardData);
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .poem-card{
    border: 1px solid rebeccapurple;
    background-color: #E9EEF3;
    color: #333;
    margin: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box-card {
    width: 680px;
    /*height: 320px;*/
  }
  .top{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
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
</style>
