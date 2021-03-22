/**
 * 用户相关请求模块
 */

import request from '@/utils/request'
import qs from 'qs'

interface UserLogin {
  phone: string;
  password: string;
}

export const login = (data: UserLogin) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    /**
     * axios默认发送的是 application/json 格式的数据
     * 修改为application/x-www-form-urlencoded数据格式的话，可以使用headers修改类型，并用qs.stringify修改提交数据,
     */
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // 如果 data 时普通对象，则 Content-Type 是 application/json
    // 如果经过 qs.stringify 转换后，key=value&key=value，则 Content-Type 会被设置为 application/x-www-form-urlencoded
    // 如果 data 是 FormData 对象(可用于上传文件)，则 Content-Type 是 Multipart/form-data
    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
// 获取用户分页数据
export const getUserPages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
// 禁用角色？
export const forbidUser = (userId: string | number) => {
  return request({
    method: 'POST',
    url: '/boss/user/forbidUser',
    params: {
      userId
    }
  })
}
