/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-11 18:08:45
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-19 12:54:08
 * @FilePath     : \\src\\config\\index.js
 * @加油
 */

const ENV = import.meta.env.MODE || 'production'
const EnvConfig = {
  development: {
    BASE_API: '/api/',
    MOCK_API: 'https://www.fastmock.site/mock/a6f9321fb41cf3f88398d3ac62a8df3e/vue3-admin/api'
  },
  test: {
    BASE_API: '/api/',
    MOCK_API: 'https://www.fastmock.site/mock/a6f9321fb41cf3f88398d3ac62a8df3e/vue3-admin/api'
  },
  production: {
    BASE_API: '/api/',
  }
}

export default {
  ENV,
  MOCK: false,
  ...EnvConfig[ENV],
  NAMESPACE: 'vue3-admin'
}