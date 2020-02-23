<template>
  <div>
    <div class="video-background">
      <div class="video-foreground" ref="myCamera">
      </div>
    </div>

    <!--    内容-->
    <div>
<!--      <TopBar />-->
    </div>

    <div class="header">
      <div id="title">诗说 <span id="fm-info">FM</span> </div>
      <h4 id="fm-desc">总有一首诗属于现在的你</h4>
    </div>

    <div class="main">
      <div>
        <a herf="javascript:;"
           class="photo-btn animated flipInX"
           id="playBtn"
           @mouseenter="btnMouseenter()" @mouseleave="btnMouseenter()">点拍照</a>
        <a id="changeSong" href="javascript:;" class="change-btn animated flipInY">换一换</a>
      </div>
      <div>
<!--        笑容指数和推荐诗词部分-->
        <div class="smile-and-age">
          <div class="smile">心悦指数：
            <span class="circle">
              <span class="number"> 99</span>
            </span>
          </div>
          <el-divider direction="vertical">123</el-divider>
          <div class="age">猜测年龄：
            <span class="circle">
              <span class="number"> 50</span>
            </span>
          </div>
        </div>
        <div class="recommend-poem">
          <h4 style="color: #C0C4CC">这一刻诗词：</h4>
          <h1>蒌蒿满地芦芽短，正是河豚欲上时</h1>
          <p class="poem-author">——王维《送孟浩然之广陵》</p>
        </div>
      </div>
<!--      音乐播放器部分-->
      <div class="music">
<!--        <audio controls="controls" height="100" width="100">-->
<!--          <source src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3" type="audio/mp3" />-->
<!--          <source src="song.ogg" type="audio/ogg" />-->
<!--          <embed height="100" width="100" src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3" />-->
<!--        </audio>-->
        <Player />
      </div>
    </div>

    <div class="fm-footer">
      <Footer />
    </div>
  </div>

</template>


<script>
import screenfull from 'screenfull';
// import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';
import Webcam from '../../../common/js/webcam';
import Player from '@/components/musicPlayer.vue';
export default {
  name: 'shishuoFMHomePage',
  components: {
    // TopBar,
    Footer,
    Player,
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {
    // 全屏方法
    toggle() {
      const video = document.querySelectorAll('#camera');
      console.log(video);
      screenfull.request(video[0]);
    },
  },
  created() {

  },
  mounted() {
    const mainX = this.$refs.myCamera.getBoundingClientRect().width;
    const mainY = this.$refs.myCamera.getBoundingClientRect().height;
    console.log(mainY);
    Webcam.set({
      width: mainX, // 元素的宽度
      height: mainY, // 元素的宽度
      dest_width: 1280, // 相机的宽度，也就是摄像头的像素，我的Mac Book Pro的摄像头是720万的，所有填写这个数值
      dest_height: 720, // 相机的宽度，也就是摄像头的像素
      image_format: 'jpeg',
      jpeg_quality: 100,
      force_flash: false,
      // flip_horiz: true,
      fps: 45,
    });
    // 把相机挂载到dom上
    // Webcam.attach('.video-foreground');
    console.log(Webcam);
    const video = document.querySelectorAll('video');

    Webcam.on('error', (err) => {
      this.$message({
        type: 'error',
        message: `调用摄像头失败，${err.name || err.message}`,
      });
    });
    // 一些测试性代码
    // video[0].style.width = '320px';
    // video[0].style.height = '640px';

    // console.log(video);
    // const mainX = this.$refs.main.getBoundingClientRect().width;
    // const mainY = this.$refs.main.getBoundingClientRect().height;
    // console.log(mainX);
    // console.log(mainY);
    // const X = mainX / 1280;
    // const Y = mainY / 720;
    // console.log(X);
    // console.log(Y);

    // video[0].style.transform = `scale(${1.5 * X}, ${1.25 * Y})`;
    // document.querySelector('#camera').style.width = mainX;
    // document.querySelector('#camera').style.height = mainY;
    // video[0].style.width = mainX;
    // video[0].style.height = mainY;
  },
};
</script>


<style scoped lang="scss">
  * {
    box-sizing: border-box;
  }

  .video-background {
    background: #000;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -99;
  }

  .video-foreground,
  .video-background video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  /*网站标题*/
  .header{
    position: absolute;
    top: 10%;
    left: 5%;
    width: 33%;
    height: 20%;
    /*background: rgba(0, 0, 0, 0.2);*/
    color: #fff;
    padding: 1rem;
    font-family: Avenir, Helvetica, sans-serif;
    #title{
      font-size: 30px;
    }
    #fm-info{
      color: #f08080;
    }
    #fm-desc{
      color: #ffa07a;
      letter-spacing: 15px;
      position: relative;
      margin-top: 10px;
    }
  }

  /*网站主要的页面*/
  .main{
    position: absolute;
    top: 10%;
    right: 0%;
    width: 35%;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    padding: 1rem;
    font-family: Avenir, Helvetica, sans-serif;
  }

  .photo-btn {
    display: inline-block;
    margin: 0 10px 10px 0;
    padding: 10px 20px;
    border-radius: 3px;
    background-color: #fff;
    color: #4b98a9;
    font-size: 16px;
    cursor: pointer;
    width: 102px;
    text-align:center;
  }
  .photo-btn:hover, .photo-btn:focus {
    background-color: #73d0da;
    color: #fff;
    text-decoration: none;
  }
  .change-btn,{
    display: inline-block;
    padding: 10px 20px;
    border: 2px solid #fff;
    border-radius: 3px;
    color: #fff;
    font-size: 16px;
    width: 102px;
    text-decoration: none;
    margin-left:15px;
    text-align:center;
  }
  .change-btn:hover, .change-btn:focus, {
    border-color: #73d0da;
    color: #73d0da;
  }

  /*网站主部分*/
  .smile-and-age{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    font-size: 24px;
    margin-top: 20px;
    .smile{
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .age{
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .circle{
      border-radius: 50%;
      height: 40px;
      width: 40px;
      display: inline-block;
      background: #FF958A;
      vertical-align: top;
      text-align: center;
      .number{
        display: block;
        color: #FFFFFF;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
    }
  }

  // 推荐诗词
  .recommend-poem{
    margin-top: 20px;
    .poem-author{
      color: #C0C4CC;
      float: right;
    }
  }

  .music{
    margin-top: 150px;
  }

  #vidtop-content {
    top: 0;
    color: #fff;
  }

  .vid-info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 33%;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    padding: 1rem;
    font-family: Avenir, Helvetica, sans-serif;
  }
  .fm-footer{
    background-color: rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100px;
    width: 100%;
    overflow: hidden;
  }

</style>
