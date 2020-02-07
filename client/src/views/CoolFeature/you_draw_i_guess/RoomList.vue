<template>
  <div>
    <div class="room-list-container">
      <div class="list-all">
        <h3>房间列表：</h3>
        <div class="table-main">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="日期">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.name }}</p>
                  <p>住址: {{ scope.row.address }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="option-all">
        <p>没有找到想要的房间?</p>
        <p>
          输入房间号：
          <el-input
            placeholder="房间号：例如123"
            suffix-icon="el-icon-key"
            v-model="roomNo"
            class="room-no">
          </el-input>
          <el-button icon="el-icon-s-promotion" class="room-choose-enter">进入</el-button>
        </p>
        <p>
          <el-row>
            <el-button type="primary" icon="el-icon-circle-plus">创建一个房间</el-button>
            <el-button type="success" icon="el-icon-guide">随机进入房间</el-button>
          </el-row>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Http from '@/api/http';
export default {
  name: 'RoomList',
  data() {
    return {
      roomNo: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
      search: '',
    };
  },
  computed: {},
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped lang="scss">
  .room-list-container{
    max-width: 1000px;
    border: 1px solid #DCDFE6;
    background-color: #E9EEF3;
    color: #333;
    margin: 0 auto;
  }
  .list-all{
    border: 1px solid red;
    margin-bottom: 20px;
  }
  .option-all{
    border: 1px solid #D92C21;
    .room-no{
      display: inline-block;
      width: 300px;
      margin-right: 20px;
    }
  }
</style>
