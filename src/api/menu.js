/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-26 15:52:29
 * @LastEditors  : wy
 * @LastEditTime : 2022-02-08 12:08:14
 * @FilePath     : \\src\\api\\menu.js
 * @加油
 */

import request from '../utils/request.js'

// 新建菜单
export const createMenu = (data) => {
  return request({
      url: '/menu',
      method: 'post',
      data
    })
}
// 删除菜单
export const deleteMenu = (data) => {
  return request({
    url: `/menu`,
    method: 'delete',
    data
  })
}

// 编辑菜单
export const updateMenu = (data) => {
  const { id } = data
  return request({
    url: `/menu/${id}`,
    method: 'patch',
    data
  })
}

// 根据角色列表获取对应菜单
export const getPermissionMenu = (params) => {
  return request({
    url: '/menu/permission',
    method: 'get',
    params
  })
}