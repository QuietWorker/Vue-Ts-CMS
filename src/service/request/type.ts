import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface YYRequestInterceptors<T = AxiosResponse> {
  //拦截器
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface YYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YYRequestInterceptors<T>
  showLoading?: boolean
}
