import { IRootState } from "@/store/type";
import { Module } from "vuex";
import { ISystemState } from "./types";
import { pageListRequest } from "@/service/main/system/system";
import _ from "lodash";


const systemModule: Module<ISystemState, IRootState> = {
  namespaced:true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount:0
    }
  },
  mutations: {
    changeUsersList(state,list) {
      state.usersList=list
    },
    changeUsersCount(state, count) {
      state.usersCount =count
    },
    changeRoleList(state,list) {
      state.roleList=list
    },
    changeRoleCount(state,list) {
      state.roleCount=list
    },
  },
  getters: {
    pageListData(state) {
      return (pageName:string) => {
        return (state as any) [`${pageName}List`]
      }
    }
  },
  actions: {
    async getPageListAciton({ commit }, payload) {
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
      commit(`change${changePageName}Count`,totalCount)
    }

  }
}

export default systemModule
