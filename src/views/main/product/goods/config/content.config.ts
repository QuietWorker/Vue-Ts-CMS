
export const contentTableConfig = {
  title:'商品列表',
  propList : [
      { prop: 'name', label: '商品名称', minWidth: '100'},
      { prop: 'oldPrice', label: '原价', minWidth: '50' ,slotName:'oldPrice'},
      { prop: 'newPrice', label: '现价', minWidth: '50', slotName:'newPrice' },
      { prop: 'status', label: '状态', minWidth: '60' ,slotName:'status' },
      { prop: 'imgUrl', label: '商品图片', minWidth: '100' , slotName:'image' },
      { prop: 'createAt', label: '创建时间', minWidth: '250',slotName:'createTime' },
      { prop: 'updateAt', label: '更新时间', minWidth: '250',slotName:'updateTime'},
      { label: '操作', minWidth: '150', slotName: 'opreate' }
  ],
  showIndexColumn: true,
  showSelectColumn:true
}
