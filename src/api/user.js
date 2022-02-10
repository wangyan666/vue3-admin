/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-13 11:48:37
 * @LastEditors  : wy
 * @LastEditTime : 2022-02-08 11:50:28
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
    mock: false
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
      url: `/user`,
      method: 'delete',
      data
    })
  }
  //
  return request({
    url: `/user/${data}`,
    method: 'delete'
  })
}

// 新建用户
export const createUser = (data) => {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

// 更新用户信息
export const updateUser = (id, data) => {
  return request({
    url: `/user/${id}`,
    method: 'patch',
    data
  })
}