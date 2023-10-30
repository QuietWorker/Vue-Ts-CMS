//service 统一出口
import { BASE_URL, TIME_OUT } from "./request/config"
import { BASE_URL1 ,TIME_OUT1 } from "./config"
import YYRequest from "./request/request"
import localCache from '@/utils/cache'
const yyRequest = new YYRequest({
  baseURL: BASE_URL1,
  timeout: TIME_OUT1,
  interceptors: {
    requestInterceptor: (config) => {

      //携带token 的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }

  }
})

export default  yyRequest

