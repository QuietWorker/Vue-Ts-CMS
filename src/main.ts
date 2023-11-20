import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import { globalProperties } from './global'
import 'normalize.css'
import './assets/css/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
setupStore() //每次刷新页面都重新使用localCahe给vuex初始化
app.use(store).use(router).mount('#app')
app.use(ElementPlus, {
  locale: zhCn
})
//启用自定义全局属性
app.use(globalProperties)

//注册ElementPlus的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// yyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   showLoading: false
// })
