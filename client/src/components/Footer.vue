<template>
  <div class="footer">
    <el-container>
      <el-footer>
        <div class="copy-right">
          <span style="margin-right: 10px;">© 2019 </span>
          <el-link type="primary">诗词说</el-link>
          <el-divider direction="vertical"></el-divider>
          <span class="my-footer-avatar"> <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar> </span>
          <el-link class="my-footer-authorName" href="https://github.com/imricky" target="_blank">Ricky</el-link>
        </div>
        <div class="power-by">
          <span class="power-by-word">Power by</span>
          <el-link icon="el-icon-edit"><span class="vue">Vue</span></el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link><i class="el-icon-view el-icon--right"></i><span class="express">Express</span> </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link><i class="el-icon-view el-icon--right"></i><span class="mongodb">MongoDB</span> </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link><i class="el-icon-view el-icon--right"></i><span class="redis">Redis</span> </el-link>
          <el-divider direction="vertical"></el-divider>
          <el-link><i class="el-icon-view el-icon--right"></i><span class="echarts">Echarts</span> </el-link>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Footer',
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
  .footer{
    max-width: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 10px;

    .copy-right{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px 0;
      .my-footer-authorName{
        padding: 0 10px;
        color: #409EFF;
      }
    }

    .power-by{
      margin: 5px 0;
      .power-by-word{
        margin-right: 10px;
        color: #F56C6C;
        font-weight: bold;
      }
      .vue:hover{
        color: #41B883;
      }
      .express:hover{
        color: #909399;
      }
      .mongodb:hover{
        color: #139250;
      }
      .redis:hover{
        color: #D92C21;
      }
      .echarts:hover{
        color: #AA314D;
      }
    }
  }
  .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    min-height: 80px;
  }

</style>
