const { User, UserCollections } = require('../models/userModel');

class UsersDao {
  // eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor() {
  }

  static async collect(userid, poemid) {
    // 先在数据库里找到是否存在该用户，不存在先新建一个userid，再进行收藏，存在的话则直接收藏
    const isExistUser = await UserCollections.find({ userid });
    if (isExistUser.length === 0) {
      const data = {
        userid,
      };
      const userNewResult = await new UserCollections(data).save();
      // save失败
      if (userNewResult.length === 0) {
        return [];
      }

      const res = await UserCollections.updateOne({ userid }, { $addToSet: { collections: poemid } });
      return res;
    }
    const res = await UserCollections.updateOne({ userid }, { $addToSet: { collections: poemid } });
    return res;

    // let query = { /* query */ };
    // let update = {expire: new Date()};
    // const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    // const res = await UserCollections.update({ userid }, { $addToSet: { collections: poemid } }, options);
    // return res;
  }

  /*
   *  @author: imricky(github.com/imricky)
   *  @time: 2019/12/16 10:58 上午
   *  @function: 获取用户收藏诗词列表
   *  @param: _id
   *  @return: 该用户收藏的列表
  */
  static async getCollectionsByUserId(_id) {
    const res = await UserCollections.find({ userid: _id });
    return res;
  }
}

module.exports = UsersDao;
