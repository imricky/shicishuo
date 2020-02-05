<template>
  <div>
    <p class="mobile-title">每日一诗</p>
    <div class="poem-card">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="top">
          <!--        {{poemCardData}}-->
          <span class="title"> {{poemCardData.title}}</span>
          <span class="author-info">[唐] {{poemCardData.author}}</span>
        </div>
        <p v-for="o in poemCardData.paragraphs" :key="o" class="text item">
          {{ o }}
        </p>
        <el-divider></el-divider>
        <div class="tags-and-button">
          <div>
      <span class="tag" v-for="i in poemCardData.tags" :key="i">
        <TagButton :text="i"></TagButton>
      </span>
          </div>

          <div class="collect-container">
            <el-button type="success"
                       icon="el-icon-goods"
                       size="small"
                       class="collect-button" @click="collectPoem">收藏</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Http from '@/api/http';
import TagButton from '@/components/TagButton.vue';

export default {
  name: 'PoemCard',
  components: {
    TagButton,
  },
  props: {
    poemCardData: Object,
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
    collectPoem() {
      const poemid = this.poemCardData._id;
      this.$collect(poemid);
    },
  },
  created() {
    console.log(this.poemCardData);
  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .poem-card{
    border: 1px solid rebeccapurple;
    background-color: #E9EEF3;
    color: #333;
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
  .top{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .tags-and-button{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*margin-bottom: 5px;*/
    .tag{
      float: left;
      margin-bottom: 20px;
      > :nth-child(n){
        margin-left: 5px;
      }
    }
    .collect-container{
      align-self: end;
      .collect-button{
        /*color: #41B883;*/
      }
    }
  }

  .author-info{
    margin-left: 150px;
  }
  .title{
    font-size: 30px;
    font-weight: bold;
  }
  .text {
    font-size: 14px;
    text-align: center;
  }
  .item {
    margin-bottom: 18px;
  }

  /*移动端的一些样式*/
  .mobile-title{
    display: none;
  }
  /* 平板电脑和小屏电脑之间的分辨率 */
  @media screen and (min-width: 768px) and (max-width: 979px) {
  }

  /* 横向放置的手机和竖向放置的平板之间的分辨率 */
  @media screen and (max-width: 767px) {

  }

  /* 横向放置的手机及分辨率更小的设备 */
  @media screen and (max-width: 480px) {
    .mobile-title{
      display: block;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .poem-card{
      /*height: 500px;*/
    }
    .box-card {
      max-width: 340px;
      min-height: 320px;
      min-width: 320px;
    }
    .tags-and-button-mobile{
      display: block;
      color: red;
      width: 100px;
      height: 100px;
      border: 1px solid red;
      z-index: 12312;
      background: #AA314D;
    }

  }

</style>
