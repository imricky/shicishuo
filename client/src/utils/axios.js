import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store';
import router from '../router';
const $message = Message;


axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 30000; // 超时时间

// request拦截器，每次发送请求的时候拦截下来
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中
    debugger;
    if (store.state.user.token) {
      config.headers.Authorization = store.state.user.token;
    }
    return config;
  },
  err => Promise.reject(err),
);

// response拦截器，每次发送请求的时候拦截下来
axios.interceptors.response.use((response) => {
  console.log(response);
  if (response.data.status) {
    return Promise.resolve(response.data);
  }
  store.dispatch('showMassage', {
    type: 'error',
    message: response.data.message || response.data.msg || response.data.errMsg,
  });
  return Promise.reject(response);
}, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '错误请求';
        break;
      case 401:
        err.message = '未授权，请重新登录';
        store.dispatch('goLogin');
        break;
      case 403:
        err.message = '没有访问权限，拒绝访问';
        break;
      case 404:
        err.message = '请求错误,未找到该资源';
        break;
      case 405:
        err.message = '请求方法未允许';
        break;
      case 408:
        err.message = '请求超时';
        break;
      case 500:
        err.message = err.response.data.message;
        break;
      case 501:
        err.message = '网络未实现';
        break;
      case 502:
        err.message = '网络错误';
        break;
      case 503:
        err.message = '服务不可用';
        break;
      case 504:
        err.message = '网络超时';
        break;
      default:
        err.message = `连接错误${err.response.msg}`;
    }
  } else {
    err.message = '连接到服务器失败';
  }
  store.dispatch('showMassage', {
    type: 'error',
    data: err.message || err.response.msg,
  });
  return Promise.reject(err.response);
});

export default axios;
