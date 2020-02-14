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
            clearable
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
                <el-form-item label="允许最大人数" prop="max" :label-width="formLabelWidth">
                  <el-input v-model.number="createForm.max"></el-input>
                </el-form-item>
                <el-form-item label="是否私密" prop="isPrivate" :label-width="formLabelWidth" required>
                  <el-switch v-model="createForm.isPrivate"></el-switch>
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
import { mapState, mapGetters, mapActions } from 'vuex';
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
      dialogFormVisible: false, // 创建房间的弹框
      createForm: {
        max: '', // 允许最大人数
        isPrivate: false, // 是否私密
        roomNo: '', // 创建的房间号
      },
      createRoomButton: '确 定',
      rules: {
        max: [
          { validator: checkMax, trigger: 'blur' },
        ],
      },
      formLabelWidth: '120px',
      tableData: [], // 房间列表
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    ...mapActions([
      'updateRoomInfoCreator', // 更新房间信息，仅针对创建者
    ]),
    // 获取房间列表
    async getRoomList() {
      const res = await Http.getRoomList();
      return res;
    },
    // 进入列表的某个房间
    handleOneRoomEnter(index, row) {
      const _self = this;
      const obj = {
        roomNo: row.roomNo,
        user: this.user,
      };
      this.$socket.emit('joined', obj);
      // TODO: 进入的时候，加上一些友好过度
      this.$message({
        message: '正在进入房间...',
        type: 'success',
        duration: 1000,
        onClose() {
          _self.$router.push({
            path: `/you_draw_i_guess/room/${row.roomNo}`,
          });
        },
      });
    },
    // 进入输入的房间号
    async enterInputRoom() {
      const _self = this;
      if (this.inputRoomNo !== '') {
        const res = await Http.findOneRoom(this.inputRoomNo);
        if (res.data.code === 200) {
          if (res.data.data.length > 0) {
            this.$message({
              message: '正在进入房间...',
              type: 'success',
              duration: 1500,
              onClose() {
                _self.$router.push({
                  path: `/you_draw_i_guess/room/${_self.inputRoomNo}`,
                });
              },
            });
          } else {
            this.$message({
              message: `未找到【 ${this.inputRoomNo} 】该房间号`,
              type: 'warning',
              duration: 1500,
            });
          }
        } else {
          this.$message({
            message: `进入房间失败，失败原因:${res.data.errorMessage}`,
            type: 'error',
            duration: 1500,
          });
        }
      } else {
        this.$message({
          message: '请先输入房间号',
          type: 'error',
          duration: 1500,
        });
      }
    },
    // 创建房间
    createRoom() {
      this.$refs.createForm.validate(async (valid) => {
        const _self = this;
        if (valid) {
          const { max = 12, isPrivate = false } = this.createForm;
          const creator = _self.user.username;
          const createData = {
            max,
            isPrivate,
            creator,
          };
          const res = await Http.createRoom(createData);
          const { code, msg, data = {} } = res.data;
          const createRoomNo = data.roomNo;
          if (code === 200) {
            const obj = {
              roomNo: data.roomNo,
              username: this.user.username,
              userId: this.user._id,
              max: this.createForm.max || 12,
            };
            this.$socket.emit('create', obj); // socket 传递
            this.$message({
              message: '创建成功，正在进入房间...',
              type: 'success',
              duration: 1000,
              onClose() {
                _self.$router.push({
                  path: `/you_draw_i_guess/room/${createRoomNo}`,
                });
              },
            });
          } else {
            this.$message({
              message: `创建失败，失败原因：${msg}`,
              type: 'error',
              duration: 1000,
              onClose() {
                _self.dialogFormVisible = false;
                _self.$refs.createForm.resetFields();
              },
            });
            return false;
          }
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
    async randomEnterRoom() {
      const _self = this;
      const res = await Http.randomEnterRoom();
      if (res.data.data.length === 0) {
        this.$message({
          message: '目前没有房间呢，你可以自己创建一个啦~',
          type: 'info',
          duration: 1500,
        });
        return false;
      }
      const { roomNo, roomName } = res.data.data[0];
      this.$message({
        message: `正在进入【${roomName}】的房间，房间号为【${roomNo}】`,
        type: 'success',
        duration: 1500,
        onClose() {
          _self.$router.push({
            path: `/you_draw_i_guess/room/${roomNo}`,
          });
        },
      });
    },
  },
  sockets: {
    joined(data) {
      console.log(data);
    },
  },
  created() {
    this.getRoomList().then((res) => {
      this.tableData = res.data.data;
    });
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
