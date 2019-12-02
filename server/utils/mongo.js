const mongoose = require('mongoose');
const { uri } = require('../config/db');

mongoose.connect(uri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;


db.on('open', () => {
  // logger.info(`数据库连接成功 || 成功时间: ${Date()}`);
  console.log(`数据库连接成功 || 成功时间: ${Date()}`);
});

db.on('error', (error) => {
  console.log(`数据库连接失败 || 失败时间: ${Date()}`);
});

module.exports = db;
