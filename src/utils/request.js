//axios拦截器处理ajax请求
import axios from "axios";
import store from '../store';
import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: "/api/", // url = base url + request url
  // request timeout
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求前添加token请求头
    if (localStorage.getItem("token") != null) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
      console.log(config)
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.data.result.status == 1000) {
      Message({
        message: response.data.result.message,
        type: 'success',
      })
    }
    if (response.data.result.status === 1002) {
      Message({
        message: response.data.result.message,
        type: 'warning',
        duration: 2000
      })
    } else if (response.data.result.status == 1001) {
      Message({
        message: response.data.result.message,
        type: 'error',
        duration: 2000
      })
    } else if (response.data.result.status == 1003) {
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(() => {
        //跳转登录
        store.dispatch("myself/Logout").then(() => {
          location.href = '/login';
        })
      }).catch(() => { });
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    }
    return response;
  },
  // 拦截axios请求处理token过期问题
  error => {
    console.log('请求错误',error)
    Message({
      message: '网络超时！',
      type: 'error',
      duration: 2000
    })
    return Promise.reject(error)
  }
);

export default service;