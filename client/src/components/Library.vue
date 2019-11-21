<template>
  <div class="library">
    <el-container>
      <el-aside class="aside-container">
        123
      </el-aside>
      <el-main class="main-container">
        123

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
  name: 'Library',
  data() {
    return {
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
  .library{
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
  }
  .main-container{
    border: 1px solid #409EFF;
    margin-left: 20px;
  }
</style>
