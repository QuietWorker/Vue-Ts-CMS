/* eslint-disable */
export {}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  interface ComponentCustomProperties {
    $store: Store;
  }
  import Vue from 'vue'
  export default Vue
}
//声明json文件
declare module '*.json'
declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: any
  }
  import Vue from 'vue'
  export default Vue

}
