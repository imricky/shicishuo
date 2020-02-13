import Vue from 'vue';
import Vuex from 'vuex';
import { Message } from 'element-ui';
const $message = Message;

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

    // 你画我猜 聊天记录
    chats: [{
      type: 'word',
      talker: 'crq1',
      message: '我猜测是月落乌啼霜满天我猜测是月落乌啼霜满天',
      time: '02-13 11:10',
    }, {
      type: 'word',
      talker: 'crq1',
      message: '我猜测是月落乌啼霜满天我猜测是月落乌啼霜满天',
      time: '02-13 11:10',
    }, {
      type: 'word',
      talker: 'crq1',
      message: '我猜测是月落乌啼霜满天我猜测是月落乌啼霜满天',
      time: '02-13 11:10',
    }, {
      type: 'info',
      // talker: 'crq1',
      message: 'crq2 加入房间',
      time: '02-13 11:10',
    }, {
      type: 'info',
      // talker: 'crq1',
      message: 'ricky 加入房间',
      time: '02-13 13:20',
    }], // 暂时用来记录右侧聊天信息，人员进入信息，人员答题信息的列表
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
    showMassage(state, data) {
      $message({
        message: data.message,
        type: data.type,
        duration: 3000,
      });
    },

    // 你画我猜的方法
    // 更新聊天列表
    updateChatList(state, data) {
      state.chats.push(data);
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

    showMassage({ commit }, data) {
      commit('showMassage', data);
    },

    updateChatList({ commit }, data) {
      commit('updateChatList', data);
    },

  },
  getters: {
    chatList: state => state.chats,
  },
});
