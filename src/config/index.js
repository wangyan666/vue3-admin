/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-11 18:08:45
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-11 18:23:36
 * @FilePath     : \\src\\config\\index.js
 * @加油
 */

const env = import.meta.env.MODE || 'production'
const EnvConfig = {
  development: {
    baseAPI: '/',
    mockAPI: 'https://www.fastmock.site/mock/a6f9321fb41cf3f88398d3ac62a8df3e/vue3-admin'
  },
  test: {
    baseAPI: '/',
    mockAPI: 'https://www.fastmock.site/mock/a6f9321fb41cf3f88398d3ac62a8df3e/vue3-admin'
  },
  production: {
    baseAPI: '/',
    mockAPI: 'https://www.fastmock.site/mock/a6f9321fb41cf3f88398d3ac62a8df3e/vue3-admin'
  }
}

export default {
  env,
  mock: true,
  ...EnvConfig[env]
}