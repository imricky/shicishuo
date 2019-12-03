<template>
  <div class="daily-poem">
  <TopBar />
  <el-container>
    <el-main class="main">
          <PoemCard :poemCardData="poemCardData"/>
<!--      <el-aside class="aside">-->
<!--        123dasldasd-->
<!--        sdhjkasdhjaksdjh-->
<!--      </el-aside>-->
    </el-main>
  </el-container>
    <Footer />
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import PoemCard from '@/components/PoemCard';
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
import Http from '@/api/http';
export default {
  components: {
    PoemCard,
    TopBar,
    Footer,
  },
  name: 'DailyPoem',
  data() {
    return {
      poemCardData: {},
    };
  },
  computed: {},
  methods: {
    async getDailyPoem() {
      const res = await Http.getDailyPoem();
      return res;
    },
  },
  created() {
    this.getDailyPoem().then((res) => {
      // eslint-disable-next-line prefer-destructuring
      this.poemCardData = res.data[0];
      // console.log(res);
    });
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .daily-poem{
    max-width: 1040px;
    border: 1px solid indianred;
    background: #F56C6C;
    margin: 0 auto;
    margin-top: 20px;
  }
  .main{
    border: 1px solid rebeccapurple;
    background-color: #E9EEF3;
    color: #333;
    margin: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*TODO: 需要媒体查询,先去掉高度,不然会出现滚动条，不好看*/
    /*height: 460px;*/
  }

</style>
