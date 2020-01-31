const mongoose = require('mongoose');
const { Schema } = mongoose;

// 诗词数据模型
const PoemsSchema = new Schema({
  // _id: { type: String, unique: true },
  author: String,
  title: String,
  tags: Array,
  paragraphs: Array,
  id: String,
  type: String,
});
const AllPoets = mongoose.model('allpoets', PoemsSchema);


// 历史每日一诗数据模型
const DailyPoemsSchema = new Schema({
  author: String,
  title: String,
  tags: Array,
  paragraphs: Array,
  id: String,
  updated: String,
  created: String,
});
const DailyPoems = mongoose.model('dailypoems', DailyPoemsSchema);

module.exports = {
  AllPoets,
  DailyPoems,
};
