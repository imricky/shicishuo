import axios from 'axios';

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
          if (res.data || !res.data.code) {
            // 请求成功
            resolve(res.data);
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
          if (res.data || !res.data.code) {
            // 请求成功
            resolve(res.data);
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
