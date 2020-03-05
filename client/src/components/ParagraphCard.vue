<template>
  <div class="paragraph-card">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>每日名句</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class="main-card">
      <el-image
        class="header-image"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        fit="cover"></el-image>
      <div class="paragraph-info">
        <div class="one-paragraph">
<!--          TODO: 诗词移动端自适应，PC端是一行，移动端两行-->
          {{paragraphCardData.content}}
<!--          宝剑锋从磨，梅花香自苦-->
<!--          宝剑锋从磨砺出，梅花香自苦寒来-->
        </div>
        <div class="other">
          <span class="author">—— {{paragraphCardData.poetName}}</span>
          <span class="title">《{{paragraphCardData.poetryName}}》</span>
        </div>
      </div>
    </div>
  </el-card>
  </div>
</template>

<script>
export default {
  name: 'ParagraphCard',
  props: {
    paragraphCardData: Object,
  },
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
    min-height: 200px;
  }
  .box-card {
    /*TODO: 媒体查询，适配不同分辨率*/
    max-width: 680px;
    min-height: 200px;
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

  /*主信息*/
  .main-card{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    /*头像信息*/
    .header-image{
      width: 100px;
      height: 100px;
    }
    /*诗句信息*/
    .paragraph-info{
      margin-left: 20px;
      .one-paragraph{
        font-size: 24px;
        font-weight: bold;
        line-height: 40px;
      }
      .other{
        margin-top: 20px;
        float: right;
        .author{
          color: #606266;
        }
        .title{
          color: #606266;
        }
      }
    }
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
      min-height: 220px;
      min-width: 320px;
    }

  }
</style>
