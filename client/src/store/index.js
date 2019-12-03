import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menubarActiveIndex: 'DailyPoem', // 菜单默认每日一诗
  },
  mutations: {
    updateMenubarActiveIndex(state, data) {
      state.menubarActiveIndex = data;
    },
  },
  actions: {
  },
  modules: {
  },
});
