/**
 * @Description  : 封装localStorage
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-11 22:16:32
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-12 11:55:33
 * @FilePath     : \\src\\utils\\storage.js
 * @加油
 */

import { NAMESPACE } from '../config'

const storage = JSON.parse(window.localStorage.getItem(NAMESPACE) || '{}')

export default {
  getItem (key) {
    return storage[key]
  },
  setItem(key, value) {
    storage[key] = value
    window.localStorage.setItem(NAMESPACE, JSON.stringify(storage))
  },
  clearItem(key) {
    delete storage[key]
    window.localStorage.setItem(NAMESPACE, JSON.stringify(storage))
  },
  clearAll() {
    window.localStorage.removeItem(NAMESPACE)
  }
}