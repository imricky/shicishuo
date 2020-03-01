<template>
  <div class="cool-exploration-card animated" :class="{ pulse: cardAnimate }"
       @mouseenter="cardMouseenter()" @mouseleave="cardMouseenter()"
        @click="goCoolFunc">
      <el-card  class="box-card">

        <div slot="header" class="card-header">
          <el-avatar shape="square" :size="40" fit="fit" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
          <span class="card-title">{{funcName}}</span>
        </div>

        <div class="content">
          <span class="description">{{funcDesc}}</span>
        </div>
      </el-card>

  </div>

</template>

<script>
export default {
  name: 'CoolExplorationCard',
  data() {
    return {
      cardAnimate: false,
    };
  },
  props: {
    funcName: {
      type: String,
      default: '卡片',
    },
    funcDesc: {
      type: String,
      default: '敬请期待',
    },
    goFunc: {
      type: String,
      default: 'test',
    },
  },
  computed: {},
  methods: {
    cardMouseenter() {
      this.cardAnimate = !this.cardAnimate;
    },
    goCoolFunc() {
      const _self = this;
      if (this.goFunc === 'test') {
        this.$message({
          message: '敬请期待',
          type: 'success',
          duration: 1000,
        });
        return false;
      }
      if (this.goFunc === 'you_draw_i_guess/room-list') {
        // 如果是移动端，那么提示请用电脑打开
        if (this.$isMobile()) {
          this.$message({
            message: '【你画我猜】暂时没有适配移动端哦，请在PC端打开',
            type: 'warning',
            duration: 2000,
          });
          return false;
        }
        if (this.$store.state.user.username === '' || this.$store.state.user.token === '') {
          this.$message({
            message: '【你画我猜】需要登录哦~ 请登录后重试',
            type: 'warning',
            duration: 2000,
          });
          return false;
        }
        this.$router.push(this.goFunc);
        return false;
      }
      if (this.goFunc === 'shishuoFM') {
        // 如果是移动端，那么提示请用电脑打开
        debugger;
        if (this.$isMobile()) {
          this.$message({
            message: '【诗说FM】暂时没有适配移动端哦，请在PC端打开',
            type: 'warning',
            duration: 2000,
          });
          return false;
        }
        this.$message({
          message: '该功能会调用您的摄像头进行人脸识别，但是完全不会存储您的图像,请放心使用哦',
          type: 'warning',
          duration: 4000,
          // onClose() {
          //   _self.$router.push(_self.goFunc);
          //   return false;
          // },
        });
      }
      this.$router.push(this.goFunc);
    },
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .cool-exploration-card{
    border: 1px solid #FDE2E2;
    cursor: pointer;
  }
  .box-card{
  }
  .card-header{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .card-title{
    font-size: 20px;
    font-weight: bold;
    padding-left: 30px;
  }
  .content{
    .description{
      /*font-size: 12px;*/
      margin-top: 10px;
    }
  }
</style>
