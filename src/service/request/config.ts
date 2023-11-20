//方式1：手动切换

//开发环境:development
//生产环境:production
//测试环境:test

//2.根据process.env.NODE_ENV

const TIME_OUT = 10000
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  // 配置了代理
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:5000'
} else {
  BASE_URL = 'http://123.207.32.32:5000'
}

export { BASE_URL, TIME_OUT }
