import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      rules: [],
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      rules: [],
      placeholder: '请输入权限介绍'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
