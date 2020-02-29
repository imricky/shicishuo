import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import * as io from 'socket.io-client';
import App from './App.vue';
import router from './router';
import store from './store';
import websiteConfig from './utils/websiteConfig';
// eslint-disable-next-line import/extensions
import './plugins/element.js';
// eslint-disable-next-line import/order
// 引入公共样式
import './common/style/index.scss';
// eslint-disable-next-line import/order
import animated from 'animate.css';
import PoemMethods from './common/js/poemMethods';

Vue.use(animated);
// 某个例子是这样使用的：https://github.com/dalailomo/vue-socket-io-example/blob/master/src/main.js
// Vue.use(VueSocketIO, io('http://localhost:1234'), store);
// 官网用法：
// { transports: ['websocket'] }
Vue.use(new VueSocketIO({
  debug: true,
  // connection: io('https://wss.rqcao.com'), // options object is Optional
  connection: io(websiteConfig.websocketUrl), // options object is Optional
  vuex: {
    store,
    // actionPrefix: 'SOCKET_',
    // mutationPrefix: 'SOCKET_',
  },
}));

Vue.prototype.$collect = PoemMethods.collect; // 诗词收藏函数
Vue.prototype.$EventBus = new Vue();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
