/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-13 11:48:37
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-19 16:46:17
 * @FilePath     : \\src\\api\\user.js
 * @加油
 */

import request from '../utils/request.js'

// 用户登录
export const login = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
    mock: false
  })
}

// 获取用户列表
export const FindUserList = (params) => {
  return request({
    url: '/user/list',
    method: 'get',
    params,
    mock: true
  })
}

// 获取用户通知数量
export const getNoticeCount = () => {
  return request({
    url: '/users/noticeCount',
    methodL: 'get'
  })
}

// 删除用户, 批量或单个
export const deleteUser = (data) => {
  if (data instanceof Array) {
    return request({
      url: `users`,
      method: 'delete',
      data
    })
  }
  //
  return request({
    url: `users/${data}`,
    method: 'delete'
  })
}

// 新建用户
export const createUser = (data) => {
  return request({
    url: 'users',
    method: 'post',
    data
  })
}