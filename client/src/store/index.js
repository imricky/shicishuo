import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menubarActiveIndex: 'DailyPoem', // 菜单默认每日一诗
    user: {
      _id: window.localStorage.getItem('_id') || '',
      username: window.localStorage.getItem('username') || '',
      token: window.localStorage.getItem('token') || '',
      avatar: window.localStorage.getItem('avatar') || '',
    },
  },

  mutations: {
    updateMenubarActiveIndex(state, data) {
      state.menubarActiveIndex = data;
    },

    saveUserToken(state, data) {
      state.user._id = data._id;
      state.user.username = data.username;
      state.user.token = data.token;
      state.user.avatar = data.avatar;

      window.localStorage.setItem('_id', data._id);
      window.localStorage.setItem('username', data.username);
      window.localStorage.setItem('token', data.token);
      window.localStorage.setItem('avatar', data.avatar);
    },

    removeUserToken(state, data) {
      state.user._id = '';
      state.user.username = '';
      state.user.token = '';
      state.user.avatar = '';
      /* eslint no-underscore-dangle: 0 */
      window.localStorage.removeItem('_id');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('avatar');
    },
  },
  actions: {
    updateMenubarActiveIndex({ commit }, data) {
      commit('updateMenubarActiveIndex', data);
    },
    /*
     *  @author: imricky(github.com/imricky)
     *  @time: 2019/12/12 1:47 下午
     *  @function: 登录成功的时候保存用户的token和信息，放在window.localStorage里
     *  @param: state data
     *  @return:
    */
    saveUserToken({ commit }, data) {
      commit('saveUserToken', data);
    },
    /*
     *  @author: imricky(github.com/imricky)
     *  @time: 2019/12/12 1:48 下午
     *  @function: 注销的时候，移除掉token
     *  @param:
     *  @return:
    */
    removeUserToken({ commit }, data) {
      commit('removeUserToken', data);
    },
  },
  getters: {

  },
});
