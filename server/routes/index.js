const express = require('express');
const router = express.Router();
const CommonDao = require('../dao/commonDao');
const client = require('../utils/elasticsearch');
// const allpoets = require('./allpoets.json');
const { getSinglePoem } = require('../utils/spiderFlyingOrder');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/*
 *  author: imricky
 *  time: 2019/12/3 10:36 上午
 *  function: 搜索接口
*/

// router.post('/search', async (req, res, next) => {
//   try {
//     const { keyword } = req.body;
//     const data = await CommonDao.search();
//     res.json({
//       data,
//       code: 200,
//     });
//   } catch (e) {
//     res.json({
//       success: false,
//       errorMessage: e,
//       code: 500,
//     });
//   }
// });

// 测试查询接口
router.get('/st', async (req, res, next) => {
  try {
    const response = await client.search({
      index: 'cities',
      type: 'cities_list',
      body: {
        query: { match: { country: 'ZW' } },
      },
    });
    res.json({
      data: response.hits.hits,
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


router.get('/createMapping', (req, res, next) => {
  function checkIndices() {
    client.indices.exists({ index: 'users' }, (err, res, status) => {
      if (res) {
        console.log('index already exists');
      } else {
        // eslint-disable-next-line no-shadow
        client.indices.create({ index: 'users' }, (err, res, status) => {
          console.log(err, res, status);
        });
      }
    });
  }
  async function putMapping() {
    console.log('Creating Mapping index');
    await client.indices.putMapping({
      index: 'users',
      type: 'staff',
      body: {
        properties: {
          user: {
            type: 'text',
            analyzer: 'ik_max_word',
            search_analyzer: 'ik_max_word',
          },
          title: {
            type: 'text',
            analyzer: 'ik_max_word',
            search_analyzer: 'ik_max_word',
          },
          desc: {
            type: 'text',
            analyzer: 'ik_max_word',
            search_analyzer: 'ik_max_word',
          },
        },
      },
    }, (err, resp, status) => {
      if (err) {
        console.error(err, status);
      } else {
        console.log('Successfully Created Index', status, resp);
      }
    });
  }
  try {
    // checkIndices();
    // const response = await putMapping();
    const response = 1;
    res.json({
      data: response,
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


router.get('/pushDataInES', async (req, res, next) => {
  try {
    // checkIndices();
    // const response = await putMapping();
    // 声明一个名为bulk的空数组
    const bulk = [];
    // 循环遍历每个城市，并在每个循环中创建并将两个对象推入数组中
    // 第一个对象发送索引和类型，保存数据
    // 第二个对象是你想索引的数据
    [1].forEach((poem) => {
      bulk.push({
        index: {
          _index: 'tangsongpoems',
          _type: 'poems',
        },
      });
      bulk.push(poem);
    });
    // 对传递的数据执行批量索引
    const result = await client.bulk({ body: bulk });
    res.json({
      data: result,
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


router.get('/t1', (req, res) => {
  // 声明查询对象以搜索弹性搜索，并从找到的第一个结果中仅返回200个结果。
  // 还匹配其中名称与发送的查询字符串类似的任何数据
  const body = {
    size: 200,
    from: 0,
    query: {
      match: {
        paragraphs: req.query.q,
      },
    },
  };
  // 在索引中执行实际的搜索传递，搜索查询和类型
  client.search({ index: 'ci', body, type: 'cities_list' })
    .then((results) => {
      res.send(results.hits.hits);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
});

// 测试从mongodb导出的数据导入elastic
router.get('/queryTest', (req, res) => {
  // 声明查询对象以搜索弹性搜索，并从找到的第一个结果中仅返回200个结果。
  // 还匹配其中名称与发送的查询字符串类似的任何数据
  const body = {
    size: 200,
    from: 0,
    query: {
      multi_match: {
        query: req.query.q,
        // type: 'allpoets',
        fields: ['tags', 'authors', 'paragraphs'],
      },
    },
  };
  // const body1 = {
  //   size: 200,
  //   from: 0,
  //   query: {
  //     match: {
  //       paragraphs: req.query.q,
  //     },
  //   },
  // };
  // 在索引中执行实际的搜索传递，搜索查询和类型
  // client.search({ index: 'tangsongpoemsnew', body, type: 'allpoets' })
  //   .then((results) => {
  //     res.send(results.hits.hits);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send([]);
  //   });

  client.search({ index: ['tangsongpoemsnew', 'authors'], body })
    .then((results) => {
      res.send(results.hits.hits);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
});


// 正式搜索接口
router.get('/search', async (req, res, next) => {
  // 声明查询对象以搜索弹性搜索，并从找到的第一个结果中仅返回200个结果。
  // 还匹配其中名称与发送的查询字符串类似的任何数据
  const authorBody = {
    size: 20,
    from: 0,
    query: {
      match: {
        name: req.query.q,
      },
    },
  };
  const tagBody = {
    size: 50,
    from: 0,
    query: {
      match: {
        tags: req.query.q,
      },
    },
  };
  const poemBody = {
    size: 10,
    from: (req.query.page - 1) * 10,
    query: {
      multi_match: {
        query: req.query.q,
        fields: ['tags', 'author', 'paragraphs', 'title'],
      },
    },
  };
  // const poemBody = {
  //   size: 20,
  //   from: (req.query.page - 1) * 20,
  //   query: {
  //     bool: {
  //       should: [
  //         {
  //           match: {
  //             author: {
  //               query: req.query.q,
  //               // boost: 2,
  //             },
  //           },
  //         },
  //         {
  //           match: {
  //             paragraphs: req.query.q,
  //           },
  //         },
  //       ],
  //     },
  //   },
  // };
  try {
    const authors = await client.search({ index: 'authors', type: 'authors', body: authorBody });
    const tags = await client.search({ index: 'tangsongpoemsnew', type: 'allpoets', body: tagBody });
    const poems = await client.search({ index: 'tangsongpoemsnew', type: 'allpoets', body: poemBody });
    // res.send(tags);
    // 整合数据，一起放出来，做搜索的页面，分别是
    // authors 一位
    // tags 5个
    // 接下来是诗词分页
    // 上面2个用card，分页用列表
    const result = Object.create(null);
    result.authors = authors.hits;
    result.tags = tags.hits;
    result.poems = poems.hits;
    res.json({
      data: result,
      code: 200,
    });
  } catch (e) {
    res.json({
      code: 200,
      errMassage: e,
      data: '',
    });
  }
  // // 在索引中执行实际的搜索传递，搜索查询和类型
  // client.search({ index: ['tangsongpoemsnew', 'authors'], body })
  //   .then((results) => {
  //     res.send(results.hits.hits);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send([]);
  //   });
});

// 飞花令搜索接口
router.post('/flyingOrderSearch', async (req, res, next) => {
  // 声明查询对象以搜索弹性搜索，并从找到的第一个结果中仅返回200个结果。
  // 还匹配其中名称与发送的查询字符串类似的任何数据
  const body = {
    size: 10,
    from: (req.body.page - 1) * 10,
    query: {
      match: {
        paragraphs: req.body.keyword,
      },
    },
  };
  try {
    const poems = await client.search({ index: 'tangsongpoemsnew', type: 'allpoets', body });
    res.json({
      data: poems.hits,
      code: 200,
    });
  } catch (e) {
    res.json({
      code: 200,
      errMassage: e,
      data: '',
    });
  }
});


router.post('/getCommonWord', async (req, res, next) => {
  // 声明查询对象以搜索弹性搜索，并从找到的第一个结果中仅返回200个结果。
  // 还匹配其中名称与发送的查询字符串类似的任何数据
  const { type } = req.body;
  try {
    const commonWordList = await CommonDao.getCommonWord(type);
    res.json({
      data: commonWordList,
      code: 200,
    });
  } catch (e) {
    res.json({
      code: 200,
      errMassage: e,
      data: '',
    });
  }
});

module.exports = router;
