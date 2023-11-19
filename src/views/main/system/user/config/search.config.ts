import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
      formItem: [
        {
          field: 'id',
          type: "input",
          label: 'id',
          rules: [],
          placeholder:'请输入id'
        },
        {
          field:'name',
          type: 'input',
          label: '用户名',
          rules: [],
          placeholder: '请输入用户名'
        },
        {
          field:'realname',
          type: 'input',
          label: '真实姓名',
          rules: [],
          placeholder: '请输入真实姓名'
        },
        {
          field:'cellphone',
          type: 'input',
          label: '电话号码',
          rules: [],
          placeholder: '请输入电话号码'
        },
        {
          field:'enable',
          type: 'select',
          label: '用户状态',
          rules: [],
          placeholder: '请选择用户状态',
          options: [
            {
              value: 1,
              label: '启用'
            },
            {
              value: 0,
              label: '禁用'
            }
          ]
        },
        {
          field:'createAt',
          type: 'datepicker',
          label: '创建时间',
          rules: [],
          placeholder: '请选择创建时间',
          otherOptions: {
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间',
            type: 'daterange'
          }
        },
      ],
      itemStyle: {
        padding: '10px 40px'
      },
      lableWidth: '120px',
      colLayout: {
        span: 8
      }
    }
