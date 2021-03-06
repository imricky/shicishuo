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
      type: 'info',
      // talker: 'crq1',
      message: 'crq2 加入房间',
      time: '02-13 11:10',
    }], // 暂时用来记录右侧聊天信息，人员进入信息，人员答题信息的列表

    // 你画我猜当前房间信息，需要根据房间去同步画板
    roomInfo: {
      roomNo: '', // 房间号
      roomName: '', // 房间名称
      creator: '', // 房间的创建者
      creatorId: '', // 创建者的唯一id
      max: '', // 最大人数
      online: 0, // 在线人数
      onLineList: [], // 在线列表
      isPrivate: false, // 是否为私密
      created: '', // 房间创建时间
      guessQuestion: '', // 房间猜测的问题
      guessAnswerPeople: '', // 答对问题的人
    },

    // 诗说FM 拍照之后的推荐音乐tracks列表，用于播放上一首 下一首
    faceMusic: {
      trackIds: [],
      currentPlaySongId: '', // 当前播放的音乐名称，用于上一首和下一首
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
    // 更新房间创建者信息
    updateRoomInfoCreator(state, data) {
      state.roomInfo.roomNo = data.roomNo;
      state.roomInfo.creator = data.creator;
      state.roomInfo.creatorId = data.userId; // 暂时没有同步，如果要加上，需要先在数据里加入
      state.roomInfo.max = data.max;
      state.roomInfo.roomName = data.roomName;
      state.roomInfo.online = data.online;
      state.roomInfo.isPrivate = data.isPrivate;
      state.roomInfo.created = data.created;
      // 把创建者push进去
      state.roomInfo.onLineList = data.onLineList;
    },

    updateRoomOnlineList(state, data) {
      state.roomInfo.online += 1;
      state.roomInfo.onLineList.push(data);
    },

    removeRoomOnlineListWithParticipant(state, data) {
      state.roomInfo.online -= 1;
      const index = state.roomInfo.onLineList.findIndex(p => p.username === data.username);
      state.roomInfo.onLineList.splice(index, 1);
    },

    leaveRoom(state, data) {
      state.roomInfo = {
        roomNo: '', // 房间号
        roomName: '', // 房间名称
        creator: '', // 房间的创建者
        creatorId: '', // 创建者的唯一id
        max: '', // 最大人数
        online: 0, // 在线人数
        onLineList: [], // 在线列表
        isPrivate: false, // 是否为私密
        created: '', // 房间创建时间
        guessQuestion: '', // 房间猜测的问题
        guessAnswerPeople: '', // 答对问题的人
      };
      state.chats = [];
    },

    updateMusicTrackIds(state, data) {
      state.faceMusic.trackIds = data.trackIds;
      state.faceMusic.currentPlaySongId = data.songId;
    },
    updateCurrentPlaySongId(state, data) {
      state.faceMusic.currentPlaySongId = data;
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

    updateRoomInfoCreator({ commit }, data) {
      commit('updateRoomInfoCreator', data);
    },

    updateRoomOnlineList({ commit }, data) {
      commit('updateRoomOnlineList', data);
    },

    // 参与人退出的时候，刷新vuex
    removeRoomOnlineListWithParticipant({ commit }, data) {
      commit('removeRoomOnlineListWithParticipant', data);
    },

    // 离开房间时，要重置chats和roomInfo
    leaveRoom({ commit }, data) {
      commit('leaveRoom', data);
    },


    // 诗说FM 更新音乐列表的方法
    updateMusicTrackIds({ commit }, data) {
      commit('updateMusicTrackIds', data);
    },

    updateCurrentPlaySongId({ commit }, data) {
      commit('updateCurrentPlaySongId', data);
    },
  },
  getters: {
    // 聊天列表
    chatList: state => state.chats,
    // 当前播放歌曲位于歌单的哪个位置
    currentSongIndex: (state) => {
      let index = 0;
      for (let i = 0; i < state.faceMusic.trackIds.length; i++) {
        if (state.faceMusic.currentPlaySongId === state.faceMusic.trackIds[i].id) {
          index = i;
          break;
        }
      }
      return index;
    },
  },
});
