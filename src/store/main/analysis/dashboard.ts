import { Module } from "vuex";
import { IDashBoardState } from "./types";
import { IRootState } from "@/store/type";
import {
          getCategoryGoodsLFavor,
          getAddressGoodsSale,
          getCategoryGoodsCount,
          getCategoryGoodsSale
        } from "@/service/main/analysis/dashboard";

const dashboardModule: Module<IDashBoardState, IRootState> = {
  namespaced:true,
  state() {
    return {
        categoryGoodsCount: [],
        categoryGoodsSale: [],
        categoryGoodsFavor: [],
        addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state,list) {
      state.categoryGoodsCount=list
    },
    changeCategoryGoodsSale(state,list) {
      state.categoryGoodsSale=list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor=list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale=list
    },
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryGoodsRes = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryGoodsRes.data)
      const categorySaleRes = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale',categorySaleRes.data)
      const categoryFavorRes = await getCategoryGoodsLFavor()
      commit('changeCategoryGoodsFavor',categoryFavorRes.data)
      const cateAddressSaleRes = await getAddressGoodsSale()
      commit('changeAddressGoodsSale',cateAddressSaleRes.data)
    }
  }
}

export default dashboardModule
