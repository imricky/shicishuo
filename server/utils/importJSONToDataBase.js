// 处理mongodb数据

// 处理名句的数据
// 诗词存放仓库 github：https://github.com/chinese-poetry/chinese-poetry

const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
// const filePath = path.resolve(`${__dirname}/jsonFile`);

const filePath = path.resolve(__dirname, '../public/image');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/poets');
const db = mongoose.connection;
db.on('open', () => {
  console.log(`数据库连接成功 || 成功时间: ${Date()}`);
});

async function f() {
  const dir = await fsPromises.readdir(filePath);
  // eslint-disable-next-line no-restricted-syntax
  for (const item of dir) {
    console.log(item);
  }
  return 1;
}

f().then((r) => {
  console.log(r);
});

// {
//   "id": 322,
//     "juId": 334,
//     "content": "灵山多秀色，空水共氤氲。",
//     "poetId": 691,
//     "poetName": "张九龄",
//     "poetryId": 2777,
//     "poetryName": "湖口望庐山瀑布泉 / 湖口望庐山瀑布水"
// },
// 名句：
// const { Schema } = mongoose;
// const mingjuSchema = new Schema({
//   id: String,
//   juId: String,
//   content: String,
//   poetId: String,
//   poetName: String,
//   poetryId: String,
//   poetryName: String,
// });
// const Poet = mongoose.model('mingjuPoets', mingjuSchema);
// async function readJSON() {
//   const res = await fsPromises.readFile(`${filePath}/mingju.json`);
//   const temp = JSON.parse(res.toString());
//   console.log(temp[0]);
//   return temp;
// }
//
// readJSON().then((r) => {
//   Poet.collection.insertMany(r, (error, docs) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(docs.insertedCount);
//       db.close();
//     }
//   });
// });


// async function readDirFile() {
//   const all = [];
//   const dir = await fsPromises.readdir(filePath);
//   console.log(dir);
//   // eslint-disable-next-line no-restricted-syntax
//   for (const item of dir) {
//     // eslint-disable-next-line no-await-in-loop
//     const res = await fsPromises.readFile(`./jsonFile/${item}`);
//     console.log(item);
//     const temp = JSON.parse(res.toString());
//     // 如果是唐诗，那么加上标签tang，如果是宋词，加上标签song
//     const type = item.split('.')[1];
//     temp.forEach((i) => {
//       i.type = type;
//     });
//     all.push(...temp);
//   }
//   // return all
//   return all;
// }

// 临时打印代码
// readDirFile().then(res => {
//   console.log(res);
// })

// readDirFile().then((res) => {
//   for (let i = 0; i < res.length; i++) {
//     // eslint-disable-next-line no-use-before-define
//     res[i] = changeObj(res[i]);
//   }
//   return res;
// }).then((res) => {
//   Poet.collection.insertMany(res, (error, docs) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(docs.insertedCount);
//       db.close();
//     }
//   });
// });
