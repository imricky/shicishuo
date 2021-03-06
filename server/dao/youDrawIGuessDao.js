const mongoose = require('mongoose');
const { RoomList } = require('../models/youDrawIGuessModel');
const { ObjectId } = mongoose.Types;

class YouDrawIGuessDao {
  // eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor() {
  }

  static async getRoomList() {
    // 找寻不是私密房间的列表
    const roomListAll = await RoomList.find({ isPrivate: 0 });
    return roomListAll;
  }

  // 查找一个房间的信息以及是否存在
  static async findOneRoom(roomNo) {
    const roomInfo = await RoomList.find({ roomNo });
    return roomInfo;
  }

  static async deleteOneRoom(roomNo) {
    const roomInfo = await RoomList.deleteOne({ roomNo });
    return roomInfo;
  }

  // 创建房间
  static async createRoom(obj) {
    const roomNo = new ObjectId();
    const roomName = `${obj.creator}的房间`;
    const { isPrivate, creator, max } = obj;


    const room = new RoomList({
      roomNo, roomName, isPrivate, creator, max,
    });
    try {
      const result = await room.save();
      if (result._id !== null) {
        return result;
      }
      return null;
    } catch (e) {
      throw new Error(e);
    }
  }

  // 随机进入一个房间
  static async randomEnterRoom() {
    const res = await RoomList.aggregate([
      { $sample: { size: 1 } },
    ]);
    return res;
  }

  // 更新房间在线人数信息：
  static async updateRoomInfoOnline(roomNo, data) {
    const res = await RoomList.updateOne(
      { roomNo },
      { $push: { onlinePlayer: data }, $inc: { online: 1 } },
    );
    return res;
  }

  // remove 去掉在线人数
  static async removeRoomInfoOnline(roomNo, data) {
    console.log(data);
    const res = await RoomList.updateOne(
      { roomNo },
      { $pull: { onlinePlayer: data }, $inc: { online: -1 } },
    );
    return res;
  }


  // 创建问题，同步问题到数据库，方便下一个人进去的时候去数据库获取,（后期改造其实也可以在用户进房间的时候用websocket初始化数据）
  static async updateRoomQuestion(roomNo, question) {
    const res = await RoomList.updateOne(
      { roomNo },
      { $set: { question } },
    );
    return res;
  }

  // 用户提交问题
  static async submitAnswer(roomNo, answer) {
    const res = await RoomList.findOne({ roomNo }, { question: 1 }); // 先查找对应房间问题的答案
    if (res === null) {
      throw new Error('房间号错误，未找到答案');
    }
    const obj = {
      success: false,
      answer,
    };
    if (res.question !== answer) {
      return obj;
    }
    obj.success = true;
    return obj;
  }

  // 清空该房间的答案
  static async clearRoomQuestion(roomNo) {
    const res = await RoomList.updateOne({ roomNo }, { question: '' }); // 先查找对应房间问题的答案
    return res;
  }
}

module.exports = YouDrawIGuessDao;
