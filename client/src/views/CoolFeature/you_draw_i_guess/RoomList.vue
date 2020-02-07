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
              label="房间号">
              <template slot-scope="scope">
                <i class="el-icon-medal"></i>
                <span style="margin-left: 5px">{{ scope.row.roomNo }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="在线人数/允许人数">
              <template slot-scope="scope">
                <i class="el-icon-connection"></i>
                <span style="margin-left: 5px">{{ scope.row.online }} / {{ scope.row.max }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="创建者">
              <template slot-scope="scope">
                <i class="el-icon-s-custom"></i>
                <span style="margin-left: 5px">{{ scope.row.creator }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleDelete(scope.$index, scope.row)">进入</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="option-all">
        <h4>没有找到想要的房间?</h4>
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
        roomNo: 1, // 房间号
        online: 2, // 在线人数
        max: 5, // 允许最大人数
        creator: 'crq', // 创建者
      }, {
        roomNo: 2, // 房间号
        online: 4, // 在线人数
        max: 8, // 允许最大人数
        creator: 'crq2', // 创建者
      }],
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
    margin-top: 20px;
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
