const mongoose = require('mongoose');
const { User, UserCollections } = require('../models/userModel');
const { ObjectId } = mongoose.Types;

class CommonDao {
  // eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor() {
  }

  // TODO: 所有Dao方法加上try catch
  // 搜索接口
  static async search(userid, poemid) {
    // 先在数据库里找到是否存在该用户，不存在先新建一个userid，再进行收藏，存在的话则直接收藏
    try {
      const a = await 'test api';
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
        { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        { value: '胖仙女纸杯蛋糕（上海凌空店）', address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        { value: '豪大大香鸡排超级奶爸', address: '上海市嘉定区曹安公路曹安路1685号' },
      ];
      // eslint-disable-next-line no-unreachable
    } catch (e) {
      console.log(e);
    }
  }


}

module.exports = CommonDao;
