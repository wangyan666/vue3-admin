/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-11 17:39:54
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-13 11:12:19
 * @FilePath     : \\src\\router\\index.js
 * @加油
 */

import { createRouter, createWebHashHistory } from 'vue-router'

// Level 1 routes

// Level 2 routes

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/components/Layout.vue'),
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        component: () => import('@/views/welcome/index.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
