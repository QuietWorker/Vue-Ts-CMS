import yyRequest from "@/service";

export function pageListRequest(pageUrl:string,queryInfo:any) {
  return yyRequest.post({
    url: pageUrl,
    data: queryInfo
  })
}
