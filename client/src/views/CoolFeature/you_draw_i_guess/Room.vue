<template>
  <div>
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
        <el-button class="question-create">创建</el-button>
        <el-button type="primary">自动生成目标句诗</el-button>
      </div>
    </div>
    <div class="main">
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
          width="850"
          height="580"
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
          <p>在线人数： <span class="online-people">12</span></p>
          <p>当前房主： <span class="room-creator">crq</span></p>
        </div>
        <div class="chat">
          <el-divider content-position="left">聊天内容</el-divider>
          <div class="chat-content">
            <div class="chat-one-paragraph" v-for="i in 10" :key="i">
              <p class="chat-talk-common chat-spokesperson">
                crq2:{{i}}
              </p>
              <p class="chat-talk-common chat-word">我猜测是月落乌啼霜满天{{i}}</p>
            </div>
          </div>
          <div class="chat-input">
            <el-input
              placeholder="请输入内容"
              clearable
              v-model="chatWord">
              <i slot="prefix" class="el-input__icon el-icon-chat-round"></i>
            </el-input>
            <el-button class="chat-send-button">发送</el-button>
          </div>
        </div>
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
        <el-button class="answer-submit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
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
      socket: '', // 前端建立的socket
      src: '', // img的src，用来监听url
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
  },
  methods: {
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
      if (this.socket) {
        this.socket.emit('dataURI', this.canvas.toDataURL());
      }
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
      if (this.socket) {
        console.log(this.canvas.toDataURL());
        this.socket.emit('dataURI', this.canvas.toDataURL());
      }
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
      if (this.socket) {
        this.socket.emit('dataURI', this.canvas.toDataURL());
      }
    },
    down(e) {
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
  },
  created() {
    this.socket = io('http://localhost:1234', { transports: ['websocket'] });
    this.socket.emit('chat message', '123');
    this.socket.on('test1', (msg) => {
      console.log(`${msg}123`);
    });
  },
  mounted() {
    // 初始化画笔
    if (this.ctx !== null) {
      this.ctx.strokeStyle = '#0C1D34'; // 轮廓颜色
      this.ctx.fillStyle = '#0C1D34'; // 填充颜色
      this.ctx.lineWidth = 2; // 画笔粗细
    }
    this.socket.on('dataURI', (dataURI) => {
      // this.drawInCanvas(dataURI); // 不能一直调用，否则会屏幕一直闪烁
      this.src = dataURI;
    });
    // 监听img 的 src 事件
    this.$watch('src', (v) => {
      this.$nextTick((_) => {
        if (v) {
          this.drawInCanvas(v);
        }
      });
    });
  },
};
</script>

<style scoped lang="scss">
  /* 手机以外的分辨率 */
  @media screen and (min-width: 481px) {
    .top{
      width: 100%;
      margin: 0 auto;
      border: 1px solid red;
      .top-inner{
        width: 65%;
        margin: 0 auto;
        border: 1px solid red;
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
      border: 1px solid #AA314D;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .paint-tool{
        width: 20%;
        border: 1px solid #6638F0;
        .top-tool{
          border: 1px solid #F56C6D;
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
          border: 1px solid red;
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
        border: 1px solid #5CC9F5;
        #canvas{
          /*max-height: 578px; // 调整canvas的高度*/
          /*width: 100%;*/
          border: 1px solid rgb(199, 198, 198);
        }
      }
      .paint-talk{
        align-items: flex-start;
        width: 20%;
        border: 1px solid #FF2150;
        .room-info{
          border: 1px solid #409EFF;
          margin-bottom: 20px;
          .online-people{
            color: #F56C6D;
            font-size: 20px;
            font-weight: bold;
          }
          .room-creator{
            color: #5CC9F5;
            font-size: 20px;
            font-weight: bold;
          }
        }
        .chat{
          border: 1px solid #F56C6C;
          .chat-content{
            height: 20em;
            overflow :auto;
            .chat-one-paragraph{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin: 5px 0;
              border: 1px solid red;
              .chat-talk-common{
                padding: 2px 0;
              }
              .chat-spokesperson{
                color: #F56C6C;
              }
              .chat-word{
                margin-left: 10px;
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
      border: 1px solid #409EFF;
      .bottom-inner{
        width: 65%;
        margin: 0 auto;
        border: 1px solid red;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .answer-poem{
        width: 30em;
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
