/**
 * @Description  : 封装Axios
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-11 19:08:03
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-11 21:53:18
 * @FilePath     : \\src\\utils\\request.js
 * @加油
 */
import Axios from 'axios'
import config from '../config'
import router from '../router'

// create axios instance
const service = Axios.create({
  baseURL:
    config.MOCK && config.ENV !== 'production'
      ? config.MOCK_API
      : config.BASE_API,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  (request) => {
    // TODO JWT TOKEN
    return request
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const { code, message } = response.data
    if (code === 0) {
      return response.data
    } else if (code === 40001) {
      ElMessageBox.alert('用户身份过期，请重新登录！', 'Warning', {
        confirmButtonText: '确定',
        showClose: false,
        type: 'warning'
      }).then(() => {
        router.push('/login')
      })
    } else {
      // ElMessage.error(message || 'Error!')
      ElMessage.error('Oops, this is a error message.')
      return Promise.reject(new Error(message || 'Error!'))
    }
  },
  (error) => {
    console.log(error)
    ElMessage().error(error.message)
    return Promise.reject(error)
  }
)

export default service
