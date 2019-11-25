<template>
  <div class="cool-exploration-card">
    <el-card class="box-card" >

      <div slot="header" class="card-header">
        <el-avatar shape="square" :size="40" fit="fit" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
        <span class="card-title">卡片名称</span>
      </div>

      <div class="content">
        <span class="description">关于诗词的可视化探索qweqweqweqweqweqweqweqweqweqweqweqwe</span>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  name: 'CoolExplorationCard',
  data() {
    return {};
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
  .cool-exploration-card{
    border: 1px solid indianred;
  }
  .box-card{
    /*min-width: 300px;*/
    /*width: 480px;*/
  }
  .card-header{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .card-title{
    font-size: 20px;
    padding-left: 20px;
  }
  .content{
    .description{
      /*font-size: 12px;*/
      margin-top: 10px;
    }
    /*display: flex;*/
    /*align-items: flex-start;*/
  }
</style>
