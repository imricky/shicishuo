const moment = require('moment');
const _ = require('lodash');
const rp = require('request-promise');
const { AllPoets, DailyPoems } = require('../models/poemsModel');
const { jiebaSeparateVerse, compare } = require('../utils/tools');
const { logger } = require('../utils/logger');
const { faceApiSecretKey } = require('../config/jwtSecret');

class faceMusicDao {
  // eslint-disable-next-line no-empty-function,no-useless-constructor
  constructor() {
  }

  /*
   *  @author: imricky(github.com/imricky)
   *  @time: 2020/2/25 4:52 下午
   *  @function: 根据人脸识别的结果在数据库中生成一条数据返回
   *  @param:
   *  @return:
  */
  static async generateOneSuggestPoem() {
    // mongodb随机查询一条
    const res = await AllPoets.aggregate([
      { $match: { tags: /年级/ } },
      { $sample: { size: 1 } },
    ]);
    return res;
  }

  static facePlusPlusAnalyse(dataUri) {
    const options = {
      method: 'POST',
      uri: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
      formData: {
        // Like <input type="text" name="name">
        name: 'Jenn',
        api_key: 'qiKn4HOgRIU7K574uknu1DdcQTK2PnJz',
        api_secret: faceApiSecretKey,
        image_base64: dataUri,
        return_attributes: 'gender,emotion,age,smiling',
        // Like <input type="file" name="file">
      },
      headers: {
        /* 'content-type': 'multipart/form-data' */ // Is set automatically
      },
    };
    return new Promise(((resolve, reject) => {
      rp(options).then((res) => {
        resolve(res);
      }).catch((e) => {
        reject(e);
      });
    }));
  }


  /*
   *  @author: imricky(github.com/imricky)
   *  @time: 2020/2/26 3:16 下午
   *  @function: 根据face++ 的笑容分析结果，获取网易云音乐的一首歌曲，得到url和 pic
   *
   *  @param: smileNo (笑容指数)
   *  @return: {code:200,songInfo:{songUrl,songPic,currentList(当前歌单的信息，下一首的时候直接去随机获取一首歌单里的信息)}}
  */
  static async getNeteaseOneSongBySmileNumber(smileNo) {
    try {
      const playListId = await this.getPlayListIdBySmile(smileNo);
      const playListDetailList = await this.getPlayListDetailById(playListId);
      const songInfo = await this.getOneSongByPlayListTracksOrSongId(playListDetailList);
      return songInfo;
    } catch (e) {
      throw new Error(e);
    }
  }

  // 根据笑容指数返回歌单id
  static async getPlayListIdBySmile(smile) {
    let cat = '';
    const playListId = '2903485039';
    switch (smile) {
      case (smile > 0 && smile < 10):
        cat = '治愈';
        break;
      case (smile >= 10 && smile < 30):
        cat = '轻音乐';
        break;
      case (smile >= 30 && smile < 60):
        cat = '轻音乐';
        break;
      case (smile >= 60 && smile < 90):
        cat = '轻音乐';
        break;
      case (smile >= 90 && smile < 100):
        cat = '轻音乐';
        break;
      default:
        cat = '流行';
    }

    const options = {
      uri: 'http://localhost:5000/top/playlist',
      qs: {
        cat,
        limit: 10,
        order: 'hot',
      },
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true, // Automatically parses the JSON string in the response
    };

    const res = await rp(options);
    const randomIndex = Math.floor(Math.random() * 10);
    const { id } = res.playlists[randomIndex];
    return id;
  }

  /*
   *  @author: imricky(github.com/imricky)
   *  @time: 2020/2/26 4:14 下午
   *  @function: 根据歌单id找出歌曲详情里的歌曲列表
   *  @param: id
   *  @return: List
  */
  static async getPlayListDetailById(id) {
    const options = {
      uri: 'http://localhost:5000/playlist/detail',
      qs: {
        id,
      },
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true, // Automatically parses the JSON string in the response
    };
    const res = await rp(options);
    return res.playlist.trackIds;
  }

  /*
   *  @author: imricky(github.com/imricky)
   *  @time: 2020/2/26 4:23 下午
   *  @function: 根据trackIds列表返回歌曲信息
   *  @param: trackIds 列表
   *  @param: songCurrentId 当前song的一个id，用于点击上一首或者下一首找到歌曲
   *  @return:
  */
  static async getOneSongByPlayListTracksOrSongId(trackIds = [], selectedSongId = '') {
    let songId = '';
    if (selectedSongId === '') {
      const randomIndex = Math.floor(Math.random() * trackIds.length);
      songId = trackIds[randomIndex].id;
    } else {
      songId = selectedSongId;
    }


    const songInfo = {
      src: '',
      pic: '',
      author: '',
      title: '',
      trackIds,
      songId,
    };
    const mainOptions = {
      uri: 'http://localhost:5000/song/detail',
      qs: {
        ids: songId,
      },
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true, // Automatically parses the JSON string in the response
    };
    // 获取歌曲的一些其他信息
    const mainRes = await rp(mainOptions);
    songInfo.pic = mainRes.songs[0].al.picUrl;
    songInfo.author = mainRes.songs[0].ar[0].name;
    songInfo.title = mainRes.songs[0].name;

    const urlOptions = {
      uri: 'http://localhost:5000/song/url',
      qs: {
        id: songId,
      },
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true, // Automatically parses the JSON string in the response
    };
    // 获取url
    const urlRes = await rp(urlOptions);
    songInfo.src = urlRes.data[0].url;
    return songInfo;
  }
}
module.exports = faceMusicDao;
