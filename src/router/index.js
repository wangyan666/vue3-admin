/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-11 17:39:54
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-11 17:58:09
 * @FilePath     : \\src\\router\\index.js
 * @加油
 */

import { createRouter, createWebHashHistory } from 'vue-router'

// Level 1 routes
import Layout from '../components/Layout.vue'
import Login from '../components/Login.vue'

// Level 2 routes
import Welcome from '../components/Welcome.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
