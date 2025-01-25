import axios from "axios";

// http request 拦截器
axios.interceptors.request.use(config => {
  // let token = ''
  // if (config.method == 'get') {
  //   if (!config.params) config.params = {};
  //   config.params = {
  //     ...config.params,
  //     token: token
  //   }
  // } else {
  //   if (!config.data) config.data = {}
  //   config.data.token = token;
  // }
  return config;
}, error => {
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(response => {
  // do something
  return response
}, error => {
  return Promise.reject(error)
})

const baseUrl = '';

export const get = (url: string, params: any) => axios.get(`${baseUrl}${url}?t=${new Date().getTime()}`, { params }).then(res => res.data)
export const post = (url: string, params: any) => axios.post(`${baseUrl}${url}`, params).then(res => res.data)