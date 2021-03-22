import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

const request = axios.create({
  // 配置选项
  // baseURL基本路径、timeout超时
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 通过修改 config 配置信息来实现业务功能的统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }

  // 必须返回 config，否则请求发不出去
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
let isRefreshing = false // 控制刷新 token 的状态 为了处理 如果有多个刷新token请求同时发出，只有第一个会成功，后面的都会失败 的问题。
let requests: Function[] = [] // 存储刷新 token 期间过来的 401 请求
request.interceptors.response.use(function (response) {
  // 响应成功 状态码为2xx 会进入这里
  // 如果是自定义状态码，错误处理也会进入这里
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) { // 响应失败 超出2xx状态码 会进入这里
  if (error.response) { // 请求收到响应了，但是状态码超出2xx
    // 常见错误状态码
    // 400 请求参数错误
    // 401 未授权
    // 403 无权限
    // 404 未找到
    // 500 服务器错误
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token无效（无token、token无效、token过期）
      // 如果没有 refresh_token 跳转登录页
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
      if (!isRefreshing) { // 防止同时多次刷新token
        isRefreshing = true // 开启 刷新token 状态
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 Token 失败')
          }
          // 刷新 token 成功
          store.commit('setUser', res.data.content)
          // 把 requests 中的请求发出去 然后清空requests
          requests.forEach(cb => cb())
          requests = []
          return request(error.config)
        }).catch(err => {
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          isRefreshing = false // 重置 刷新token 状态
        })
      }
      // 刷新状态下，把请求挂起 放入requests数组中
      // 感觉比较高深的异步Promise代码
      // 是因为这里的代码都要返回Promise吗？不太理解。不知道用普通的回调应该怎么做。
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
      // try {
      //   const { data } = await axios.create()({
      //     method: 'POST',
      //     url: '/front/user/refresh_token',
      //     data: qs.stringify({
      //       refreshtoken: store.state.user.refresh_token
      //     })
      //   })
      //   // 成功了 -> 把本地失败的请求重新发出去
      //   // 更新用户状态
      //   store.commit('setUser', data.content)
      //   // 重新发送请求 error.config 为失败请求的配置信息
      //   return request(error.config)
      // } catch (error) {
      //   // 清除当前登录用户状态
      //   store.commit('setUser', null)
      //   // 失败了 -> 跳转登录页
      //   redirectLogin()
      //   return Promise.reject(error)
      // }
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去了，但是没有收到响应 (网络超时，断开)
    Message.error('请求超时，请刷新重试')
  } else { // 设置请求时发生了一些事情，触发了可能未知的错误
    Message.error('请求失败:' + error.message)
  }

  // 把错误对象继续抛出，扔给下一个上一个调用者
  return Promise.reject(error)
})

export default request
