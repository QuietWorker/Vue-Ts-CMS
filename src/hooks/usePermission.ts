import { useStore } from "@/store";

export function usePermission(pageName:string,handleName:string) {
  const store = useStore()
  const permissions = [...store.state.login.permissions]

  const verifyPermission = `system:${pageName}:${handleName}`
  //因为要返回的是布尔值 所以两次非 可以得到布尔值
  //用find方法 找出和当前页面匹配的权限是否存在
  return !!permissions.find((permission:any) => permission === verifyPermission)
}
