/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-13 13:13:36
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-19 12:46:43
 * @FilePath     : \\src\\store\\user.js
 * @加油
 */
import { defineStore } from "pinia"

export const useUserStore = defineStore({
  id: 'user',
  // persist
  // ! note: 使用后就不能在该文件里直接修改state进行调试了，要先去localstorage删了。
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'admin_user',
        storage: localStorage
      }
    ]
  },
  // state
  state: () => {
    return {
      userInfo: {}
    }
  },

  // actions:
  actions: {
    updateUserInfo (userInfo) {
      this.userInfo = userInfo
    }
  }
})