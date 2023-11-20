import yyRequest from '@/service'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return yyRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return yyRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsLFavor() {
  return yyRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return yyRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
