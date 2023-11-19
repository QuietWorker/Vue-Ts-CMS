import { ILoginState } from "./login/type"
import { IDashBoardState } from "./main/analysis/types"
import { ISystemState } from "./main/system/types"

export interface IRootState{
  name: string
  age: number,
  allDepartments: any[]
  allRoles: any[]
  allMenus: any[]
}
export interface IStateWithModule{
  login: ILoginState
  system: ISystemState
  dashboard : IDashBoardState
}

// 定义一个交叉类型（既包含 IRootState 中的属性，又包含 IRootWithModule 中的属性）
export type IStoreType = IRootState & IStateWithModule
