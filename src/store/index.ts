import { Store, createStore, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
import product from './main/product/product'
import dashboard from './main/analysis/dashboard'
import { pageListRequest } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'yyt',
      age: 18,
      allRoles: [],
      allDepartments: [],
      allMenus: []
    }
  },

  modules: {
    login,
    system,
    product,
    dashboard
  },
  mutations: {
    changeAllDepartment(state, list) {
      state.allDepartments = list
    },
    changeAllRole(state, list) {
      state.allRoles = list
    },
    changeAllMenu(state, list) {
      state.allMenus = list
    }
  },
  actions: {
    async getInitialData({ commit }) {
      //请求部门数据并保存到vuex中
      const departmentResult = await pageListRequest('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      commit('changeAllDepartment', departmentList)

      //请求角色数据并保存到vuex中
      const roleResult = await pageListRequest('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit('changeAllRole', roleList)

      //请求菜单树数据并保存到vuex中

      const menuResult = await pageListRequest('/menu/list', {
        offset: 0,
        size: 1000
      })
      const { list: menuList } = menuResult.data
      commit('changeAllMenu', menuList)
    }
  }
})

export default store

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialData') //应该放到token获取后才调用
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
