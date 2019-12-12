const moment = require('moment');
const _ = require('lodash');
const { TangPoets, DailyPoems } = require('../models/poemsModel');
const { jiebaSeparateVerse, compare } = require('../utils/tools');
const { logger } = require('../utils/logger');

class Poem {
  // eslint-disable-next-line no-empty-function,no-useless-constructor
  constructor() {
  }

  /*
   *  author: imricky
   *  time: 2019/12/2 4:31 下午
   *  function:生成每日一诗
  */
  static async generateDailyPoem() {
    // 先看dailypoems数据库里是否存在当天的数据,存在则直接返回
    const currentDay = moment(new Date()).format('YYYY-MM-DD');
    const currentDailyPoem = await DailyPoems.find({ created: currentDay });
    if (currentDailyPoem.length !== 0) {
      logger.info(`${currentDailyPoem}`);
      return currentDailyPoem;
    }
    // mongodb随机查询一条
    const res = await TangPoets.aggregate([
      { $sample: { size: 1 } },
    ]);
    res[0].created = currentDay;
    res[0].updated = currentDay;
    // 判断是否存在tags，若没有，则调用分词，然后在标签库里取3个词出来，然后反向存入原来的诗词中
    if (res[0].tags === void 0 || res[0].tags.length === 0) {
      const SeparateResult = jiebaSeparateVerse(res[0].paragraphs);
      const tagsAll = await TangPoets.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', num_of_tag: { $sum: 1 } } },
        { $project: { _id: 0, tags: '$_id', num_of_tag: 1 } },
        { $sort: { num_of_tag: -1 } }]);
      // 选出原本的tags里存在的分词
      const pushArr = [];
      for (let i = 0; i < SeparateResult.length; i++) {
        for (let j = 0; j < tagsAll.length; j++) {
          if (tagsAll[j].tags === SeparateResult[i]) {
            pushArr.push(tagsAll[j]);
          }
        }
      }
      // 再根据tags数量进行排序，取前四
      let result;
      if (pushArr.length > 5) {
        result = pushArr.sort(compare('num_of_tag')).slice(0, 5);
      } else {
        result = pushArr.sort(compare('num_of_tag'));
      }

      const finalTags = result.reduce((acc, val) => {
        acc.push(val.tags);
        return acc;
      }, []);
      res[0].tags = finalTags;
      // 向原来数据库中存入诗词
      if (finalTags.length !== 0) {
        // eslint-disable-next-line no-underscore-dangle
        await TangPoets.updateOne({ id: res[0].id }, { $set: { tags: finalTags } });
      }
    }

    // 向每日一诗中存入得到的诗词
    const insertDailyPoem = await new DailyPoems(res[0]).save();
    logger.info(insertDailyPoem);
    return insertDailyPoem;
  }

  /*
   *  author: imricky
   *  time: 2019/12/2 7:56 下午
   *  function: 获取历史每日一诗推荐，只取最近的前10条
   *  获取的时候去掉paragraphs字段和id字段
  */
  static async getHistoryDailyPoem() {
    const res = await DailyPoems
      .find({}, { paragraphs: 0, id: 0 })
      .limit(10)
      .sort({ created: -1 })
      .exec();
    const totalCount = await DailyPoems
      .find()
      .countDocuments();
    return {
      res,
      totalCount,
    };
  }

  /*
   *  author: imricky
   *  time: 2019/12/2 4:33 下午
   *  function: 根据标签查找对应的诗句
   *  params: tagName:标签名，page: 当前页数
  */

  static async getPoemsByTags(tagName, page) {
    const res = await TangPoets
      .find({ tags: tagName })
      .skip(page * 10)
      .limit(10)
      .sort({ _id: -1 })
      .exec();

    const totalCount = await TangPoets
      .find({ tags: tagName })
      .countDocuments();

    return {
      res,
      totalCount,
    };
  }

  /*
   *  author: imricky
   *  time: 2019/12/2 5:20 下午
   *  function: 根据作者名称获取诗词，带分页
  */
  static async getPoemsByAuthor(author, page) {
    const res = await TangPoets
      .find({ author })
      .skip(page * 10)
      .limit(10)
      .sort({ _id: -1 })
      .exec();

    const totalCount = await TangPoets
      .find({ author })
      .countDocuments();

    return {
      res,
      totalCount,
    };
  }


  /*
   *  author: imricky
   *  time: 2019/12/2 5:50 下午
   *  function: 获取top50的标签，方便点击
   *  参数：tagName: 可以是   author,tags ，统计top50
   *  return 返回数据类型：[{"写景":123},{"庐山":456}]    [{"白居易":123},{"杜甫":456}]
  */
  static async getHotTop50List(type) {
    const allTags = await TangPoets.aggregate([
      // eslint-disable-next-line no-useless-escape
      { $unwind: `$${type}` },
      {
        $group: { _id: `$${type}`, count: { $sum: 1 } },
      },
    ]).sort({ count: -1 })
      .limit(50);
    return allTags;
  }

  /*
*  author: imricky
*  time: 2019/12/2 8:06 下午
*  function: 根据前端传过来的_id ，获取完整的一首诗，用于每日一诗中点击标题，右侧展示完整诗句
*/
  static async getOneInfo(_id) {
    const res = await TangPoets.find({ _id });
    return {
      res,
    };
  }

  /*
   *  author: imricky
   *  time: 2019/12/2 8:34 下午
   *  function: 获取数据库里的汇总信息，用于文库大全里左侧获取信息
   *  总共有多少首诗句，共多少位诗人，排名前10的诗人 ...
  */
  static async getDatabaseAllInfo() {
    // 作者总数
    const authorCount = await TangPoets.aggregate([
      { $project: { author: true } },
      { $group: { _id: '$author' } },
      { $group: { _id: 'count', count: { $sum: 1 } } },
    ]);

    // 诗词总数
    const poemCount = await TangPoets.countDocuments();

    // 排名前10的诗人,出现了无名氏和不详，需要去掉
    const top10Poem = await TangPoets.aggregate([
      // eslint-disable-next-line no-useless-escape
      { $unwind: '$author' },
      {
        $group: { _id: '$author', count: { $sum: 1 } },
      },
    ]).sort({ count: -1 })
      .limit(12);

    const top10PoemArr = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < top10Poem.length; i++) {
      // eslint-disable-next-line no-underscore-dangle
      if (top10Poem[i]._id !== '无名氏' && top10Poem[i]._id !== '不详') {
        top10PoemArr.push(top10Poem[i]);
      }
    }

    return {
      authorCount,
      poemCount,
      top10PoemArr,
    };
  }

  static async search(keyword) {
    // TODO:搜索接口需要大改造，根据不同内容，显示不同的东西，结合es进行搜索，后期可能需要花1个星期来处理
    const res = await TangPoets.find({
      $or: [{ author: `${keyword}` }, { title: `${keyword}` }, { paragraphs: `${keyword}` }, { tags: `${keyword}` }],
    }).limit(20);
    return res;
  }
}
module.exports = Poem;