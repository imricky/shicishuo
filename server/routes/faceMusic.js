const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const rp = require('request-promise');
const fs = require('fs');

const FaceMusicDao = require('../dao/faceMusicDao');
const { faceApiSecretKey } = require('../config/jwtSecret');


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('user respond with a resource');
});


// 获取人脸分析数据
router.post('/analyzeFace', async (req, res, next) => {
  const { dataUri } = req.body;
  // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/
  // 前面是文件格式，逗号后面的是数据
  const base64Data = dataUri.replace(/^data:image\/png;base64,/, '');
  // const base64Img = dataUri.split(',')[1];
  try {
    const poemResult = await FaceMusicDao.generateOneSuggestPoem();
    let faceAnalyzeResult = await FaceMusicDao.facePlusPlusAnalyse(base64Data);
    faceAnalyzeResult = JSON.parse(faceAnalyzeResult);
    if (faceAnalyzeResult.faces.length === 0) {
      // 没有检测到人脸
      res.json({
        success: false,
        data: null,
        code: 599,
      });
      return;
    }
    const smileNo = Math.ceil(faceAnalyzeResult.faces[0].attributes.smile.value);
    const songInfo = await FaceMusicDao.getNeteaseOneSongBySmileNumber(smileNo);
    res.json({
      success: true,
      poemResult,
      faceAnalyzeResult,
      songInfo,
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

// 根据songId获取歌曲信息
router.post('/getOneSongById', async (req, res, next) => {
  const { songId } = req.body;
  try {
    const songInfo = await FaceMusicDao.getOneSongByPlayListTracksOrSongId([], songId);
    res.json({
      success: true,
      songInfo,
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

// 随便听听
router.get('/randomListen', async (req, res, next) => {
  try {
    const poemResult = await FaceMusicDao.generateOneSuggestPoem();
    const songInfo = await FaceMusicDao.getNeteaseOneSongBySmileNumber(65);
    res.json({
      poemResult,
      songInfo,
      success: true,
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


// 服务端base64转成图片
router.post('/base64ToImg', (req, res, next) => {
  try {
    const { dataUri } = req.body;
    // var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");
    const base64Data = dataUri.replace(/^data:image\/png;base64,/, '');

    fs.writeFile('./out.png', base64Data, 'base64', (err) => {
      console.log(err);
    });
    res.json({
      data: 'success',
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
