<template>
  <div class="daily-poem">
  <el-container>
    <el-main class="main">
          <PoemCard />
<!--      <el-aside class="aside">-->
<!--        123dasldasd-->
<!--        sdhjkasdhjaksdjh-->
<!--      </el-aside>-->
    </el-main>
  </el-container>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import PoemCard from './PoemCard';

export default {
  components: {
    PoemCard,
  },
  name: 'DailyPoem',
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
