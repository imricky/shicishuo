const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const YouDrawIGuessDao = require('../dao/youDrawIGuessDao');
const { ObjectId } = mongoose.Types;

const io = require('../utils/socketio');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('user respond with a resource');
});


// 获取房间列表
router.get('/getRoomList', async (req, res, next) => {
  try {
    const data = await YouDrawIGuessDao.getRoomList();
    res.json({
      data,
      code: 200,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e.stack,
      code: 500,
    });
  }
});

// 查找一个房间的信息以及是否存在
router.post('/findOneRoom', async (req, res, next) => {
  const { roomNo } = req.body;
  try {
    const data = await YouDrawIGuessDao.findOneRoom(roomNo);
    res.json({
      data,
      code: 200,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e.stack,
      code: 500,
    });
  }
});

router.post('/deleteOneRoom', async (req, res, next) => {
  const { roomNo } = req.body;
  try {
    const data = await YouDrawIGuessDao.deleteOneRoom(roomNo);
    res.json({
      data,
      code: 200,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e.stack,
      code: 500,
    });
  }
});

// 创建房间
router.post('/createRoom', async (req, res, next) => {
  const obj = {
    max: req.body.max,
    isPrivate: req.body.isPrivate,
    creator: req.body.creator,
  };
  try {
    const data = await YouDrawIGuessDao.createRoom(obj);
    if (data !== null) {
      res.json({
        data,
        code: 200,
      });
    }
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e.stack,
      code: 500,
    });
  }
});

// 随机进入房间
router.get('/randomEnterRoom', async (req, res, next) => {
  try {
    const data = await YouDrawIGuessDao.randomEnterRoom();
    res.json({
      data,
      code: 200,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e.stack,
      code: 500,
    });
  }
});

router.post('/updateRoomInfoOnline', async (req, res, next) => {
  const { roomNo } = req.body;
  const obj = {
    username: req.body.username,
    userId: req.body.userId,
  };
  try {
    const data = await YouDrawIGuessDao.updateRoomInfoOnline(roomNo, obj);
    res.json({
      data,
      code: 200,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e.stack,
      code: 500,
    });
  }
});

router.post('/removeRoomInfoOnline', async (req, res, next) => {
  const { roomNo } = req.body;
  const obj = {
    username: req.body.username,
    userId: req.body.userId,
  };
  try {
    const data = await YouDrawIGuessDao.removeRoomInfoOnline(roomNo, obj);
    res.json({
      data,
      code: 200,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e.stack,
      code: 500,
    });
  }
});

router.post('/updateRoomQuestion', async (req, res, next) => {
  const { roomNo, question } = req.body;
  try {
    const data = await YouDrawIGuessDao.updateRoomQuestion(roomNo, question);
    res.json({
      data,
      code: 200,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e.stack,
      code: 500,
    });
  }
});

router.post('/submitAnswer', async (req, res, next) => {
  const { roomNo, answer, username } = req.body;
  try {
    const data = await YouDrawIGuessDao.submitAnswer(roomNo, answer);
    const obj = {
      username,
      answer,
    };
    // 出错了的话通知所有客户端，提示错误信息
    if (data.success === false) {
      io.in(roomNo).emit('errorAnswer', obj); // 包括自己
    } else {
      // 向各个客户端推送
      io.in(roomNo).emit('successAnswer', obj); // 包括自己
      // 清空数据库里的答案
      await YouDrawIGuessDao.clearRoomQuestion(roomNo);
    }

    res.json({
      data,
      code: 200,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e.stack,
      code: 500,
    });
  }
});

module.exports = router;
