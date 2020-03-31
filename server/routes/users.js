const express = require('express');
const router = express.Router();
const Xss = require('xss');
const sha1 = require('sha1');
const mongoose = require('mongoose');
const { sha1Salt } = require('../config/jwtSecret');
const { createToken } = require('../utils/auth');
const { User } = require('../models/userModel');
const UsersDao = require('../dao/userDao');
const { ObjectId } = mongoose.Types;

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('user respond with a resource');
});

router.post('/register', async (req, res, next) => {
  let {
    // eslint-disable-next-line prefer-const
    username = '', password = '', repassword = '', email = '',
  } = req.body;
  try {
    if (password.length < 6) {
      return res.json({
        code: 401,
        msg: '注册失败，密码长度最少为6位',
      });
    }
    if (username === '') {
      return res.json({
        code: 401,
        msg: '用户名为空',
      });
    }
    if (password !== repassword) {
      return res.json({
        code: 401,
        msg: '注册失败，两次输入的密码不一致',
      });
    }
    username = Xss(username);
    let result = await User.find({ username });
    if (result.length !== 0) {
      return res.json({
        code: 409,
        msg: '用户名已存在，请重新输入一个吧',
      });
    }
    // 密码加密
    password = sha1(sha1(password + sha1Salt));
    // 生成jwtToken 返回
    const token = createToken(username);
    const user = new User({
      username, password, email,
    });
    result = await user.save();
    if (result._id !== null) {
      return res.json({
        code: 200,
        msg: '注册成功',
        data: {
          _id: result._id,
          username,
          token,
          avatar: result.avatar,
        },
      });
    }
    return res.json({
      code: 500,
      msg: '注册失败，服务器错误',
    });
  } catch (e) {
    return res.json({
      code: 500,
      msg: e,
    });
  }
});

router.post('/login', async (req, res, next) => {
  let {
    username = '', password = '',
  } = req.body;
  try {
    username = Xss(username);
    password = sha1(sha1(password + sha1Salt));
    const result = await User.find({ username, password });
    console.log(result);
    if (result.length === 0) {
      return res.json({
        code: 401,
        msg: '登录失败，用户名或密码错误',
      });
    }
    const jwtToken = createToken(username);
    return res.json({
      code: 200,
      msg: '登录成功',
      data: {
        _id: result[0]._id,
        username,
        token: jwtToken,
        avatar: result[0].avatar,
      },
    });
  } catch (e) {
    return res.json({
      code: 500,
      msg: e,
    });
  }
});

router.post('/getUserInfo', async (req, res, next) => {
  const { _id } = req.body;
  try {
    const data = await User.find({ _id: ObjectId(_id) });
    return res.json({
      code: 200,
      data,
    });
  } catch (e) {
    return res.json({
      code: 500,
      msg: e,
    });
  }
});

router.post('/updateUserInfo', async (req, res, next) => {
  const { _id } = req.body;
  const userUpdate = {
    username: Xss(req.body.username),
    updated: Date.now(),
  };
  try {
    const data = await UsersDao.updateUserInfo(_id, userUpdate);
    if (data.code === 200) {
      return res.json({
        code: 200,
        data: data.res,
      });
    }
    return res.json({
      code: 500,
      msg: data.msg,
    });
  } catch (e) {
    return res.json({
      code: 500,
      msg: e,
    });
  }
});

// 用户点击收藏
router.post('/collect', async (req, res, next) => {
  const { userid, poemid } = req.body;
  try {
    const data = await UsersDao.collect(userid, poemid);
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
// 获取用户收藏
// router.post('/getUserCollections', async (req, res, next) => {
//   const { _id } = req.body;
//   try {
//     const data = await UsersDao.getCollectionsByUserId(_id);
//     res.json({
//       data,
//       code: 200,
//     });
//   } catch (e) {
//     res.json({
//       success: false,
//       errorMessage: e.stack,
//       code: 500,
//     });
//   }
// });

// 获取用户收藏
router.post('/getCollectionsByUserId', async (req, res, next) => {
  const { _id, page } = req.body;
  try {
    const data = await UsersDao.getCollectionsByUserId(_id, page);
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
