const mongoose = require('mongoose');
const { Schema } = mongoose;

// 常见飞花令数据
const CommonWordSchema = new Schema({
  author: String,
  title: String,
  type: String,
  paragraph: String,
});
const CommonWord = mongoose.model('commonflyingorder', CommonWordSchema);

module.exports = {
  CommonWord,
};
