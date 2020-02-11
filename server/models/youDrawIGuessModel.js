const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

// 房间列表数据
const RoomListSchema = new Schema({
  roomNo: { type: String, required: [true, '房间号不能为空'] }, // 房间号 (默认是ObjectId),但是存入数据库把它转成String，方便操作
  roomName: String, // 房间名称
  isPrivate: {
    type: Boolean,
    default: false,
  }, // 是否私密
  creator: String, // 创建者
  max: { type: Number, default: 12 }, // 最大允许人数
  online: Number, // 当前人数
  onlinePlayer: Array, // 在线用户列表
  created: { type: Date, default: Date.now() }, // 创建时间
  updated: { type: Date, default: Date.now() }, // 更新时间
});
const RoomList = mongoose.model('roomList', RoomListSchema);

module.exports = {
  RoomList,
};
