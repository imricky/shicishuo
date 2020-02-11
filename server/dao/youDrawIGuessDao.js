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
}

module.exports = YouDrawIGuessDao;
