const express = require('express');
const router = express.Router();
const CommonDao = require('../dao/commonDao');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/*
 *  author: imricky
 *  time: 2019/12/3 10:36 上午
 *  function: 搜索接口
*/
router.post('/search', async (req, res, next) => {
  try {
    const { keyword } = req.body;
    const data = await CommonDao.search();
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

module.exports = router;
