const nodejieba = require('nodejieba');
const _ = require('lodash');
/*
 *  author: imricky
 *  time: 2019/12/4 11:47 上午
 *  function: 给诗句分词,输出一个数组
*/
function jiebaSeparateVerse(paragraphsArr) {
  let result = nodejieba.cut(paragraphsArr);
  result = _.flattenDeep(result);
  result = [...new Set(result)];
  return result;
}

// 对数组里的对象进行排序
function compare(property) {
  // eslint-disable-next-line func-names
  return function (obj1, obj2) {
    const value1 = obj1[property];
    const value2 = obj2[property];
    return value1 - value2; // 升序
  };
}


module.exports = {
  jiebaSeparateVerse,
  compare,
};
