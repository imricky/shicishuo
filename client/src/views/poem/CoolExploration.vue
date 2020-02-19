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
          <CoolExplorationCard
            funcName="你画我猜"
            goFunc="you_draw_i_guess/room-list"
            funcDesc="开始游戏之时，便是你展现灵魂画工之刻！走心作画，趣味猜题，尽情享受一场属于你的画猜之旅！还可以在绘画中交流感情~"/>
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
    /*border: 1px solid rebeccapurple;*/
    background-color: #FFFFFF;
    /*margin: 10px 20px;*/
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
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /*background-color: #f9fafc;*/
  }

</style>
