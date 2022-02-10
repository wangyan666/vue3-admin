import request from '@/utils/request.js'

// 查询角色列表
// export const findRoleList = () => {
//   return request({
//     url: 'layout/roleList',
//     method: 'get',
//   })
// }

// 新增角色
export const createRole = (data) => {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

// 删除角色
export const deleteRole = (id) => {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

// 更新角色
export const updateRole = (data) => {
  const { id } = data
  return request({
    url: `/role/${id}`,
    method: 'patch',
    data
  })
}

// 更新用户权限
export const updateRolePermission = (id, data) => {
  return request({
    url: `/role/permission/${id}`,
    method: 'patch',
    data
  })
}