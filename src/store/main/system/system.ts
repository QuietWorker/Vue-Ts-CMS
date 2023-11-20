import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState } from './types'
import {
  createPageData,
  editPageData,
  pageListRequest
} from '@/service/main/system/system'
import { deletePageData } from '@/service/main/system/system'
import _ from 'lodash'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, list) {
      state.usersList = list
    },
    changeUsersCount(state, count) {
      state.usersCount = count
    },
    changeRoleList(state, list) {
      state.roleList = list
    },
    changeRoleCount(state, count) {
      state.roleCount = count
    },
    changeMenuList(state, list) {
      state.menuList = list
    },
    changeMenuCount(state, count) {
      state.menuCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    //查
    async getPageListAction({ commit }, payload) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // let pageUrl = ''
      // switch (pageName) {
      //   case 'user':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }
      const pageResult = await pageListRequest(pageUrl, payload.queryInfo)
      const list = pageResult.data.list
      const totalCount = pageResult.data.totalCount

      const changePageName = _.upperFirst(pageName)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },

    //删
    async deletePageDataAction({ dispatch }, payload) {
      //1.获取pageName 和 id
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      //2.调用网络请求
      await deletePageData(url)

      //3.重新请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //增
    async createPageDataAction({ dispatch }, payload) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      //调用网络请求
      await createPageData(pageUrl, newData)
      //3.重新请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //改
    async editPageDataAction({ dispatch }, payload) {
      const { pageName, id, editData } = payload
      const pageUrl = `/${pageName}/${id}`
      //调用网络请求

      await editPageData(pageUrl, editData)
      //3.重新请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
