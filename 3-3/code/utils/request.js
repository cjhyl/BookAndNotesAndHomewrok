/**
 * 基于 axios 封装的请求模块
 */

import axios from 'axios'
 
const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

//请求拦截器
// request.interceptors.request.use(function (config) {
//   config.headers.Authorization = 'Token '+''
//   return config
// },function (error) {
//   //请求还没发出时候失败时 进入这里
//   return Promise.reject(error)
// })

//响应拦截器

export default request