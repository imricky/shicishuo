import { get, post } from '@/utils/axios';
import { Url } from './url';

class Http {
  // 获取每日一首诗 | GET
  getDailyPoem() {
    return get(Url.getDailyPoemApi);
  }

  // 获取历史每日一诗推荐表，分页
  getHistoryDailyPoem() {
    return get(Url.getHistoryDailyPoemApi);
  }

  // 根据tags 获取诗词
  getPoemsByTags(tagName, page = 1) {
    return post(Url.getPoemsByTagsApi, { tagName, page });
  }

  // 根据作者获取诗词
  getPoemsByAuthor(author, page = 1) {
    return post(Url.getPoemsByAuthorApi, { author, page });
  }

  // 获取热门的前50的tags
  getHotTop50List(type) {
    return post(Url.getPoemsByAuthorApi, { type });
  }

  // 根据前端传过来的_id ，获取完整的一首诗
  getOneInfo(_id) {
    return post(Url.getOneInfoApi, { _id });
  }

  // 获取数据库里的汇总信息
  getDatabaseAllInfo() {
    return get(Url.getDatabaseAllInfoApi);
  }


  // 探索诗词页面获取Top20的接口
  exploreGoodPoemAll() {
    return get(Url.exploreGoodPoemAllApi);
  }

  // 获取诗词总数列表
  getPoemList(page = 1) {
    return post(Url.getPoemListApi, { page });
  }

  getAllTags(page = 1) {
    return post(Url.getAllTagsApi, { page });
  }


  // ********************************************************************************************
  // ***********************************以下是关于用户的方法*****************************************
  // ********************************************************************************************
  /*
   *  @author: imricky(github.com/imricky)
   *  @time: 2019/12/12 4:50 下午
   *  @function: 分割开,
   *  @param:
   *  @return:
  */
  login(data) {
    return post(Url.login, data);
  }

  register(data) {
    return post(Url.register, data);
  }

  getCollectionsByUserId(_id, page = 1) {
    return post(Url.getCollectionsByUserIdApi, { _id, page });
  }

  getUserInfo(_id) {
    return post(Url.getUserInfoApi, { _id });
  }

  updateUserInfo(_id, username) {
    return post(Url.updateUserInfoApi, { _id, username });
  }

  collect(userid, poemid) {
    return post(Url.collectApi, { userid, poemid });
  }


  // 公共方法
  // 搜索接口
  search(keyword, page = 1) {
    return get(`${Url.searchApi}/?q=${keyword}&page=${page}`);
  }

  flyingOrderSearch(keyword, page = 1) {
    return post(Url.flyingOrderSearchApi, { keyword, page });
  }

  getCommonWord(type) {
    return post(Url.getCommonWordApi, { type });
  }
}

export default new Http();
