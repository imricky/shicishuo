<template>
  <div class="cool-exploration-card animated" :class="{ jello: cardAnimate }"
       @mouseenter="cardMouseenter()" @mouseleave="cardMouseenter()">
      <el-card  class="box-card">

        <div slot="header" class="card-header">
          <el-avatar shape="square" :size="40" fit="fit" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
          <span class="card-title">卡片名称</span>
<!--          <span class="card-title">1</span>-->
        </div>

        <div class="content">
          <span class="description">关于诗词的可视化探索qweqweqweqweqweqweqweqweqweqweqweqwe</span>
<!--          <span class="description">1</span>-->
        </div>
      </el-card>

  </div>

</template>

<script>
export default {
  name: 'CoolExplorationCard',
  data() {
    return {
      cardAnimate: false,
    };
  },
  computed: {},
  methods: {
    cardMouseenter() {
      this.cardAnimate = !this.cardAnimate;
    },
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .cool-exploration-card{
    border: 1px solid indianred;
    max-width: 400px;
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
    font-weight: bold;
    padding-left: 30px;
  }
  .content{
    .description{
      /*font-size: 12px;*/
      margin-top: 10px;
    }
  }
</style>
