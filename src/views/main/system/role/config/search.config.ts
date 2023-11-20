import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
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
    },

    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      rules: [],
      placeholder: '请选择创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  itemStyle: {
    padding: '10px 40px'
  },
  lableWidth: '120px',
  colLayout: {
    span: 8
  }
}
