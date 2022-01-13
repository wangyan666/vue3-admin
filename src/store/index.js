/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-13 13:12:14
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-13 13:48:18
 * @FilePath     : \\src\\store\\index.js
 * @加油
 */
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const pinia = createPinia()

pinia.use(piniaPluginPersist)

export default pinia
