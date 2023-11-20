export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100', slotName: 'userName' },
    {
      prop: 'realname',
      label: '真实姓名',
      minWidth: '100',
      slotName: 'realName'
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      minWidth: '100',
      slotName: 'phone'
    },
    { prop: 'enable', label: '状态', minWidth: '60', slotName: 'enable' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createTime'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateTime'
    },
    { label: '操作', minWidth: '150', slotName: 'opreate' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
