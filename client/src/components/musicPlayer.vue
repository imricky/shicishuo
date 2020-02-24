<template>
  <!-- Tracks used in this music/audio player application are free to use. I downloaded them from Soundcloud and NCS websites. I am not the owner of these tracks. -->
  <!--  design by: https://codepen.io/himalayasingh/pen/QZKqOX-->
  <div id="app-cover">
    <div id="player">
<!--      向上弹出的部分-->
      <div id="player-track" :class="[isPlay ? 'active' : '']">
        <div id="album-name" >{{albumNameText}}</div>
        <div id="track-name" >{{trackNameText}}</div>
        <div id="track-time"  :class="[trackTimeStatus ? 'active' : '']">
          <div id="current-time" >{{tProgressText}}</div>
          <div id="track-length" >{{tTimeText}}</div>
        </div>
        <div id="s-area"
             @mousemove="showHover($event)"
             @mouseout="hideHover"
             @click="playFromClickedPos">
          <div id="ins-time" >{{insTimeText}}</div>
          <div id="s-hover" :style="{width: seekBarWidth}"></div>
          <div id="seek-bar"  :style="{width: sHoverWidth}"></div>
        </div>
      </div>
<!--      一开始展示的部分-->
      <div id="player-content">
        <div id="album-art" ref="albumArt" :class="[isPlay ? 'active' : '', isBuffering? 'buffering':'']">
          <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg" class="active" id="_1">
          <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_2.jpg" id="_2">
          <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_3.jpg" id="_3">
          <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_4.jpg" id="_4">
          <img src="https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_5.jpg" id="_5">
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
            <div class="button" id="play-previous" @click="selectTrack(-1)">
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
            <div class="button" id="play-next" @click="selectTrack(1)">
              <i class="el-icon-d-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'musicPlayer',
  data() {
    return {
      src: '', // 播放器的src
      audio: new Audio(),
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
      albums: ['Dawn', 'Me & You', 'Electro Boy', 'Home', 'Proxy (Original Mix)'],
      trackNames: ['Skylike - Dawn', 'Alex Skrindo - Me & You', 'Kaaze - Electro Boy', 'Jordan Schor - Home', 'Martin Garrix - Proxy'],
      albumArtworks: ['_1', '_2', '_3', '_4', '_5'],
      // eslint-disable-next-line max-len
      trackUrl: ['https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3', 'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3'],
      currIndex: -1,

      // 自己加的状态 切换active
      isPlay: false, // 是否正在播放
      isBuffering: false, // 是否在缓冲
      trackTimeStatus: false,
      tProgressText: '00:00',
      tTimeText: '00:00',
      seekBarWidth: 0,
      albumNameText: '',
      trackNameText: '',
      insTimeText: '',
      sHoverWidth: 0,
    };
  },
  computed: {
    // audio 标签的dom
    audioPlayer() {
      return this.$refs.audioElement;
    },
  },
  watch: {
    // audio() {
    //   timeupdate
    // },
  },
  methods: {
    initPlayer() {
      this.selectTrack(0);
    },
    selectTrack(flag) {
      if (flag === 0 || flag === 1) ++this.currIndex;
      else --this.currIndex;

      if ((this.currIndex > -1) && (this.currIndex < this.albumArtworks.length)) {
        if (flag === 0) this.isPlay = false;
        else {
          this.isBuffering = false;
          this.isPlay = false;
        }

        const currAlbum = this.albums[this.currIndex];
        const currTrackName = this.trackNames[this.currIndex];
        const currArtwork = this.albumArtworks[this.currIndex];

        this.src = this.trackUrl[this.currIndex];

        this.nTime = 0;
        this.bTime = new Date();
        this.bTime = this.bTime.getTime();

        if (flag !== 0) {
          this.isPlay = true;
          this.audioPlayer.play();
          clearInterval(this.buffInterval);
          this.checkBuffering();
        }

        this.albumNameText = currAlbum;
        this.trackNameText = currTrackName;
        // this.albumArt.find('img.active').removeClass('active'); // 这个暂时不处理
        // document.querySelector(`#${currArtwork}`).addClass('active');
      } else if (flag === 0 || flag === 1) --this.currIndex;
      else ++this.currIndex;
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
      console.log(_self.audio.paused);
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
      this.seekBarPos = this.sArea.offset();
      this.seekT = event.clientX - this.seekBarPos.left;
      this.seekLoc = this.audio.duration * (this.seekT / this.sArea.outerWidth());

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

      this.insTime.css({ left: this.seekT, 'margin-left': '-21px' }).fadeIn(0);
    },
    hideHover() {
      // this.sHover.width(0);

      this.insTime.text('00:00').css({ left: '0px', 'margin-left': '0px' }).fadeOut(0);
    },
    playFromClickedPos() {
      this.audio.currentTime = this.seekLoc;
      // this.seekBar.width(this.seekT);
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
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
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
    padding: 13px 22px 10px 184px;
    background-color: #fff7f7;
    border-radius: 15px 15px 0 0;
    transition: 0.3s ease top;
    z-index: 1;
    top: -92px;
  }

  #player-track.active
  {
    top: -92px;
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
