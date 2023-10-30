import axios, { AxiosResponse } from 'axios'

//axios的实例对象

// axios.get('http://123.207.32.32:7888/api/hy66').then((res)=> { //(parameter) res: AxiosResponse<any, any>
//   console.log(res);
// })
// axios.post('',{

// })

//2.get请求 并传入参数..
axios
  .get('http://httpbin.org/get', {
  params: {
    name: 'yyt',
    age:18
  }
}).then((res)=>{
  console.log(res.data);
})

//Promise本身可是可以有类型的
// new Promise<string>((resolve) => {
//   resolve ('abc')
// }).then((result) => {
//   console.log(result.length);
// })

//4.axios 的配置选项
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios.defaults.headers={}

//5.axios.all  ->多个请求,一起返回

axios
  .all([
    axios.get('./get', { params: { name: 'coderwhy', age: 18 } }),
    axios.post('./post', { data: { name: 'why', age: 18 } })
  ]).then((res) => {
    console.log(res[0].data);
    console.log(res[1].data);
  })

  //6.axios的拦截器
  //fn1:请求发送成功会执行的函数
  //fn2:请求发送失败会执行的函数
axios.interceptors.request.use((config) => {
  //可以封装一些操作
  //1.给请求添加token
  //2.isLoading动画
  console.log('请求发生失败');
  return config
}, ((error) => {
  console.log('请求发送错误');
  return error
}))


//fn1: 数据相应成功(服务器正常返回了数据 20x)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截');
    return res
  },
  (err) => {
    console.log('服务器响应失败');
    return err
  }
)
