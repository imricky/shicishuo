const mongoose = require('mongoose');
const { RoomList } = require('../models/youDrawIGuessModel');
const { ObjectId } = mongoose.Types;

class YouDrawIGuessDao {
  // eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor() {
  }

  static async getRoomList() {
    const roomListAll = await RoomList.find({ });
    return roomListAll;
  }
}

module.exports = YouDrawIGuessDao;
