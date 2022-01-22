/**
 * @Description  : 封装Axios
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-11 19:08:03
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-19 13:21:25
 * @FilePath     : \\src\\utils\\request.js
 * @加油
 */
import Axios from 'axios'
import config from '../config'
import router from '../router'
import { useUserStore } from '../store/user'
// create axios instance
const service = Axios.create({
  baseURL: config.BASE_API,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  (request) => {
    const userStore = useUserStore()
    const { token } = userStore.$state.userInfo
    if (token) request.headers.authorization = `Bearer ${token}`
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 处理timeout
    if (error.message.includes('timeout')) {
      ElMessage.error('请求超时，请稍后重试！')
      return Promise.reject(new Error('timeout!'))
    }
    const { status } = error.response
    const { code, message } = error.response.data
    if (status === 401 && code === 40001) {
      ElMessageBox.alert('用户身份过期，请重新登录！', 'Warning', {
        confirmButtonText: '确定',
        showClose: false,
        type: 'warning'
      }).then(() => {
        router.push('/login')
      })
    } else if (status === 402 && code === 40002) {
      // ElMessage.error(message || 'Error!')
      ElMessage.error('账号或密码错误！')
      return Promise.reject(new Error(message || 'Error!'))
    } else {
      ElMessage.error('服务器内部异常，请稍后重试！')
      return Promise.reject(new Error(message || 'Error!'))
    }
  }
)

// export default service

// export default (url, method, submitData) => {
//   return service({
//     url,
//     method,
//     [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
//   })
// }
export default (options) => {
  service.defaults.baseURL = config.BASE_API
  if (config.MOCK === true) service.defaults.baseURL = config.MOCK_API
  if (options.mock === true) service.defaults.baseURL = config.MOCK_API
  return service(options)
}
