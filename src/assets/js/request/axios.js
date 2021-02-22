/* eslint-disable */
import axios from 'axios';
import store from '../../../store';
// import {
//   Toast
// } from 'vant' //引入vant组件
import { Loading, Message } from 'element-ui';
const options = { //loading参数
  lock: false,
  text: '拼命加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0)',
  customClass: 'load'
}
let loadingInstance = null;
// axios.defaults.baseURL = 'https://app.hntamu.com/api/';// 正式服务器域名
axios.defaults.baseURL = 'http://192.168.199.111:3000/'; // 测试服务器域名
axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    //请求拦截添加全局加载并把sessionStorage的token添加到请求头里
    let token = store.state.token;
    if (token) {
      config.headers.common['Authorization'] = token;
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)
axios.interceptors.response.use(data => {
  const code = data.data.code;
  if (code == 401) { //未登录
    Message({ message: data.data.message, type: 'error', showClose: true, duration: 1000 });
    window.location.href = '/'
  }
  //return 数据
  return data.data
}, error => {
  //接口报错失败后 提示错误 并关闭提示
  Message({ message: "网络不给力,请稍后重试哟~", type: 'error', showClose: true, duration: 1000 });
  return Promise.reject(error)
})
function request(url, method, data = {}, params = {}, boolean) {
  if (boolean) {
    loadingInstance = Loading.service(options);
  }
  return new Promise((resolve, reject) => {
    return axios({
      url: `${url}`,
      method,
      data,
      params
    }).then(async (res) => {
      if (loadingInstance) {
        loadingInstance.close();
      }
      if (res.code === 200) {
        resolve(res)
      } else if (res.code === 2000) {
        Message({ message: res.message, type: 'error', showClose: true, duration: 1000 });
      } else if (res.code === 1) {
        Message({ message: res.message, type: 'error', showClose: true, duration: 1000 });
      } else if (res.code === 2024) {
        window.location.href = '/'
      } else {
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export function GET(url, datas, boolean = true) {
  return request(`${url}`, 'get', {}, { ...datas }, boolean)
}

export function POST(url, data, boolean = true) {

  return request(`${url}`, 'post', data, {}, boolean)
}

export function PUT(url, data, boolean = true) {
  return request(`${url}`, 'put', data, {}, boolean)
}

export function DELETE(url, data, boolean = true) {
  return request(`${url}`, 'delete', data, {}, boolean)
}
