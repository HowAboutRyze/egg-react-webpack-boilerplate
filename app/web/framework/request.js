'use strict';
import axios from 'axios';
// axios.defaults.baseURL = 'http://127.0.0.1:7001';
const instance = axios.create();
instance.defaults.timeout = 15000;
instance.defaults.xsrfHeaderName = 'x-csrf-token';
instance.defaults.xsrfCookieName = 'csrfToken';
instance.interceptors.response.use(
  // 请求成功
  res => {
    const result = res.data;
    if (result.result_code === 200) {
      return Promise.resolve(result);
    }
    const err = {
      message: typeof result === 'object' ? result.message : result,
      data: null
    }
    return Promise.resolve({ err });
  },
  // 请求失败
  error => {
    if (error.message.includes('timeout')) {
      console.log('请求超时啦')
    } else if (error.request.status === 404) {
      console.log('请求的链接不存在')
    } else if (error.request.status === 500) {
      console.log('服务器内部错误')
    } else {
      console.log(error)
    }
    const err = {
      message: typeof error === 'object' ? error.message : error,
      data: null
    }
    return Promise.resolve({ err });
  }
)

export default {
  async post(url, json, locals = {}) {
    const headers = {};
    if (EASY_ENV_IS_NODE) {
      headers['x-csrf-token'] = locals.csrf;
      headers.Cookie = `csrfToken=${locals.csrf}`;
    }
    const res = await instance.post(`${locals.origin}${url}`, json, { headers });
    return res;
  },
  async get(url, locals = {}) {
    const res = await instance.get(`${locals.origin}${url}`);
    return res;
  },
  async webPost(url, json) {
    const res = await instance.post(url, json);
    return res;
  },
  async webGet(url) {
    const res = await instance.get(url);
    return res;
  }
};