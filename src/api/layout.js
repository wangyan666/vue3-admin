/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-17 15:25:08
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-21 15:58:26
 * @FilePath     : \\src\\api\\layout.js
 * @加油
 */

import request from '@/utils/request.js'

// 获取菜单
export const findMenuList = () => {
  return request({
    url: 'layout/menuList',
    method: 'get',
    mock: true
  })
}

// 角色列表
export const findRoleList = () => {
  return request({
    url: 'layout/roleList',
    method: 'get',
    mock: false
  })
}

// 部门列表
export const findDepartmentList = () => {
  return request({
    url: 'layout/departmentList',
    method: 'get',
    mock: false
  })
}