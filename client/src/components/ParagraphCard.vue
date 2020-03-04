<template>
  <div class="paragraph-card">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
      <div style="width: 100%">
        <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" fit='fill' class="image"></el-image>
      </div>
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </el-card>
  </div>
</template>

<script>
export default {
  name: 'ParagraphCard',
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
  .paragraph-card{
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 680px;
    min-height: 320px;
  }
  .box-card {
    /*TODO: 媒体查询，适配不同分辨率*/
    max-width: 680px;
    min-height: 320px;
    /*是这一行导致了移动端css不出来*/
    min-width: 550px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  /* 横向放置的手机和竖向放置的平板之间的分辨率 */
  @media screen and (max-width: 767px) {

  }

  /* 横向放置的手机及分辨率更小的设备 */
  @media screen and (max-width: 480px) {
    /*.mobile-title{*/
    /*  display: block;*/
    /*  text-align: center;*/
    /*  font-size: 20px;*/
    /*  font-weight: bold;*/
    /*}*/
    .box-card {
      max-width: 340px;
      min-height: 320px;
      min-width: 320px;
    }

  }
</style>
