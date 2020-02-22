<template>
    <div class="main" ref="main">
      <div id="camera" ref="camera">123</div>
      <el-button type="primary" @click="toogle">buttonCont</el-button>
    </div>
</template>


<script>
import screenfull from 'screenfull';
import Webcam from '../../../common/js/webcam';
export default {
  name: 'shishuoFMHomePage',
  data() {
    return {};
  },
  computed: {},
  methods: {
    // 全屏方法
    toogle() {
      const video = document.querySelectorAll('#camera');
      console.log(video);
      screenfull.request(video[0]);
    },
  },
  created() {

  },
  mounted() {
    const mainX = this.$refs.main.getBoundingClientRect().width;
    const mainY = this.$refs.main.getBoundingClientRect().height;
    Webcam.set({
      width: mainX, // 元素的宽度
      height: mainY, // 元素的宽度
      dest_width: 1280, // 相机的宽度，也就是摄像头的像素
      dest_height: 720, // 相机的宽度，也就是摄像头的像素
      image_format: 'jpeg',
      jpeg_quality: 100,
      force_flash: false,
      // flip_horiz: true,
      // fps: 45,
    });
    Webcam.attach('.main');
    // eslint-disable-next-line no-undef
    console.log(Webcam);
    const video = document.querySelectorAll('video');
    // video[0].style.width = '320px';
    // video[0].style.height = '640px';

    console.log(video);
    // const mainX = this.$refs.main.getBoundingClientRect().width;
    // const mainY = this.$refs.main.getBoundingClientRect().height;
    console.log(mainX);
    console.log(mainY);
    const X = mainX / 1280;
    const Y = mainY / 720;
    console.log(X);
    console.log(Y);

    // video[0].style.transform = `scale(${1.5 * X}, ${1.25 * Y})`;
    // document.querySelector('#camera').style.width = mainX;
    // document.querySelector('#camera').style.height = mainY;
    // video[0].style.width = mainX;
    // video[0].style.height = mainY;
    Webcam.on('error', (err) => {
      // an error occurred (see 'err')
      console.log(err);
    });
  },
};
</script>


<style scoped lang="scss">
  .main{
    position: relative;
    min-height:100%;
    overflow:hidden;
    border: 3px solid red;
  }

  #camera{
    border: 5px solid green;
    /*width: 1280px;*/
    /*height: 720px;*/
    /*position: absolute;*/
    //z-index: -100;
    object-fit: fill;
    /*object-fit: cover;*/
    /*transform: scale(3);*/
    //transform: translateX(-50%) translateY(-50%);

  }
</style>
