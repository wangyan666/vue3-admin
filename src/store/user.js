/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-13 13:13:36
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-13 13:51:34
 * @FilePath     : \\src\\store\\user.js
 * @加油
 */
import { defineStore } from "pinia"

export const useUserStore = defineStore({
  id: 'user',
  // persist
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