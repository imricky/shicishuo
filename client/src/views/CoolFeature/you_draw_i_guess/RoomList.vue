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
                  @click="handleOneRoomEnter(scope.$index, scope.row)">进入</el-button>
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
            v-model="inputRoomNo"
            class="room-no">
          </el-input>
          <el-button icon="el-icon-s-promotion" class="room-choose-enter" @click="enterInputRoom">进入</el-button>
        </p>
        <p>
          <el-row>
            <el-button type="primary" icon="el-icon-circle-plus" @click="dialogFormVisible = true">创建一个房间</el-button>
            <el-dialog title="创建房间" :visible.sync="dialogFormVisible">
              <el-form :model="createForm" :rules="rules" ref="createForm">
                <el-form-item label="允许最大人数" prop="max" :label-width="formLabelWidth" required>
                  <el-input v-model.number="createForm.max"></el-input>
                </el-form-item>
                <el-form-item label="是否私密" prop="private" :label-width="formLabelWidth" required>
                  <el-switch v-model="createForm.private"></el-switch>
                </el-form-item>
                <el-form-item label="自定义房间号" prop="roomNo" :label-width="formLabelWidth">
                  <el-input
                    v-model="createForm.roomNo"
                    :disabled="true"
                    placeholder="暂未开放此功能"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancelCreateRoom">取 消</el-button>
                <el-button type="primary" ref="createRoom" @click="createRoom">{{createRoomButton}}</el-button>
              </div>
            </el-dialog>

            <el-button type="success" icon="el-icon-guide" class="room-random" @click="randomEnterRoom">随机进入房间</el-button>
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
    const checkMax = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('人数不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else if (value < 2 || value > 99) {
          callback(new Error('人数必须在2到99之间'));
        } else {
          callback();
        }
      }, 300);
    };
    return {
      inputRoomNo: '', // 手动输入的房间号
      dialogFormVisible: true,
      createForm: {
        max: '', // 允许最大人数
        private: false, // 是否私密
        roomNo: '', // 创建的房间号
      },
      createRoomButton: '确 定',
      rules: {
        max: [
          { validator: checkMax, trigger: 'blur' },
        ],
      },
      formLabelWidth: '120px',
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
    // 进入列表的某个房间
    handleOneRoomEnter(index, row) {
      console.log(index, row);
    },
    // 进入输入的房间号
    enterInputRoom() {
      console.log('进入输入的房间号');
    },
    // 创建房间
    createRoom() {
      this.$refs.createForm.validate((valid) => {
        if (valid) {
          this.$refs.createRoom.loading = true;
          setTimeout(() => {
            this.$refs.createRoom.loading = false;
            this.dialogFormVisible = false;
            this.$refs.createForm.resetFields();
          }, 1000);
        } else {
          this.$message({
            message: 'error submit',
            type: 'warning',
          });
          return false;
        }
      });
    },
    // 取消创建房间
    cancelCreateRoom() {
      this.$refs.createForm.resetFields();
      this.dialogFormVisible = false;
    },
    // 随机进入房间
    randomEnterRoom() {
      console.log('随机进入房间');
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
    .room-random{
      margin-left: 20px;
    }
  }
</style>
