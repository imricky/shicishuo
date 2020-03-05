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

// 名句数据模型
const MingjuSchema = new Schema({
  id: String,
  juId: String,
  content: String,
  poetId: String,
  poetName: String,
  poetryId: String,
  poetryName: String,
});
const MingjuPoets = mongoose.model('mingjuPoets', MingjuSchema);


// 历史每日一诗数据模型
const DailyPoemsSchema = new Schema({
  author: String,
  title: String,
  tags: Array,
  paragraphs: Array,
  id: String,
  updated: String,
  created: String,
  dailyParagraph: Object,
});
const DailyPoems = mongoose.model('dailypoems', DailyPoemsSchema);

module.exports = {
  AllPoets,
  DailyPoems,
  MingjuPoets,
};
