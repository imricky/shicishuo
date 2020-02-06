<template>
  <div>
    <div>
      <TopBar />
    </div>
    <div class="all-container">
  <el-container>
    <el-main class="main">
      <el-row type="flex" class="row-bg" justify="center" :gutter="40">
        <el-col :span="12"><div class="grid-content bg-purple">
          <CoolExplorationCard
            funcName="飞花令"
            goFunc="flying-order"
            funcDesc="飞花令，原本是古人行酒令时的一个文字游戏，源自古人的诗词之趣，得名于唐代诗人韩翃《寒食》中的名句“春城无处不飞花”。"/>
        </div></el-col>

        <el-col :span="12"><div class="grid-content bg-purple">
          <CoolExplorationCard />
        </div></el-col>
      </el-row>

      <el-row type="flex" class="row-bg" justify="center" :gutter="40">
        <el-col :span="12"><div class="grid-content bg-purple">
          <CoolExplorationCard />
        </div></el-col>

        <el-col :span="12"><div class="grid-content bg-purple">
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
