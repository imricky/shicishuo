import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store/index';
import router from '../router';
const $message = Message;

// 有三种方式会导致这种现象：
//
// 1、请求方法不是GET/HEAD/POST
//
// 2、POST请求的Content-Type并非application/x-www-form-urlencoded, multipart/form-data, 或text/plain
//
// 3、请求设置了自定义的header字段

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 30000; // 超时时间

// request拦截器，每次发送请求的时候拦截下来
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中
    if (store.state.user.token) {
      config.headers.Authorization = `Bearer  ${store.state.user.token}`;
    }
    return config;
  },
  err => Promise.reject(err),
);

// response拦截器，每次发送请求的时候拦截下来
axios.interceptors.response.use((response) => {
  console.log(response);
  if (response.data.code) {
    return Promise.resolve(response);
  }
  // store.dispatch('showMassage', {
  //   type: 'error',
  //   message: response.data.message || response.data.msg || response.data.errMsg,
  // });
  return Promise.reject(response);
}, (err) => {
  if (err && err.response) {
    switch (err.response.code) {
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
      case 409:
        err.message = '发送冲突';
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
  // store.dispatch('showMassage', {
  //   type: 'error',
  //   data: err.message || err.response.msg,
  // });
  return Promise.reject(err.response);
});


/*
 *  author: imricky
 *  time: 2019/12/3 7:34 下午
 *  function: 封装get
*/
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            // 请求成功
            resolve(res);
          } else {
            // 请求错误
            reject(res);
          }
        } else {
          // 服务器错误
          console.log('服务器错误!');
          reject(res);
        }
      })
      .catch((error) => {
        // console.log('网络错误!');
        reject(error);
      });
  });
}

/*
 *  author: imricky
 *  time: 2019/12/3 7:34 下午
 *  function: 封装post
*/
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            // 请求成功
            resolve(res);
          } else {
            // 请求错误
            reject(res);
          }
        } else {
          // 服务器错误
          console.log('服务器错误!');
          reject(res);
        }
      })
      .catch((error) => {
        // console.log('网络错误!');
        reject(error);
      });
  });
}

// export default axios;
