<template>
  <!-- Tracks used in this music/audio player application are free to use. I downloaded them from Soundcloud and NCS websites. I am not the owner of these tracks. -->
  <!--  design by: https://codepen.io/himalayasingh/pen/QZKqOX-->
  <div id="app-cover">
    <div id="player">
<!--      向上弹出的部分-->
      <div id="player-track" :class="[isPlay ? 'active' : '']">
        <el-tooltip class="item" effect="light" :content="songTitle" placement="left">
          <div id="album-name" >{{songShowTitle}}</div>
        </el-tooltip>
        <div id="track-name" >{{songAuthor}}</div>
        <div id="track-time"  :class="[trackTimeStatus ? 'active' : '']">
          <div id="current-time" >{{tProgressText}}</div>
          <div id="track-length" >{{tTimeText}}</div>
        </div>
        <div id="s-area"
             ref="sArea"
             @mousemove="showHover($event)"
             @mouseout="hideHover"
             @click="playFromClickedPos">
          <div id="ins-time" ref="insTime" :style="hoverStyle">{{insTimeText}}</div>
          <div id="s-hover" :style="{width: sHoverWidth + 'px'}"></div>
          <div id="seek-bar"  :style="{width: seekBarWidth}"></div>
        </div>
      </div>
<!--      一开始展示的部分-->
      <div id="player-content">
        <div id="album-art" ref="albumArt" :class="[isPlay ? 'active' : '', isBuffering? 'buffering':'']">
          <img :src="songPic" class="active" id="_1">
          <div id="buffer-box">Buffering ...</div>
        </div>
        <audio
          :src="src"
          @timeupdate="updateCurrTime"
          id="myAudioPlayer"
          ref="audioElement">
        </audio>
        <div id="player-controls">
          <div class="control">
            <div class="button" id="play-previous" @click="playPre">
              <i class="el-icon-d-arrow-left"></i>
            </div>
          </div>
          <div class="control">
            <div class="button" id="play-pause-button"  @click="playPause">
<!--              <i class="el-icon-video-pause"></i>-->
              <i :class="[isPlay ? 'el-icon-video-pause' : 'el-icon-video-play']"></i>
            </div>
          </div>
          <div class="control">
            <div class="button" id="play-next" @click="playNext">
              <i class="el-icon-d-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Http from '@/api/http';


export default {
  name: 'musicPlayer',
  props: ['songInfo', 'isPhotoing'],
  data() {
    return {
      // audio: new Audio(), // 直接建立一个audio标签，不用new 对象
      seekT: '',
      seekLoc: '',
      seekBarPos: '',
      cM: '',
      ctMinutes: '',
      ctSeconds: '',
      curMinutes: '',
      curSeconds: '',
      durMinutes: '',
      durSeconds: '',
      playProgress: '',
      bTime: '',
      nTime: 0,
      buffInterval: null,
      tFlag: false,
      // eslint-disable-next-line max-len
      // trackUrl: ['https://music-1251732387.cos.ap-shanghai.myqcloud.com/mp3/1.mp3', 'https://music-1251732387.cos.ap-shanghai.myqcloud.com/mp3/2.mp3', 'https://music-1251732387.cos.ap-shanghai.myqcloud.com/mp3/3.mp3'],

      // 自己加的状态 切换active
      isPlay: false, // 是否正在播放
      isBuffering: false, // 是否在缓冲
      trackTimeStatus: false,
      tProgressText: '00:00', // 总时间
      tTimeText: '00:00', // 当前时间
      seekBarWidth: 0, // 进度条
      insTimeText: '',
      sHoverWidth: 0, // 鼠标悬浮上去的条

      // 歌曲状态
      src: './beyond.mp3', // 播放器的srcUrl
      // songTitle: '光辉岁月外网开发环境12312光辉岁月哈哈收到货后', // 歌曲名字太长
      songTitle: '光辉岁月', // 歌曲名字（真实的歌曲名字）
      songAuthor: 'Beyond', // 歌曲演唱者
      songPic: 'https://shicishuo-1251732387.file.myqcloud.com/assets/beyond.jpg', // 初始化为beyond 光辉岁月
      songInfoNew: this.songInfo, // 保存传过来的props

      // hover的动效的style
      hoverLeft: 0,
      hoverMarginLeft: 0,
      hoverOpacity: '0',
      hoverDisplay: 'none',
    };
  },
  computed: {
    // audio 标签的dom
    audioPlayer() {
      return this.$refs.audioElement;
    },
    sArea() {
      return this.$refs.sArea;
    },
    insTime() {
      return this.$refs.insTime;
    },
    hoverStyle() {
      return {
        left: `${this.hoverLeft}px`,
        marginLeft: `${this.hoverMarginLeft}px`,
        opacity: this.hoverOpacity,
        display: this.hoverDisplay,
      };
    },
    // 用来展示的Title
    songShowTitle() {
      if (this.songTitle.length > 9) {
        return `${this.songTitle.substring(0, 8)}...`;
      }
      return this.songTitle;
    },
    ...mapGetters([
      'currentSongIndex', // 当前播放的音乐位于列表的位置
    ]),
  },
  watch: {
    isPhotoing: {
      handler(nv, ov) {
        if (nv === true) {
          this.$nextTick(() => {
            this.audioPlayer.pause();
          });
        } else {
          this.$nextTick(() => {
            this.audioPlayer.play();
          });
        }
      },
    },
    // 拍照之后传入的props
    songInfo: {
      deep: true,
      handler(nv, ov) {
        this.src = nv.src;
        this.songTitle = nv.title;
        this.songAuthor = nv.author;
        this.songPic = nv.pic;
        this.$nextTick(() => {
          this.audioPlayer.play();
          this.isPlay = true;
        });
      },
    },
    // 用来播放上一首和下一首
    songInfoNew: {
      deep: true,
      handler(nv, ov) {
        this.src = nv.src;
        this.songTitle = nv.title;
        this.songAuthor = nv.author;
        this.songPic = nv.pic;
        this.audioPlayer.play();
      },
    },
  },
  methods: {
    ...mapActions([
      'updateCurrentPlaySongId', // 点击上一首下一首的时候，更新vuex中当前的songId
    ]),
    initPlayer() {
      // 完全不用初始化，vue已经帮我们做掉了
      // this.selectTrack(0);
    },
    // 判断用户是否拍过照片了，播放上一首 下一首的时候需要判断
    isPhoto() {
      if (this.$store.state.faceMusic.trackIds.length === 0) {
        this.$message({
          type: 'warning',
          message: '当前还没有拍照哦，只能播放一首默认歌曲呢。请点击拍照之后才能播放歌曲列表哦',
        });
        return false;
      }
      return true;
    },
    // 上一首音乐
    playPre() {
      if (!this.isPhoto()) {
        return false;
      }
      const idx = this.currentSongIndex - 1;
      if (idx <= -1) {
        this.$message({
          type: 'warning',
          message: '当前音乐是该歌单第一首哦，没有上一首了呢~',
        });
        return false;
      }
      const querySongId = this.$store.state.faceMusic.trackIds[idx].id;
      this.getOneSongById(querySongId);
    },
    // 下一首音乐
    playNext() {
      if (!this.isPhoto()) {
        return false;
      }
      const idx = this.currentSongIndex + 1;
      if (idx > this.$store.state.faceMusic.trackIds.length) {
        this.$message({
          type: 'warning',
          message: '当前音乐是该歌单最后一首了哦，没有下一首了呢~',
        });
        return false;
      }
      const querySongId = this.$store.state.faceMusic.trackIds[idx].id;
      this.getOneSongById(querySongId);
    },
    getOneSongById(songId) {
      const _self = this;
      Http.getOneSongById(songId).then((res) => {
        if (res.data.code === 200) {
          _self.songInfoNew = res.data.songInfo;
          // 播放歌曲
          _self.$nextTick(() => {
            _self.seekBarWidth = 0;
            _self.trackTimeStatus = false;
            _self.tProgressText = '00:00';
            _self.tTimeText = '00:00';
            _self.nTime = 0;
            _self.bTime = new Date();
            _self.bTime = _self.bTime.getTime();
            _self.audioPlayer.play();
            _self.isPlay = true;
            clearInterval(_self.buffInterval);
            _self.checkBuffering();
            // 去更新vuex里的currentPlaySongId
            _self.updateCurrentPlaySongId(songId);
          });
          // 操作结束
        } else {
          _self.$message({
            type: 'warning',
            message: res.data.errorMessage,
          });
        }
      });
    },

    checkBuffering() {
      const _self = this;
      clearInterval(this.buffInterval);
      _self.buffInterval = setInterval(() => {
        if ((_self.nTime === 0) || (_self.bTime - _self.nTime) > 1000) _self.isBuffering = true;
        else _self.isBuffering = false;

        _self.bTime = new Date();
        _self.bTime = _self.bTime.getTime();
      }, 100);
    },
    playPause() {
      const _self = this;
      setTimeout(() => {
        if (_self.audioPlayer.paused) {
          _self.isPlay = true;
          _self.checkBuffering();
          _self.audioPlayer.play();
          console.log(_self.audioPlayer.loop);
          console.log(_self.audioPlayer.duration);
          console.log(_self.audioPlayer.currentTime);
        } else {
          clearInterval(_self.buffInterval);
          _self.isPlay = false;
          _self.isBuffering = false;
          _self.audioPlayer.pause();
        }
      }, 300);
    },
    showHover(event) {
      // console.log('==================开始==========================================================================================');
      // console.log(`this.sArea.getBoundingClientRect().left:${this.sArea.getBoundingClientRect().left}`);
      // console.log(`this.sArea.getBoundingClientRect().right:${this.sArea.getBoundingClientRect().right}`);
      // console.log(`window.pageXOffset长度${window.pageXOffset}`);
      // console.log(`document.documentElement.clientLeft长度${this.sArea.clientLeft}`);
      // console.log(`this.seekBarPos长度${this.seekBarPos}`);
      // console.log(`clientWidth长度${this.sArea.clientWidth}`);
      // console.log(`offsetLeft长度${this.sArea.offsetLeft}`);
      // console.log(`eventevent.clientX偏移量${event.clientX}`);
      // console.log(`this.seekT长度${this.seekT}`);
      // console.log(`this.audioPlayer.duration歌曲长度${this.audioPlayer.duration}`);
      // console.log(`this.seekLoc所占比例${this.seekLoc}`);
      // console.log('==================结束==========================================================================================');

      this.seekBarPos = this.sArea.clientWidth; // 当前进度条的总宽度

      this.seekT = event.clientX - this.sArea.getBoundingClientRect().left;

      this.seekLoc = this.audioPlayer.duration * (this.seekT / this.seekBarPos);

      this.sHoverWidth = this.seekT;

      this.cM = this.seekLoc / 60;

      this.ctMinutes = Math.floor(this.cM);
      this.ctSeconds = Math.floor(this.seekLoc - this.ctMinutes * 60);

      if ((this.ctMinutes < 0) || (this.ctSeconds < 0)) return;

      if ((this.ctMinutes < 0) || (this.ctSeconds < 0)) return;

      if (this.ctMinutes < 10) this.ctMinutes = `0${this.ctMinutes}`;
      if (this.ctSeconds < 10) this.ctSeconds = `0${this.ctSeconds}`;

      // eslint-disable-next-line no-restricted-globals
      if (isNaN(this.ctMinutes) || isNaN(this.ctSeconds)) this.insTimeText = '--:--';
      else this.insTimeText = `${this.ctMinutes}:${this.ctSeconds}`;

      // this.insTime.css({ left: this.seekT, 'margin-left': '-21px' }).fadeIn(0);
      this.hoverLeft = this.seekT;
      this.hoverMarginLeft = -21;
      this.hoverOpacity = '1';
      this.hoverDisplay = 'block';
    },
    hideHover() {
      this.sHoverWidth = 0;
      this.hoverLeft = 0;
      this.hoverMarginLeft = 0;
      this.hoverOpacity = '0';
      this.hoverDisplay = 'none';
    },
    playFromClickedPos() {
      console.log('触发点击事件');
      this.audioPlayer.currentTime = this.seekLoc;
      this.seekBarWidth = this.seekT;
      this.hideHover();
    },
    updateCurrTime() {
      console.log('触发了updateTime');
      this.nTime = new Date();
      this.nTime = this.nTime.getTime();

      if (!this.tFlag) {
        this.tFlag = true;
        this.trackTimeStatus = true;
      }

      this.curMinutes = Math.floor(this.audioPlayer.currentTime / 60);
      this.curSeconds = Math.floor(this.audioPlayer.currentTime - this.curMinutes * 60);

      this.durMinutes = Math.floor(this.audioPlayer.duration / 60);
      this.durSeconds = Math.floor(this.audioPlayer.duration - this.durMinutes * 60);

      this.playProgress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;

      if (this.curMinutes < 10) this.curMinutes = `0${this.curMinutes}`;
      if (this.curSeconds < 10) this.curSeconds = `0${this.curSeconds}`;

      if (this.durMinutes < 10) this.durMinutes = `0${this.durMinutes}`;
      if (this.durSeconds < 10) this.durSeconds = `0${this.durSeconds}`;

      // eslint-disable-next-line no-restricted-globals
      if (isNaN(this.curMinutes) || isNaN(this.curSeconds)) this.tProgressText = '00:00';
      else this.tProgressText = `${this.curMinutes}:${this.curSeconds}`;

      // eslint-disable-next-line no-restricted-globals
      if (isNaN(this.durMinutes) || isNaN(this.durSeconds)) this.tTimeText = '00:00';
      else this.tTimeText = `${this.durMinutes}:${this.durSeconds}`;

      // eslint-disable-next-line no-restricted-globals
      if (isNaN(this.curMinutes) || isNaN(this.curSeconds) || isNaN(this.durMinutes) || isNaN(this.durSeconds)) this.trackTimeStatus = false;
      else this.trackTimeStatus = true;

      this.seekBarWidth = `${this.playProgress}%`;


      if (this.playProgress === 100) {
        this.isPlay = false;
        this.seekBarWidth = 0;
        this.tProgressText = '00:00';
        this.isBuffering = false;
        clearInterval(this.buffInterval);
      }
    },
  },
  created() {

  },
  mounted() {
    // 初始化音乐播放器
    this.initPlayer();
  },
};
</script>

<style scoped lang="scss">
  *:focus
  {
    outline: none;
  }

  body
  {
    font-family: Helvetica, Arial;
    margin: 0;
    background-color: #ffeff5;
  }

  #app-cover
  {
    // 正式环境需要注释这四行
    /*position: absolute;*/
    /*top: 50%;*/
    /*right: 0;*/
    /*left: 0;*/
    /*注释结束*/
    width: 430px;
    height: 100px;
    //margin: -4px auto;
  }

  #bg-artwork
  {
    position: fixed;
    top: -30px;
    right: -30px;
    bottom: -30px;
    left: -30px;
    background-image: url("https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(40px);
    -webkit-filter: blur(40px);
    z-index: 1;
  }

  #bg-layer
  {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    opacity: 0.51;
    z-index: 2;
  }

  #player
  {
    position: relative;
    height: 100%;
    z-index: 3;
  }

  #player-track
  {
    position: absolute;
    top: 0;
    right: 15px;
    left: 15px;
    padding: 13px 22px 12px 184px;
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease top;
    z-index: 1;
    /*opacity: 0;*/
    //top: -92px;
  }

  #player-track.active
  {
    top: -92px;
    /*opacity: 1;*/
  }

  #album-name
  {
    color: #54576f;
    font-size: 17px;
    font-weight: bold;
  }

  #track-name
  {
    color: #acaebd;
    font-size: 13px;
    margin: 2px 0 13px 0;
  }

  #track-time
  {
    height: 12px;
    margin-bottom: 3px;
    overflow: hidden;
  }

  #current-time
  {
    float: left;
  }

  #track-length
  {
    float: right;
  }

  #current-time, #track-length
  {
    color: transparent;
    font-size: 11px;
    background-color: #ffe8ee;
    border-radius: 10px;
    transition: 0.3s ease all;
  }

  #track-time.active #current-time, #track-time.active #track-length
  {
    color: #f86d92;
    background-color: transparent;
  }

  #s-area, #seek-bar
  {
    position: relative;
    height: 4px;
    border-radius: 4px;
  }

  #s-area
  {
    background-color:#ffe8ee;
    cursor: pointer;
  }

  #ins-time
  {
    position: absolute;
    top: -29px;
    color: #fff;
    font-size: 12px;
    white-space: pre;
    padding: 5px 6px;
    border-radius: 4px;
    display:none;
  }

  #s-hover
  {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    opacity: 0.2;
    z-index: 2;
  }

  #ins-time, #s-hover
  {
    background-color: #3b3d50;
  }

  #seek-bar
  {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0;
    background-color: #fd6d94;
    transition: 0.2s ease width;
    z-index: 1;
  }

  #player-content
  {
    position: relative;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 30px 80px #656565;
    border-radius: 15px;
    z-index: 2;
  }

  #album-art
  {
    position: absolute;
    top: -40px;
    width: 115px;
    height: 115px;
    margin-left: 40px;
    transform: rotateZ(0);
    transition: 0.3s ease all;
    box-shadow: 0 0 0 10px #fff;
    border-radius: 50%;
    overflow: hidden;
  }

  #album-art.active
  {
    top: -60px;
    box-shadow: 0 0 0 4px #fff7f7, 0 30px 50px -15px #afb7c1;
  }

  #album-art:before
  {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    width: 20px;
    height: 20px;
    margin: -10px auto 0 auto;
    background-color: #d6dee7;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px #fff;
    z-index: 2;
  }

  #album-art img
  {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: -1;
  }

  #album-art img.active
  {
    opacity: 1;
    z-index: 1;
  }

  #album-art.active img.active
  {
    z-index: 1;
    animation: rotateAlbumArt 3s linear 0s infinite forwards;
  }

  @keyframes rotateAlbumArt
  {
    0%{ transform: rotateZ(0); }
    100%{ transform: rotateZ(360deg); }
  }

  #buffer-box
  {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    height: 13px;
    color: #1f1f1f;
    font-size: 13px;
    font-family: Helvetica;
    text-align: center;
    font-weight: bold;
    line-height: 1;
    padding: 6px;
    margin: -12px auto 0 auto;
    background-color: rgba(255, 255, 255, 0.19);
    opacity: 0;
    z-index: 2;
  }

  #album-art img, #buffer-box
  {
    transition: 0.1s linear all;
  }

  #album-art.buffering img
  {
    opacity: 0.25;
  }

  #album-art.buffering img.active
  {
    opacity: 0.8;
    filter: blur(2px);
    -webkit-filter: blur(2px);
  }

  #album-art.buffering #buffer-box
  {
    opacity: 1;
  }

  #player-controls
  {
    width: 250px;
    height: 100%;
    margin: 0 5px 0 141px;
    float: right;
    overflow: hidden;
  }

  .control
  {
    width: 33.333%;
    float: left;
    padding: 12px 0;
  }

  .button
  {
    width: 26px;
    height: 26px;
    padding: 25px;
    background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button i
  {
    display: block;
    color: #d6dee7;
    font-size: 26px;
    text-align: center;
    line-height: 1;
  }

  .button, .button i
  {
    transition: 0.2s ease all;
  }

  .button:hover
  {
    background-color: #d6d6de;
  }

  .button:hover i
  {
    color: #fff;
  }
</style>
