const baseURL = 'http://localhost:3000';

// eslint-disable-next-line import/prefer-default-export
export const Url = {
  getDailyPoemApi: `${baseURL}/poems/getDailyPoem`, // 获取每日一诗
  getHistoryDailyPoemApi: `${baseURL}/poems/getHistoryDailyPoem`, // 获取历史每日一诗推荐表，分页
  getPoemsByTagsApi: `${baseURL}/poems/getPoemsByTags`, // 根据tags 获取诗词
  getPoemsByAuthorApi: `${baseURL}/poems/getPoemsByAuthor`, // 根据作者获取诗词
  getHotTop50ListApi: `${baseURL}/poems/getHotTop50List`, // 获取热门的前50的tags
  getOneInfoApi: `${baseURL}/poems/getOneInfo`, // 根据前端传过来的_id ，获取完整的一首诗，用于每日一诗中点击标题，右侧展示完整诗句
  getDatabaseAllInfoApi: `${baseURL}/poems/getDatabaseAllInfo`, // 获取数据库里的汇总信息
  exploreGoodPoemAllApi: `${baseURL}/poems/exploreGoodPoemAll`, // 探索诗词页面获取Top20的接口
  getPoemListApi: `${baseURL}/poems/getPoemList`, // 获取诗词总数的页面
  getAllTagsApi: `${baseURL}/poems/getAllTags`, // 获取所有标签


  // 和用户相关的东西
  login: `${baseURL}/users/login`,
  register: `${baseURL}/users/register`,
  getCollectionsByUserIdApi: `${baseURL}/users/getCollectionsByUserId`, // 获取当前用户的收藏诗词
  getUserInfoApi: `${baseURL}/users/getUserInfo`, // 获取当前用户的信息
  updateUserInfoApi: `${baseURL}/users/updateUserInfo`, // 更新用户信息
  collectApi: `${baseURL}/users/collect`, // 用户收藏


  // 公共接口
  searchApi: `${baseURL}/search`, // 搜索接口
  flyingOrderSearchApi: `${baseURL}/flyingOrderSearch`, // 飞花令搜索接口
  getCommonWordApi: `${baseURL}/getCommonWord`, // 获取常用飞花令接口
};
