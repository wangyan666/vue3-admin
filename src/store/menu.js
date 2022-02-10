/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-24 17:49:04
 * @LastEditors  : wy
 * @LastEditTime : 2022-02-09 21:51:42
 * @FilePath     : \\src\\store\\menu.js
 * @加油
 */
import { defineStore } from 'pinia'
import { findMenuList as findMenuListAPI } from '../api/layout.js'
import { createMenu as createMenuAPI, deleteMenu as deleteMenuAPI, updateMenu as updateMenuAPI, getPermissionMenu as getPermissionMenuAPI } from '../api/menu.js'
import { useUserStore } from './user.js'


export const useMenuStore = defineStore({
  id: 'menu',
  // persist
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: 'admin_menu',
  //       storage: localStorage
  //     }
  //   ]
  // },
  // state
  state: () => {
    return {
      menuList: [],
      permissionMenuList: [],
      routesLoaded: false
    }
  },

  // getters
  getters: {
    // 为嵌套对象，遍历追加一个editable属性，用于控制表格中是否进入编辑状态。
    menuListForTable: (state) => {
      appendAttrToTree(state.menuList)
      return state.menuList
    },
    // 拆平的权限菜单，供动态添加路由使用
    flatPermissionMenuList: (state) => {
      return flatTree(state.permissionMenuList)
    }
  },

  // actions:
  actions: {
    // 获取菜单数据
    async getMenu() {
      const res = await findMenuListAPI()
      this.menuList = res.data
    },

    // 根据角色列表获取对应菜单
    async getPermissionMenu(roles) {
      const userStore = useUserStore()
      if (userStore.userInfo.level === 0) { // 若为管理员，加载全部
        await this.getMenu()
        this.permissionMenuList = this.menuList
      } else {
        const res = await getPermissionMenuAPI({roles})
        this.permissionMenuList = res.data
      }
      this.routesLoaded = true
    },
   
    // 创建菜单
    async createMenu(data) {
      await createMenuAPI(data)
      await this.getMenu()
    },

    // 删除菜单
    async dropMenu(row) {
      const userStore = useUserStore()
      const idArr = loopDeleteId(row)
      await deleteMenuAPI({ idArr})
      await this.getMenu()
      if(userStore.userInfo.level === 1)
      await this.getPermissionMenu(userStore.userInfo.roles)
    },

    // 更新菜单
    async updateMenu(row) {
      // delete row.children // 剔除无用数据
      const userStore = useUserStore()
      if(row.isSwitch) row.active = row.active ^ 1
      await updateMenuAPI(row)
      await this.getMenu()
      if(userStore.userInfo.level === 1)
      await this.getPermissionMenu(userStore.userInfo.roles)
    },

  }
})


// 自定义函数，追加属性
const appendAttrToTree = (obj) => {
  obj.forEach(item => {
    item.editable = false
    item.children && item.children.length > 0 && appendAttrToTree(item.children)
  })
  return obj
}


// 递归，组合当前行及其子孙id
const loopDeleteId = (row) => {
  let arr = []
  arr.push(row.id)
  if(row.children && row.children.length > 0) {
    row.children.forEach(item => {
      arr = arr.concat(loopDeleteId(item))
    })
  }
  return arr
}

// flat
const flatTree = (tree) => {
  let arr = []
  tree.forEach(item => {
    arr.push(item)
    if(item.children?.length) {
      arr = [...arr, ...flatTree(item.children)]
    }
  })

  return arr
}