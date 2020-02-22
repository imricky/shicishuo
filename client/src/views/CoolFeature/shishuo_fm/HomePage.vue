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
    <div id="vidtop-content">
      <div class="vid-info">
        <h1>诗说FM —— 心灵听见诗</h1>
        <p>一场诗词的盛会</p>
        <p>用你的笑容，推荐适合你的诗句和音乐</p>
        <a href="/500/Use-YouTube-Videos-as-Fullscreen-Web-Page-Backgrounds">Full article</a>
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
export default {
  name: 'shishuoFMHomePage',
  components: {
    // TopBar,
    Footer,
  },
  data() {
    return {};
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
    Webcam.attach('.video-foreground');
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

  .vid-info h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 0;
    line-height: 1.2;
  }

  .vid-info a {
    display: block;
    color: #fff;
    text-decoration: none;
    background: rgba(0, 0, 0, 0.5);
    transition: .6s background;
    border-bottom: none;
    margin: 1rem auto;
    text-align: center;
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
