import yyRequest from "../index";

import { IAccount,ILoginResult,IDataType, IUserInfo} from "./type";

enum LoginAPI {
  Account = '/login',
  UserInfo = '/users/',
  UserMenu = '/role/'
}

export function accountLoginRequest(account:IAccount){
  return yyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.Account,
    data: account
  })
}
export function userInfoRequest(id:number) {
  return yyRequest.get<IDataType<IUserInfo>>({
    url: LoginAPI.UserInfo + id
  })
}

export function userMenuRequest(id: number) {
  return yyRequest.get<IDataType>({
    url: LoginAPI.UserMenu + id + '/menu'
  })
}




