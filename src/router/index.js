import { createRouter, createWebHashHistory, useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useMenuStore } from '@/store/menu'
// ROUTES
const routes = [
  {
    path: '/',
    name: 'layout',
    meta: { title: '首页' },
    component: () => import('@/components/Layout.vue'),
    redirect: '/welcome'
    // children: [
    //   {
    //     name: 'welcome',
    //     path: '/welcome',
    //     meta: { title: '欢迎'},
    //     component: () => import('@/views/welcome/index.vue')
    //   },
    //   {
    //     name: 'user',
    //     path: '/system/user',
    //     meta: { title: '用户管理'},
    //     component: () => import('@/views/user/index.vue')
    //   },
    //   {
    //     name: 'menu',
    //     path: '/system/menu',
    //     meta: { title: '菜单管理'},
    //     component: () => import('@/views/menu/index.vue')
    //   },
    //   {
    //     name: 'role',
    //     path: '/system/role',
    //     meta: { title: '角色管理'},
    //     component: () => import('@/views/role/index.vue')
    //   }
    // ]
  },
  {
    name: 'login',
    path: '/login',
    meta: { title: '登录页' },
    component: () => import('@/views/login/index.vue')
  },
  {
    name: '404',
    path: '/404',
    meta: { title: '页面不见了' },
    component: () => import('@/views/404/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  const menuStore = useMenuStore()
  const userStore = useUserStore()
  if (to.path === '/login') {
    // 登录页直接next
    console.log(1)
    next()
  } else if (!userStore.userInfo?.token && to.path !== '/login') {
    // 若未登录且访问非登录页
    console.log(2)
    next('/login')
  } else if (!menuStore.routesLoaded) {
    console.log(3)
    try {
      await menuStore.getPermissionMenu(userStore.userInfo.roles)
      const routes = menuStore.flatPermissionMenuList.filter((route) => {
        return route.path && route.component && route.active
      })
      addRoute(routes)
      next({ ...to, replace: true })
    } catch (error) {
    }
  } else {
    console.log(4)
    if (router.hasRoute(to.name)) next()
    else next('/404')
  }
})

const addRoute = (routes) => {
  const modules = import.meta.glob('../views/**/*.vue') // 在这里常规方式的动态导入，vite不适用，因此这样
  routes.map((route) => {
    router.addRoute('layout', {
      name: route.component,
      path: route.path,
      meta: { title: route.menuName },
      component: modules[`../views/${route.component}/index.vue`]
    })
  })
}

export default router
