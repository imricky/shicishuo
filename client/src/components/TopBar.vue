<template>
  <div class="center">
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">123</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light">123</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div>123</el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light">123</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div>123</el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light">123</div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
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
  .center{
    //height: 100px;
    width: 100%;
    background-color: rebeccapurple;
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
