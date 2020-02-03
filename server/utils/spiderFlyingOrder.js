/*
 *  @author: imricky(github.com/imricky)
 *  @time: 2020/2/3 7:25 下午
 *  @function: 爬取知乎的一些常见飞花令存入MongoDB
 *  @param:
 *  @return:
*/
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Unicode = {
  stringify(str) {
    const res = [];
    const len = str.length;

    for (let i = 0; i < len; ++i) {
      res[i] = (`00${str.charCodeAt(i).toString(16)}`).slice(-4);
    }

    return str ? `\\u${res.join('\\u')}` : '';
  },

  parse(str) {
    str = str.replace(/\\/g, '%');
    return unescape(str);
  },
};

function pushParagraphToArr(result) {
  const paragraph = `${result.split('。')[0]}。`;
  let author = '';
  let title = '';
  if (result.includes('——')) {
    // eslint-disable-next-line prefer-destructuring
    author = result.split('——')[1].match(/(.*?)《/)[1];
    // eslint-disable-next-line prefer-destructuring
    title = result.split('——')[1].match(/《(.*?)》/)[1];
  }
  const obj = {};
  obj.paragraph = paragraph;
  obj.author = author;
  obj.title = title.replace('%uB7', '·');
  obj.type = '江';
  return obj;
}


// 花：https://zhuanlan.zhihu.com/p/40053653
// 月：https://zhuanlan.zhihu.com/p/41761284
// 人：https://zhuanlan.zhihu.com/p/84953725
// 天：https://zhuanlan.zhihu.com/p/86011214
// 雨：https://zhuanlan.zhihu.com/p/85835857
// 春：https://zhuanlan.zhihu.com/p/85663599
// 江：https://zhuanlan.zhihu.com/p/86184149
async function getSinglePoem() {
  try {
    let final = [];
    const res = await axios.get('https://zhuanlan.zhihu.com/p/86184149');
    const html = res.data;
    const $ = cheerio.load(html);
    // 适用于另一个样式的
    // $('.Post-RichText').find('p').each((i, e) => {
    //   const temp = $(e).html();
    //   // const result = unescape(temp.replace(/&#x/g, '\\u').replace(/\\u/g, '%u'));
    //   let result = temp.replace(/&#x/g, '\\u');
    //   result = Unicode.parse(result);
    //   result = result.split(';').join('');
    //   if (result.includes('<br>')) {
    //     result.split('<br>').reduce((total, curValue, curIndex, arr) => {
    //       final.push(pushParagraphToArr(curValue));
    //     });
    //   } else {
    //     final.push(pushParagraphToArr(result));
    //   }
    // });
    $('.Post-RichText').find('p').each((i, e) => {
      const temp = $(e).html();
      // const result = unescape(temp.replace(/&#x/g, '\\u').replace(/\\u/g, '%u'));
      let result = temp.replace(/&#x/g, '\\u');
      result = Unicode.parse(result);
      result = result.split(';').join('');
      // final.push(pushParagraphToArr(result));
      final.push(result);
    });

    // eslint-disable-next-line no-const-assign
    final = final.slice(1, final.length - 1);
    // 特殊处理江这个字
    final = final.filter(i => !i.includes('春来江水绿如蓝。能不忆江南？'));
    console.log(final);
    final = final.reduce((total, curValue, curIndex, arr) => {
      const a = curIndex % 2 ? null : arr[curIndex] + arr[curIndex + 1];
      total.push(a);
      return total;
    }, []).filter(Boolean);
    final = final.map(i => pushParagraphToArr(i));
    console.log(final);
    console.log(final.length);
    return final;
  } catch (e) {
    console.log(e);
  }
}

const CommonFlyingOrderSchema = new Schema({
  author: String,
  title: String,
  paragraph: String,
  type: String,
});
// const CommonFlyingOrder = mongoose.model('commonflyingorder', CommonFlyingOrderSchema);
//
// getSinglePoem().then((res) => {
//   CommonFlyingOrder.insertMany(res).then((r) => {
//     console.log(r);
//     console.log('r');
//   });
// }).catch((e) => {
//   console.log(e);
// });

// getSinglePoem();

module.exports = { getSinglePoem };
