const express = require('express');
const router = express.Router();
const Poem = require('../dao/poemsDao');

/*
 *  author: imricky
 *  time: 2019/12/2 2:32 下午
 *  function: 获取每日一首诗
*/
router.get('/getDailyPoem', async (req, res, next) => {
  try {
    const data = await Poem.generateDailyPoem();
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e,
    });
  }
});

/*
 *  author: imricky
 *  time: 2019/12/2 8:00 下午
 *  function: 获取历史每日一诗推荐表，分页
*/
router.get('/getHistoryDailyPoem', async (req, res, next) => {
  try {
    const data = await Poem.getHistoryDailyPoem();
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e,
    });
  }
});

/*
 *  author: imricky
 *  time: 2019/12/2 7:53 下午
 *  function: 根据tags 获取诗词
*/
router.post('/getPoemsByTags', async (req, res, next) => {
  try {
    const { tagName, page } = req.body;
    const data = await Poem.getPoemsByTags(tagName, page);
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e,
    });
  }
});

/*
 *  author: imricky
 *  time: 2019/12/2 7:54 下午
 *  function: 根据作者获取诗词
*/
router.post('/getPoemsByAuthor', async (req, res, next) => {
  try {
    const { author, page } = req.body;
    const data = await Poem.getPoemsByAuthor(author, page);
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e,
    });
  }
});

/*
 *  author: imricky
 *  time: 2019/12/2 5:54 下午
 *  function:获取热门的前50的tags
*/
router.post('/getHotTop50List', async (req, res, next) => {
  const { type } = req.body;
  try {
    const data = await Poem.getHotTop50List(type);
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e,
    });
  }
});

/*
 *  author: imricky
 *  time: 2019/12/2 8:06 下午
 *  function: 根据前端传过来的_id ，获取完整的一首诗，用于每日一诗中点击标题，右侧展示完整诗句
*/
router.post('/getOneInfo', async (req, res, next) => {
  try {
    const { _id } = req.body;
    const data = await Poem.getOneInfo(_id);
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e,
    });
  }
});

/*
 *  author: imricky
 *  time: 2019/12/2 8:32 下午
 *  function: 获取数据库里的汇总信息，用于文库大全里左侧获取信息
 *  总共有多少首诗句，共多少位诗人，排名前10的诗人 ...
*/
router.get('/getDatabaseAllInfo', async (req, res, next) => {
  try {
    const data = await Poem.getDatabaseAllInfo();
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e,
    });
  }
});

/*
 *  author: imricky
 *  time: 2019/12/3 10:36 上午
 *  function: 搜索接口
*/
router.post('/search', async (req, res, next) => {
  try {
    const { keyword } = req.body;
    const data = await Poem.search(keyword);
    res.json({
      data,
    });
  } catch (e) {
    res.json({
      success: false,
      errorMessage: e,
    });
  }
});


module.exports = router;