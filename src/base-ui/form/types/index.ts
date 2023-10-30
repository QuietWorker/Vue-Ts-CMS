type FormItemType = "input"|"password"|"select"|"datepicker"

export interface IFormItem{
  field:string
  type:FormItemType
  label: string
  rules?: []
  placeholder: any
  options?: any
  otherOptions?:any
}


export interface IForm{
  formItem: IFormItem[]
  lableWidth?: string
  itemStyle?: Object
  colLayout?:any
}
