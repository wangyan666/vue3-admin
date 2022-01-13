/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-13 11:48:37
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-13 12:00:50
 * @FilePath     : \\src\\api\\index.js
 * @加油
 */

import request from '@/utils/request.js'

export const login = (params) => {
    return request({
      url: '/users/login',
      method: 'post',
      data: params
    })
}
