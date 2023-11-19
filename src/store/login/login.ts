import { Module } from "vuex";
import { ILoginState } from "./type";
import { IRootState } from "../type";

import { IAccount,IUserInfo } from "@/service/login/type";
import { accountLoginRequest, userInfoRequest, userMenuRequest } from "@/service/login/login";

import localCache from '@/utils/cache'
import router from "@/router";
import { mapMenuToRoutes, mapMenusToPermissions } from "@/utils/map-menus";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,//启用命名空间

  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: [],
      permissions:[]
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: IUserInfo) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu) {
      state.userMenu = userMenu
      //userMenus=>routes
      const routes = mapMenuToRoutes(userMenu)
      //将routes => router.main.children

      routes.forEach((route) => {
        router.addRoute('main',route)
      })
      console.log(routes);

      //获取按钮权限
      const permissions = mapMenusToPermissions(userMenu)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit,dispatch }, payload: IAccount) {
      //1.实现登录逻辑

      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken',token)
      localCache.setCache('token', token)

      //发送初始化请求(完整的role/department)
      dispatch('getInitialData', null, { root: true }) //调用根里面的action

      //2.用户验证

      const userInfoResult = await userInfoRequest(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      //3.请求用户菜单
      const userMenuResult = await userMenuRequest(id)
      const userMenu = userMenuResult.data
      commit('changeUserMenu', userMenu)
      localCache.setCache('userMenu', userMenu)

      //4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit,dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        //发送初始化请求(完整的role/department)
        dispatch('getInitialData', null, { root: true }) //调用根里面的action
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        commit('changeUserMenu', userMenu)
      }
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLoginAction',payload);
    }
  }
}

export default loginModule
