// http://123.207.32.32:7888/api/hy66
import axios from "axios"
import { AxiosInstance } from "axios"
import type { YYRequestInterceptors, YYRequestConfig } from "./type"
import { ElLoading } from 'element-plus'

import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-loading.css'

const DEFAULT_LOADING = true
class YYRequest {
  //创建多个instance实例
  instance: AxiosInstance
  interceptors?: YYRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: YYRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? true
    this.interceptors = config.interceptors
    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //添加所有实例都有的拦截器

    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器:请求拦截成功');
        this.loading = ElLoading.service({
          lock: true,
          text: "正在请求数据....",
          background: 'rgba(0,0,0,.8)'
        })
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器:请求拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将 loading 效果移除

        this.loading?.close()
        // console.log('所有的实例都有的拦截器:响应拦截成功')
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败');
        } else {
          return data
        }
      },
      (err) => {
        // 将 loading 效果移除
        setTimeout(() => {
          this.loading?.close()
        }, 5000);
        // console.log('所有的实例都有的拦截器:响应拦截失败')
        if (err.response.status === 404) {
          console.log('404的错误信息');
        }
        return err
      }
    )
  }

  request<T>(config: YYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === true) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }


          //将showLoading设置true 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 将结果 resolve 返回出去
          resolve(res)
        })
        .catch((err) => {
          //将showLoading设置true 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: YYRequestConfig<T>): Promise<T>{
    return this.request<T>({...config,method:"GET"})
  }
  post<T = any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  // 更新数据（PUT请求）
  patch<T = any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }

  // 删除数据（DELETE请求）
  delete<T = any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
}


export default YYRequest
