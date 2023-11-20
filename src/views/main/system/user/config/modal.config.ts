import { IForm } from '@/base-ui/form'
export const modalTableConfig: IForm = {
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      rules: [],
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      rules: [],
      placeholder: '请输入电话号码'
    },
    {
      field: 'password',
      type: 'password',
      label: '用户密码',
      rules: [],
      placeholder: '请输入用户密码',
      isHidden: true
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '所属部门',
      rules: [],
      placeholder: '请选择用户部门',
      options: [{}, {}]
    },
    {
      field: 'roleId',
      type: 'select',
      label: '用户角色',
      rules: [],
      placeholder: '请选择用户角色',
      options: [{}, {}]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
