import LocalCache from '@/utils/cache'
import { firstRoute } from '@/utils/map-menus'
// import { firstRoute, mapMenuToRoutes } from '@/utils/map-menu'
import { createRouter, createWebHashHistory,RouteRecordRaw} from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'notFound',
      component: () => import('@/views/main/notFound/notFound.vue')
    }
  ]
})

// export function addRoutesWithMenu(menus: any) {
//   // 1.获取匹配到的所有的路由
//   const routes = mapMenuToRoutes(menus)

//   // 2.动态添加到router中
//   for (const route of routes) {
//     router.addRoute('main', route)
//   }
// }


router.beforeEach((to) => {
  const token = LocalCache.getCache('token')
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main'&& firstRoute) {
    return firstRoute.url
  }
})
// router.beforeEach((to) => {
//   const token = localCache.getCache('token')
//   if (to.path.startsWith('/main') && !token) {
//     return '/login'
//   }
//   if (to.path === '/login' && token) {
//     return '/main'
//   }
//   if (to.path === '/main' && firstRoute) {
//     return firstRoute.path
//   }
// })

export default router
