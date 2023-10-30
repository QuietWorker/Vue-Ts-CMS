import { IBreadcrumbItems } from "@/base-ui/breadcrumb";
import { RouteRecordRaw } from "vue-router";

let firstRoute:any = null
export function mapMenuToRoutes(userMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1.加载默认的所有routes
  const allRoutes: RouteRecordRaw[] = []

  const routeFiles = require.context('@/router/main', true, /\.ts/)

  //require.context()是webpack提供,可以用来创建上下文,我们可以通过调用它返回请求上下文函数对象中keys()方法拿到目标文件夹中的所有目标文件
  //第二个参数表示要不要进行递归查找

  routeFiles.keys().forEach((key) => {

        /* console.log(key);
        ./analysis/dashboard/dashboard.ts
        ./analysis/overview/overview.ts
        ./product/category/category.ts
        ./product/goods/goods.ts
        ./story/chat/chat.ts
        ./story/list/list.ts
        ./system/department/department.ts
        ./system/menu/menu.ts
        ./system/role/role.ts
        ./system/user/user.ts */

    //加载某个具体文件

    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)

  })
  console.log(allRoutes);
  //2.根据菜单获取需要添加的routes

  //从userMenu中拿到菜单信息后 判断里面的type是否等于2 如果等于2就进行添加 否则进行递归查询children中type等于2的菜单,再进行路由添加
  //type=== 1 ->children ->继续往下判断type
  //type=== 2 url ->route
  //在内部封装一个递归函数
  const _recurseRoute=(menus:any[]) => {
    for (const menu of menus) {
      //type =2 的菜单才是本项目中用户点击后需要进行路由映射的菜单
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstRoute) {
          firstRoute = menu
        }
      }
      else {
        _recurseRoute(menu.children)
      }
    }
  }
  _recurseRoute(userMenu)

  return routes
}

export function pathMapBreadCrumb(userMenu: any[], currentPath: string): any{
  const breadcrumbs: IBreadcrumbItems[] = []
  pathMapToMenu(userMenu,currentPath,breadcrumbs)
  return breadcrumbs
}


export function pathMapToMenu(userMenu: any[], currentPath: string , breadcrumbs?:IBreadcrumbItems[]):any{
  for (const menu of userMenu) {
    if (menu.type === 1) {
      //递归
      //menu.chilren有可能是undefined 不能进行遍历
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name})
        breadcrumbs?.push({ name: findMenu.name})
        return findMenu
      }
    }else if(menu.type===2&&menu.url ===currentPath){
      return menu
    }
  }
}

export {firstRoute}
// export function pathMapBreadCrumb(userMenu: any[], currentPath: string): any{
//   const breadcrumbs: IBreadcrumbItems[] = []


//   for (const menu of userMenu) {
//     if (menu.type === 1) {
//       //递归
//       //menu.chilren有可能是undefined 不能进行遍历
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.url })
//         breadcrumbs.push({ name: findMenu.name,path:findMenu.url})
//         return findMenu
//       }
//     }else if(menu.type===2&&menu.url ===currentPath){
//       return menu
//     }
//   }

//   return breadcrumbs
// }


// export function pathMapToMenu(userMenu: any[], currentPath: string):any{
//   for (const menu of userMenu) {
//     if (menu.type === 1) {
//       //递归
//       //menu.chilren有可能是undefined 不能进行遍历
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     }else if(menu.type===2&&menu.url ===currentPath){
//       return menu
//     }
//   }
// }
