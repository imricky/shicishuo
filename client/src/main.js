import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// eslint-disable-next-line import/extensions
import './plugins/element.js';
// eslint-disable-next-line import/order
// 引入公共样式
import './common/style/index.scss';
// eslint-disable-next-line import/order
import animated from 'animate.css';
import PoemMethods from './common/js/poemMethods';

Vue.use(animated);
Vue.prototype.$collect = PoemMethods.collect; // 诗词收藏函数
Vue.prototype.$EventBus = new Vue();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
