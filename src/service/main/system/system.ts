import yyRequest from "@/service";
import { IDataType } from "@/service/login/type";

export function pageListRequest(pageUrl:string,queryInfo:any) {
  return yyRequest.post<IDataType>({
    url: pageUrl,
    data: queryInfo
  })
}
//url: /users/id
export function deletePageData(url:string) {
  return yyRequest.delete<IDataType>({
    url: url
  })
}
//url:/users

export function createPageData(url: string, newData: any) {
  return yyRequest.post<IDataType>({
    url: url,
    data:newData
  })
}

export function editPageData(url: string, editData: any) {
  return yyRequest.patch<IDataType>({
    url: url,
    data:editData
  })
}
