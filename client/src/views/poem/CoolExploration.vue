<template>
  <div>
    <div>
      <TopBar />
    </div>
    <div class="cool-exploration">
  <el-container>
    <el-main class="main">
      <el-row type="flex" class="row-bg" justify="center" :gutter="40">
        <el-col :span="8"><div class="grid-content bg-purple">
          <CoolExplorationCard />
        </div></el-col>

        <el-col :span="8"><div class="grid-content bg-purple">
          <CoolExplorationCard />
        </div></el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center" :gutter="40">
        <el-col :span="8"><div class="grid-content bg-purple">
          <CoolExplorationCard />
        </div></el-col>

        <el-col :span="8"><div class="grid-content bg-purple">
          <CoolExplorationCard />
        </div></el-col>
      </el-row>
    </el-main>
  </el-container>
</div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import CoolExplorationCard from '@/components/CoolExplorationCard.vue';
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
// TODO:需要加上全屏背景图
export default {
  name: 'CoolExploration',
  components: {
    CoolExplorationCard,
    TopBar,
    Footer,
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

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .cool-exploration{
    max-width: 1000px;
    border: 1px solid rebeccapurple;
    /*background-color: #E9EEF3;*/
    color: #333;
    margin: 0 auto;
    margin-top: 20px;
  }
  .main{
    border: 1px solid rebeccapurple;
    background-color: #E9EEF3;
    color: #333;
    margin: 10px 20px;
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*TODO: 需要媒体查询,先去掉高度,不然会出现滚动条，不好看*/
    /*height: 460px;*/
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
