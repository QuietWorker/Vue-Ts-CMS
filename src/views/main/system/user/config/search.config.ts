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
          field:'password',
          type: 'password',
          label: '密码',
          rules: [],
          placeholder: '请输入密码'
        },
        {
          field:'sport',
          type: 'select',
          label: '喜欢的运动',
          rules: [],
          placeholder: '请选择喜欢的运动',
          options: [
            {
              value: '篮球',
              label: '篮球'
            },
            {
              value: '足球',
              label: '足球'
            },
            {
              value: '排球',
              label: '排球'
            },
            {
              value: '跑步',
              label: '跑步'
            },
          ]
        },
        {
          field:'createTime',
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
