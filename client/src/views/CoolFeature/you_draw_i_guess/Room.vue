<template>
  <div>
    <div class="top">
      <div class="top-inner">
        <p class="question-title">目标诗句：</p>
        <div>
          <el-input
            placeholder="请输入诗句需要猜测的诗句"
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
          <el-button size="small" icon="el-icon-edit">画笔</el-button>
          <el-button size="small" icon="el-icon-takeaway-box">橡皮擦</el-button>
          <el-button size="small" icon="el-icon-refresh-right">清除画板</el-button>
        </div>
        <div class="pen-thickness">
          <p>画笔粗细：</p>
          <div class="w1" @click="changeWidth(1)"></div>
          <div class="w2" @click="changeWidth(2)"></div>
          <div class="w5" @click="changeWidth(5)"></div>
          <div class="w10" @click="changeWidth(10)"></div>
          <div class="w15" @click="changeWidth(15)"></div>
          <div class="w20" @click="changeWidth(20)"></div>
        </div>
        <div class="pen-color">
          <p>画笔颜色：</p>
          <div>
            <el-select v-model="choosePenColor" placeholder="请选择">
              <el-option
                v-for="item in colorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="pen-quick">
          <p>快捷方式：</p>
          <div class="pen-type">
            <el-button size="small" icon="el-icon-edit">直线</el-button>
            <el-button size="small" icon="el-icon-takeaway-box">矩形</el-button>
            <el-button size="small" icon="el-icon-refresh-right">圆形</el-button>
            <el-button size="small" icon="el-icon-refresh-right">三角形</el-button>
          </div>
          <div class="pen-type-fill">
            <div class="pen-fill-color-choose">
              是否填充：
              <el-switch
                v-model="typeFill"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </div>
            <div class="pen-fill-color-choose">
              <p>
                填充颜色：
              </p>
              <el-color-picker v-model="fillColor"></el-color-picker>
            </div>
          </div>
        </div>
      </div>
<!--      画布-->
      <div class="paint-canvas">
        456
      </div>
<!--      聊天窗口以及额外信息-->
      <div class="paint-talk">
        789
      </div>
    </div>
    <div class="bottom">
      789
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  data() {
    return {
      questionPoem: '', // 问题诗句
      colorOptions: [{
        value: 'red',
        label: '红色',
      }, {
        value: 'green',
        label: '绿色',
      }, {
        value: 'lightblue',
        label: '浅蓝色',
      }, {
        value: 'yellow',
        label: '黄色',
      }, {
        value: 'white',
        label: '白色',
      }, {
        value: 'black',
        label: '黑色',
      }, {
        value: 'blue',
        label: '蓝色',
      }, {
        value: 'orange',
        label: '橘色',
      }],
      choosePenColor: 'black', // 画笔的选择颜色
      typeFill: false, // 快捷方式的是否填充
      fillColor: '#409EFF',
    };
  },
  computed: {},
  methods: {
    // 改变画笔粗细
    changeWidth(width) {
      console.log(width);
    },
  },
  created() {
  },
  mounted() {

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
      align-items: center;
      .paint-tool{
        width: 20%;
        border: 1px solid #6638F0;
        .top-tool{
          border: 1px solid #F56C6D;
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
          div{
            width: 80%;
            margin: 10px auto;
            cursor: pointer;
          }
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
        width: 60%;
        border: 1px solid #5CC9F5;
      }
      .paint-talk{
        width: 20%;
        border: 1px solid #FF2150;
      }
    }
    .bottom{
      width: 100%;
      margin: 0 auto;
      border: 1px solid #409EFF;
    }
  }

  /* 横向放置的手机和竖向放置的平板之间的分辨率 */
  @media screen and (max-width: 767px) {

  }

  /* 横向放置的手机及分辨率更小的设备 */
  @media screen and (max-width: 480px) {


  }
</style>
