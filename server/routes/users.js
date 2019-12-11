const express = require('express');
const router = express.Router();
const Xss = require('xss');
const sha1 = require('sha1');
const { sha1Salt } = require('../config/jwtSecret');
const { createToken } = require('../utils/auth');
const User = require('../models/userModel');

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

module.exports = router;
