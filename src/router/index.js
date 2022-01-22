/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-11 17:39:54
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-16 12:24:51
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
    meta: { title: '首页'},
    component: () => import('@/components/Layout.vue'),
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        meta: { title: '欢迎'},
        component: () => import('@/views/welcome/index.vue')
      },
      {
        name: 'user',
        path: '/system/user',
        meta: { title: '用户管理'},
        component: () => import('@/views/user/index.vue')
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
