<template>
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
<!--            <el-tag>{{i}}</el-tag>-->
          <TagButton :text="i"></TagButton>
          <!--        <el-tag>标签一</el-tag>-->
          <!--        <el-tag type="success" @click="test">标签二</el-tag>-->
          <!--        <el-tag type="info">标签三</el-tag>-->
          <!--        <el-tag type="warning">标签四</el-tag>-->
          <!--        <el-tag type="danger">标签五</el-tag>-->
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
    min-width: 650px;
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

</style>
