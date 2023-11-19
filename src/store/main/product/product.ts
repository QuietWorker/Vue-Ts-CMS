import { IRootState } from "@/store/type";
import { Module } from "vuex";
import { IProductState } from "./type";
import { pageListRequest } from "@/service/main/system/system";


const productModule: Module<IProductState,IRootState> = {
  namespaced: true,
  state(){
    return {
      goodsList: [],
      goodsCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName:string) => {
        return (state as any) [`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName:string) => {
        return (state as any) [`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeGoodsList(state,goodsList:any) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state,goodsCount:any) {
      state.goodsCount = goodsCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      const pageResult = await pageListRequest(pageUrl, payload.queryInfo)
      const list = pageResult.data.list
      const totalCount = pageResult.data.totalCount

      commit('changeGoodsList', list)
      commit('changeGoodsCount',totalCount)
    }
  }

}
export default productModule
