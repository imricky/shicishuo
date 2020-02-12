const jwt = require('jsonwebtoken');

const { secretKey } = require('../config/jwtSecret');


function createToken(str) {
  return jwt.sign({ str }, secretKey, { expiresIn: 600 });
}

/*
 *  @author: imricky(github.com/imricky)
 *  @time: 2019/12/12 2:14 下午
 *  @function: 校验登录中间件
 *  @param:
 *  @return:
*/
// eslint-disable-next-line consistent-return
async function checkToken(req, res, next) {
  // 如果是socket.io，那么不走checkToken，直接next，不然会一直走checkToken，找不到路由报错
  if (req.originalUrl.includes('/socket.io/')) {
    return;
  }
  // TODO: 需要正则匹配URL 例如user/123/userinfo
  const needAuthURL = [
    /userInfo/g,
    /^(\/draw).*?/g,
  ];
  let flag = false;

  for (let i = 0; i < needAuthURL.length; i++) {
    if (needAuthURL[i].test(req.originalUrl)) {
      flag = true;
      break;
    }
  }
  if (!flag) {
    // 一定要return next,不能只写next
    return next();
  }

  const auth = req.get('Authorization');
  if (!auth) {
    return res.status(401).json({
      // TODO: 状态码需要整理一下
      code: 401,
      msg: '您还没有登录哦',
    });
  }
  if (auth.indexOf('Bearer ') === -1) {
    return res.json({
      code: 401,
      msg: 'no bearer auth!!',
    });
  }
  const token = auth.split('Bearer ')[1];
  try {
    const { str = '' } = await jwt.verify(token, secretKey);
    return next();
  } catch (e) {
    return res.json({
      code: 401,
      msg: 'token错误',
    });
  }
}


module.exports = {
  createToken,
  checkToken,
};


// const auth = req.get('Authorization')
// if (!auth) res.send('no auth!!')
// if (auth.indexOf('Bearer ') === -1) res.send('no bearer auth!!')
// const token = auth.split('Bearer ')[1]
// const user = JWT.verify(token, 'qweqwwweqweqwe')
// if (user.expiredAt < Date.now().valueOf()) res.send('no bearer auth!!')
// res.send(user)
