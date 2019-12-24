<template>
  <div>
    <el-button type="success"
               icon="el-icon-goods"
               size="small"
               class="collect-button" @click="collect">收藏</el-button>
  </div>
</template>

<script>
import Http from '@/api/http';

export default {
  name: 'CollectButton',
  data() {
    return {};
  },
  computed: {},
  methods: {
    async collect(poemid) {
      // 如果state里没有值，那么就提示还没有登录，请先登录
      const userid = this.$store.state.user._id;
      if (userid === '') {
        this.$message({
          message: '您还没有登录哦，请先登录后再试',
          type: 'warning',
          duration: 1500,
        });
        return false;
      }
      // const poemid = this.poemCardData._id;
      const res = await Http.collect(userid, poemid);
      if (res.data.code === 200) {
        if (res.data.data.ok === 1 && res.data.data.nModified === 1) {
          this.$message({
            message: '收藏成功',
            type: 'success',
            duration: 1500,
          });
        } else {
          this.$message({
            message: '您已经收藏过了哟~，若要取消收藏，请前往个人中心取消',
            type: 'info',
            duration: 1500,
          });
        }
      } else {
        this.$message({
          message: '收藏失败，服务器错误',
          type: 'error',
          duration: 1500,
        });
      }
    },
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">

</style>
