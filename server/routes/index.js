const express = require('express');
const router = express.Router();
const CommonDao = require('../dao/commonDao');
const client = require('../utils/elasticsearch');
// const allpoets = require('./allpoets.json');

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
router.get('/searcht1', (req, res) => {
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
  client.search({ index: 'tangsongpoems', body, type: 'allpoets' })
    .then((results) => {
      res.send(results.hits.hits);
    })
    .catch((err) => {
      console.log(err);
      res.send([]);
    });
});

module.exports = router;
