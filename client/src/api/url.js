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
  searchApi: `${baseURL}/poems/search`, // 搜索接口

  // 和用户相关的东西
  login: `${baseURL}/users/login`,
};
