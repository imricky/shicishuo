const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const YouDrawIGuessDao = require('../dao/YouDrawIGuessDao');
const { ObjectId } = mongoose.Types;

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
      errorMessage: e,
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

module.exports = router;
