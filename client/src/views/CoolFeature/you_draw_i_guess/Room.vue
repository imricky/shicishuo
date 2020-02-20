<template>
  <div>
    <div class="main" ref="main">
<!--      画笔工具-->
      <div class="paint-tool">
        <div class="top-tool">
          <el-button size="small" icon="el-icon-edit" @click="changePaint" :class="{ 'in-eraser': !eraserFlag }">画笔</el-button>
          <el-button size="small" icon="el-icon-takeaway-box" @click="changeEraser" :class="{ 'in-eraser': eraserFlag }">橡皮擦</el-button>
          <el-button size="small" icon="el-icon-refresh-right" @click="clearCanvas">清除画板</el-button>
        </div>
        <div class="pen-thickness">
<!--          TODO: 怎么选择画笔的高亮-->
          <p>画笔粗细：</p>
          <div class="w1" @click="changePenWidth(1)"></div>
          <div class="w2" @click="changePenWidth(2)"></div>
          <div class="w5" @click="changePenWidth(5)"></div>
          <div class="w10" @click="changePenWidth(10)"></div>
          <div class="w15" @click="changePenWidth(15)"></div>
          <div class="w20" @click="changePenWidth(20)"></div>
        </div>
        <div class="pen-color">
          <p>
            画笔颜色：
          </p>
          <el-color-picker v-model="penColor" @change="changePenColor"></el-color-picker>
        </div>
        <div class="pen-quick">
          <p>快捷方式：</p>
          <div class="pen-type">
            <el-button size="small" icon="el-icon-edit" @click="changeShape('straight')">直线</el-button>
            <el-button size="small" icon="el-icon-takeaway-box" @click="changeShape('rectangle')">矩形</el-button>
            <el-button size="small" icon="el-icon-refresh-right" @click="changeShape('circular')">圆形</el-button>
            <el-button size="small" icon="el-icon-refresh-right" @click="changeShape('triangle')">三角形</el-button>
          </div>
          <div class="pen-type-fill">
            <div class="pen-fill-color-choose">
              是否填充：
              <el-switch
                v-model="fillFlag"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </div>
            <div class="pen-fill-color-choose">
              <p>
                填充颜色：
              </p>
              <el-color-picker v-model="fillColor" @change="changeFillColor"></el-color-picker>
            </div>
          </div>
        </div>
      </div>
<!--      画布-->
      <div class="paint-canvas">
        <canvas
          id="canvas"
          ref="canvas"
          width="850em"
          height="590rem"
          @mousemove="move($event)"
          @mousedown="down($event)"
          @mouseup="up($event)">current stock price: $3.15 +0.15
        </canvas>
        <div id="eraser"></div>
        <div id="cover"></div>
        <span style="display: none" id="dataURI"> dataURI </span>
      </div>
<!--      聊天窗口以及额外信息-->
      <div class="paint-talk">
        <div class="room-info">
          <el-divider content-position="left">房间信息</el-divider>
          <p style="margin-left: 10px">在线人数： <span class="online-people">12</span></p>
          <p style="margin-left: 10px">当前房主： <span class="room-creator">crq</span></p>
        </div>
        <div class="chat">
          <el-divider content-position="left">聊天内容</el-divider>
          <div class="chat-content" ref="chatContent">
            <div class="chat-one-paragraph" v-for="(i,index) in chatList" :key="index">
              <div class="chat-type-word" v-if="i.type === 'word'">
                <div class="chat-time">{{i.time}}</div>
                <div class="chat-message-info">
                  <p class="chat-talk-common chat-spokesperson">
                    {{i.talker}}
                  </p>
                  <p class="chat-talk-common chat-word">{{i.message}}</p>
                </div>
              </div>
              <div class="chat-type-info" v-if="i.type === 'info'">
                <div class="chat-info-time">{{i.time}}</div>
                <div class="chat-info-message">{{i.message}}</div>
              </div>
            </div>
          </div>
          <div class="chat-input">
            <el-input
              :placeholder="chatPlaceholder"
              clearable
              v-model="chatWord"
              @keyup.enter.native="sendMessage">
              <i slot="prefix" class="el-input__icon el-icon-chat-round"></i>
            </el-input>
            <el-button class="chat-send-button" @click="sendMessage">发送</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="top">
      <div class="top-inner">
        <p class="question-title">目标诗句：</p>
        <div>
          <el-input
            placeholder="请输入诗句需要猜测的诗句"
            clearable
            suffix-icon="el-icon-reading"
            v-model="questionPoem"
            class="question-poem">
          </el-input>
        </div>
        <el-button type="primary" class="question-create" @click="questionCreate">创建</el-button>
        <el-button >自动生成目标句诗</el-button>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-inner">
        <p class="answer-title">提交答案：</p>
        <div>
          <el-input
            placeholder="答案诗句"
            clearable
            suffix-icon="el-icon-reading"
            v-model="answerPoem"
            class="answer-poem">
          </el-input>
        </div>
        <el-button type="primary" class="answer-submit" @click="submitAnswer">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import io from 'socket.io-client';
import Http from '@/api/http';
// eslint-disable-next-line no-extend-native,func-names
Date.prototype.Format = function (fmt) { // author: meizz
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  // eslint-disable-next-line no-restricted-syntax
  for (const k in o) if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
  return fmt;
};
export default {
  name: 'Room',
  data() {
    return {
      questionPoem: '', // 问题诗句
      answerPoem: '', // 答案诗句
      penColor: '#0C1D34', // 画笔的选择颜色
      fillFlag: false, // 快捷方式的是否填充
      fillColor: '#409EFF', // 快捷方式的填充颜色
      isAllowPaint: true, // 是否允许绘画
      isDraw: false, // canvas是否正在绘画
      eraserFlag: false, // 是否位于橡皮擦模式
      shape: 'pen', // 画笔模式，默认是pen（即为画笔，还有三角形，矩形等等）
      penX: 0, // 画笔的初始X位置
      penY: 0, // 画笔的初始的Y位置
      img: '', // 保存画图的img
      url: '', // 画图的url
      chatWord: '', // 聊天发送的话
      src: '', // img的src，用来监听url
      chatPlaceholder: '请输入内容...',
    };
  },
  computed: {
    // 画板
    canvas() {
      return this.$refs.canvas;
    },
    // 2d 对象
    ctx() {
      return this.$refs.canvas.getContext('2d');
    },
    width() {
      return this.$refs.canvas.width;
    },
    height() {
      return this.$refs.canvas.height;
    },
    ...mapGetters([
      'chatList', // 你画我猜聊天列表
    ]),
  },
  methods: {
    ...mapActions([
      'updateChatList', // 更新聊天列表
      'updateRoomInfoCreator', // 更新房间信息
      'updateRoomOnlineList', // 更新在线人数
      'removeRoomOnlineListWithParticipant', // 移除参与者
      'leaveRoom', // 离开时直接清空vuex里的roomInfo信息和chats信息
    ]),
    // 计算canvas和屏幕的位置关系，方便判断鼠标是否在画板上，以及画板的位置
    windowToCanvas(canvas, x, y) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: x - rect.left * (canvas.width / rect.width),
        y: y - rect.top * (canvas.height / rect.height),
      };
    },
    // 清除画布
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.url = null;
      this.img = null;
      this.ctx.beginPath(); // 清空画布之后需要调用这个方法进行下一次绘制
      // 触发websocket事件
      const data = {
        dataURL: this.canvas.toDataURL(),
        roomNo: this.$store.state.roomInfo.roomNo,
      };
      this.$socket.emit('dataURI', data);
    },
    // 启用橡皮擦
    changeEraser() {
      this.eraserFlag = true;
    },
    // 启用画笔
    changePaint() {
      this.eraserFlag = false;
      this.shape = 'pen';
    },
    // 改变画笔粗细
    changePenWidth(width) {
      this.ctx.lineWidth = width;
    },
    // 改变画笔颜色
    changePenColor(color) {
      this.ctx.strokeStyle = color; // 轮廓颜色
    },
    // 改变填充颜色
    changeFillColor(color) {
      this.ctx.fillStyle = color; // 填充颜色
    },
    // 改变画笔形状
    changeShape(shape) {
      this.shape = shape;
    },
    // // 橡皮擦功能
    eraserFunc(x, y) {
      // 保存场景
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(x, y, 10, 0, Math.PI * 2, false);
      this.ctx.clip();
      this.ctx.clearRect(0, 0, this.width, this.height);
      // 触发websocket事件
      const data = {
        dataURL: this.canvas.toDataURL(),
        roomNo: this.$store.state.roomInfo.roomNo,
      };
      this.$socket.emit('dataURI', data);
      // 还原场景
      this.ctx.restore();
    },

    // 绘画核心方法
    draw(e) {
      const ele = this.windowToCanvas(this.canvas, e.clientX, e.clientY);
      const { x, y } = ele;
      if (this.shape === 'pen') {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      } else if (this.shape === 'rectangle') {
        // 矩形
        this.ctx.beginPath();
        this.ctx.moveTo(this.penX, this.penY);
        this.ctx.lineTo(this.penX, y); //
        this.ctx.lineTo(x, y);
        this.ctx.lineTo(x, this.penY);
        this.ctx.closePath();
        if (this.fillFlag) {
          this.ctx.fill();
        } else {
          this.ctx.stroke();
        }
      } else if (this.shape === 'straight') {
        // 直线
        this.ctx.beginPath();
        this.ctx.moveTo(this.penX, this.penY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      } else if (this.shape === 'circular') {
        // 圆形
        const disX = x - this.penX;
        const disY = y - this.penY;
        const radius = Math.sqrt(disX * disX + disY * disY) / 2;
        const radiusX = this.penX + (x - this.penX) / 2;
        const radiusY = this.penY + (y - this.penY) / 2;

        this.ctx.beginPath();
        this.ctx.arc(radiusX, radiusY, radius, 0, Math.PI * 2, true);
        if (this.fillFlag) {
          this.ctx.fill();
        } else {
          this.ctx.stroke();
        }
      } else if (this.shape === 'triangle') {
        // 三角形
        this.ctx.beginPath();
        this.ctx.moveTo(this.penX, this.penY);
        this.ctx.lineTo(this.penX, y);
        this.ctx.lineTo(x, y);
        this.ctx.closePath();
        if (this.fillFlag) {
          this.ctx.fill();
        } else {
          this.ctx.stroke();
        }
      }
      // 触发websocket事件
      const data = {
        dataURL: this.canvas.toDataURL(),
        roomNo: this.$store.state.roomInfo.roomNo,
      };
      this.$socket.emit('dataURI', data);
    },
    down(e) {
      if (!this.currentUserIsCreator()) {
        const roomCreator = this.$store.state.roomInfo.creator;
        this.$message({
          type: 'error',
          message: `只有当前房间的创建者 【${roomCreator}】 才能绘画哦~`,
          duration: 2000,
        });
        return false;
      }
      this.isDraw = true;
      const ele = this.windowToCanvas(this.canvas, e.clientX, e.clientY);
      const { x, y } = ele;

      // 鼠标按下的时候记录画笔的位置
      this.penX = x;
      this.penY = y;
      if (this.url) {
        this.img = new Image();
        this.img.src = this.url;
      }
      // 画笔, 必须要写在down的时候
      if (this.shape === 'pen') {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
      }
    },
    move(e) {
      const ele = this.windowToCanvas(this.canvas, e.clientX, e.clientY);
      const { x, y } = ele;
      const nowX = e.offsetX;
      const nowY = e.offsetY;
      if (this.isDraw) {
        if (this.eraserFlag === true) {
          this.eraserFunc(x, y);
        } else {
          // 每次画图必须清空区域，再加载最后的一个图片作为背景图
          this.ctx.clearRect(0, 0, this.width, this.height);
          // 必须要加上，不然不能保存之前的绘制
          if (this.url) {
            this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
          }
          // 绘画核心方法
          this.draw(e);
        }
      }
    },

    up(e) {
      this.isDraw = false;
      this.url = this.canvas.toDataURL();
    },
    drawInCanvas(src) {
      // console.log(src);
      const _self = this;
      const img = new window.Image();
      img.onload = () => {
        _self.ctx.clearRect(0, 0, this.width, this.height);
        _self.ctx.drawImage(img, 0, 0);
      };
      img.src = src;
    },

    // 判断当前登录用户是否为房间的创建者,返回true或者false
    currentUserIsCreator() {
      const currentLoginUser = this.$store.state.user.username;
      const roomCreator = this.$store.state.roomInfo.creator;
      return currentLoginUser === roomCreator;
    },

    // 关于答题的方法：
    // 答题者问题创建：
    questionCreate() {
      // 首先判断登录用户是否为房间的创建者，是则可以创建，不然不可以
      if (!this.currentUserIsCreator()) {
        const roomCreator = this.$store.state.roomInfo.creator;
        this.$message({
          type: 'error',
          message: `只有当前房间的创建者 【${roomCreator}】 才能创建问题哟~`,
          duration: 2000,
        });
        return false;
      }

      if (this.questionPoem === '') {
        // TODO: 优化，问题为空时，弹出提示之后，把光标定位到输入框
        this.$message({
          type: 'warning',
          message: '你的问题诗句为空，请输入在输入框中输入问题诗句之后再点击确定',
          duration: 2000,
        });
        return false;
      }
      const { roomNo } = this.$store.state.roomInfo;
      if (roomNo === '') {
        this.$message({
          type: 'warning',
          message: '你进入房间的方式不正确，请从房间列表中进入',
          duration: 3000,
        });
        return false;
      }
      Http.updateRoomQuestion(roomNo, this.questionPoem).then((res) => {
        if (res.data.data.nModified === 0) {
          this.$message.error('创建问题失败');
        } else {
          // 通知其它客户端，问题已创建，可以随时开始答题
          const obj = {
            roomNo,
          };
          this.$socket.emit('questionReady', obj);
          this.clearCanvas();
          this.$message({
            type: 'success',
            message: '创建问题成功! 可以开始作画了！',
            duration: 3000,
          });
        }
      });
    },
    // 回答问题
    submitAnswer() {
      if (this.currentUserIsCreator()) {
        this.$message({
          type: 'error',
          message: '创建者不能回答自己回答问题的哦~',
          duration: 2000,
        });
        return false;
      }
      if (this.answerPoem === '') {
        this.$message({
          type: 'warning',
          message: '你提交的答案为空哦，请输入答案之后再提交',
        });
        return false;
      }
      const { roomNo } = this.$store.state.roomInfo;
      const { username } = this.$store.state.user;
      Http.submitAnswer(roomNo, this.answerPoem, username).then((res) => {
        console.log(res);
      });
    },

    // 聊天方面的功能
    sendMessage() {
      if (this.chatWord === '') {
        this.$message({
          type: 'warning',
          message: '请输入聊天内容~',
          duration: 2000,
        });
        return false;
      }
      const { roomNo } = this.$store.state.roomInfo;
      const { username } = this.$store.state.user;
      const obj = {
        username,
        roomNo,
        chatWord: this.chatWord,
      };
      this.$socket.emit('sendMessage', obj);
      this.chatWord = ''; // 发送之后置空
    },
  },
  sockets: {
    test1(msg) {
      console.log(`socket connected${msg}`);
    },
    dataURI(dataURI) {
      // this.drawInCanvas(dataURI); // 不能一直调用，否则会屏幕一直闪烁
      this.src = dataURI;
    },
    joined(data) {
      console.log('Room页面');
      console.log(data);
      // 添加一条记录到聊天窗口：
      const chatOneInfo = {
        type: 'info',
        talker: data.username,
        message: `${data.username} 进入了房间`,
        time: new Date().Format('yyyy:MM:dd  hh:mm:ss'),
      };
      this.updateChatList(chatOneInfo);
      // 滚动条滚到底部核心代码
      this.$nextTick(() => {
        const chatBox = this.$refs.chatContent; // 获取对象
        chatBox.scrollTop = chatBox.scrollHeight; // 滚动高度
      });

      // 别人加入的时候，去更新自己的vuex
      const obj = {
        username: data.username,
        userId: data._id,
      };
      this.updateRoomOnlineList(obj); // 有人加入的时候更新自己的vuex用户列表
    },
    connections(data) {
      this.connections = data;
    },
    leave(data) {
      console.log(data);
      // 添加一条记录到聊天窗口：
      const chatOneInfo = {
        type: 'info',
        talker: data.username,
        message: `${data.username} 离开了房间`,
        time: new Date().Format('yyyy:MM:dd  hh:mm:ss'),
      };
      this.updateChatList(chatOneInfo);
      // 滚动条滚到底部核心代码
      this.$nextTick(() => {
        const chatBox = this.$refs.chatContent; // 获取对象
        chatBox.scrollTop = chatBox.scrollHeight; // 滚动高度
      });
      // 接收到有参与者leave事件时，去刷新vuex里的数据
      this.removeRoomOnlineListWithParticipant(data);
    },
    dismissRoom() {
      const _self = this;
      this.$message({
        type: 'warning',
        message: '房间解散啦，窗口将在3秒后回退到房间列表界面',
        duration: 3000,
        onClose() {
          _self.$router.push({
            path: '/you_draw_i_guess/room-list',
          });
        },
      });
    },
    questionReady() {
      this.$message({
        type: 'success',
        message: '问题已经创建完毕，随时可以开始答题！',
        duration: 3000,
      });
    },
    errorAnswer(data) {
      this.$message({
        type: 'error',
        message: `【 ${data.username} 】的答案是 【 ${data.answer} 】,该答案错误！`,
        duration: 3000,
      });
      return false;
    },

    successAnswer(data) {
      this.$message({
        type: 'success',
        message: `恭喜【 ${data.username} 】 回答正确 ！！！ 这道题的答案是 【 ${data.answer} 】,请创建下一道题目`,
        duration: 3000,
      });
      this.answerPoem = ''; // 清空输入框
      return false;
    },
    sendMessage(data) {
      const chatOneInfo = {
        type: 'word',
        talker: data.username,
        message: data.chatWord,
        time: new Date().Format('yyyy:MM:dd  hh:mm:ss'),
      };
      this.updateChatList(chatOneInfo);
      // 滚动条滚到底部核心代码
      this.$nextTick(() => {
        const chatBox = this.$refs.chatContent; // 获取对象
        chatBox.scrollTop = chatBox.scrollHeight; // 滚动高度
      });
    },
    typing(data) {
      // TODO: 优化正在输入... 5秒钟之后没有输入那么就还原
      this.chatPlaceholder = `${data.username} 正在输入...`;
    },
    stopTyping() {
      this.chatPlaceholder = '请输入聊天内容...';
    },
  },
  created() {
    this.$socket.emit('chat message', '123');
    // 监听页面离开或者关闭事件
    window.onbeforeunload = () => {
      const obj = {
        roomNo: this.$store.state.roomInfo.roomNo,
        username: this.$store.state.user.username,
        userId: this.$store.state.user._id,
      };
      this.$socket.emit('leave', obj);
      this.leaveRoom();
    };

    Http.findOneRoom(this.$route.params.id).then((res) => {
      const temp = res.data.data[0];
      // 更新当前的vuex
      const obj = {
        roomNo: temp.roomNo,
        creator: temp.creator,
        roomName: temp.roomName,
        max: temp.max,
        online: temp.online,
        isPrivate: temp.isPrivate,
        created: temp.created,
        onLineList: temp.onlinePlayer,
      };
      this.updateRoomInfoCreator(obj);
    });
  },
  mounted() {
    // 初始化画笔
    if (this.ctx !== null) {
      this.ctx.strokeStyle = '#0C1D34'; // 轮廓颜色
      this.ctx.fillStyle = '#0C1D34'; // 填充颜色
      this.ctx.lineWidth = 2; // 画笔粗细
      // 动态适应屏幕大小,计算main区域的大小，然后乘上一个系数
      const mainWidth = this.$refs.main.offsetWidth;
      const mainHeight = this.$refs.main.offsetHeight;
      this.ctx.canvas.width = mainWidth * 0.58;
      this.ctx.canvas.height = mainHeight * 0.98;
    }
    // 监听img 的 src 事件
    this.$watch('src', (v) => {
      this.$nextTick((_) => {
        if (v) {
          this.drawInCanvas(v);
        }
      });
    });
  },
  watch: {
    chatWord(value) {
      const obj = {
        username: this.$store.state.user.username,
        roomNo: this.$store.state.roomInfo.roomNo,
      };
      // eslint-disable-next-line no-unused-expressions
      value ? this.$socket.emit('typing', obj) : this.$socket.emit('stopTyping', obj);
    },
  },
};
</script>

<style scoped lang="scss">
  /* 手机以外的分辨率 */
  @media screen and (min-width: 481px) {
    .top{
      width: 100%;
      margin: 0 auto;
      /*border: 1px solid red;*/
      .top-inner{
        width: 65%;
        /*margin: 0 auto;*/
        /*border: 1px solid #EBEEF5;*/
        border-radius: 4px;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .question-title{

        }
        .question-poem{
          width: 20em;
        }
        .question-create{
          margin-left: 10px;
        }
      }
    }
    .main{
      width: 100%;
      margin: 0 auto;
      margin-top: 20px;
      /*border: 1px solid #AA314D;*/
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .paint-tool{
        width: 20%;
        /*border: 1px solid #6638F0;*/
        .top-tool{
          /*border: 1px solid #F56C6D;*/
        }
        .in-eraser{
          /*动态改变颜色*/
          background-color: #DAECFF;
        }
        .pen-thickness{
          div{
            width: 80%;
            margin: 10px auto;
            background: #C0C4CC content-box;
            /*border: 1px solid #909399;*/
            cursor: pointer;
            margin-top: 20px;
            &:hover{
              border: 1px solid #303133;
            }
          }
          .w1{
            height: 1px;
          }
          .w2{
            height: 2px;
          }
          .w5{
            height: 5px;
          }
          .w10{
            height: 10px;

          }
          .w15{
            height: 15px;
          }
          .w20{
            height: 20px;
          }
        }
        .pen-color{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 5px;
        }
        .pen-quick{
          /*border: 1px solid red;*/
          .pen-type{
            width: 80%;
            margin: 10px auto;
            > :nth-child(n){
              margin: 5px;
            }
          }
          .pen-type-fill{
            .pen-fill-color-choose{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-top: 5px;
            }
          }
        }
      }
      .paint-canvas{
        align-self: flex-start;
        width: 60%;
        /*border: 1px solid #5CC9F5;*/
        #canvas{
          /*max-height: 578px; // 调整canvas的高度*/
          /*width: 100%;*/
          /*width: 60em;*/
          border: 2px solid rgb(199, 198, 198);
        }
      }
      .paint-talk{
        align-items: flex-start;
        width: 20%;
        /*border: 1px solid #FF2150;*/
        .room-info{
          border: 1px solid #DCDFE6;
          border-radius: 4px;
          margin-bottom: 20px;
          .online-people{
            color: #67C23A;
            font-size: 20px;
            font-weight: bold;
          }
          .room-creator{
            color: #F56C6C;
            font-size: 20px;
            font-weight: bold;
          }
        }
        .chat{
          border: 1px solid #DCDFE6;
          .chat-content{
            height: 21rem;
            overflow :auto;
            .chat-one-paragraph{
              margin: 10px 10px;
              /*border: 1px solid #DCDFE6;*/
              border-bottom: 1px solid #DCDFE6;
              border-radius: 4px;
              .chat-type-word{
                .chat-message-info{
                  display: flex;
                  justify-content: flex-start;
                  align-items: flex-start;
                }
                .chat-time{
                  margin-top: 5px;
                  color: #909399;
                }
                .chat-talk-common{
                  /*padding: 2px 0;*/
                }
                .chat-spokesperson{
                  color: #409EFF;
                }
                .chat-word{
                  margin-left: 10px;
                }
              }
              .chat-type-info{
                .chat-info-time{
                  margin: 5px 0;
                  color: #909399;
                }
                .chat-info-message{
                  margin-top: 10px;
                  margin-bottom: 10px;
                  color: #E6A23C;
                }
              }
            }
          }
          .chat-input{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 10px;
            .chat-send-button{
              margin-left: 10px;
            }
          }
        }
      }
    }
    .bottom{
      width: 100%;
      margin: 0 auto;
      /*border: 1px solid #409EFF;*/
      .bottom-inner{
        width: 65%;
        /*margin: 0 auto;*/
        /*border: 1px solid #EBEEF5;*/
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .answer-poem{
        width: 31em;
      }
      .answer-submit{
        margin-left: 20px;
      }
    }
  }

  /* 横向放置的手机和竖向放置的平板之间的分辨率 */
  @media screen and (max-width: 767px) {

  }

  /* 横向放置的手机及分辨率更小的设备 */
  @media screen and (max-width: 480px) {


  }
</style>
