 import { defineStore } from "pinia"
import { findRoleList as findRoleListAPI } from "../api/layout"
import { deleteRole as deleteRoleAPI } from '../api/role.js'
 export const useRoleStore = defineStore({
   id: 'role',
   // persist
   persist: {
     enabled: true,
     strategies: [
       {
         key: 'admin_role',
         storage: localStorage
       }
     ]
   },
   // state
   state: () => {
     return {
       roleList: []
     }
   },
 
   // actions:
   actions: {
     // 获取角色列表
     async getRoleList() {
       const res = await findRoleListAPI()
       this.roleList = res.data
     },

     // 删除角色
     async deleteRole(id) {
        await deleteRoleAPI(id)
        await this.getRoleList()
     }
   }
 })