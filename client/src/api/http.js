import { get, post } from '@/utils/request';
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

  // 搜索接口
  search(keyword) {
    return post(Url.searchApi, { keyword });
  }
}

export default new Http();