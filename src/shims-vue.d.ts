/* eslint-disable */
export {}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
  interface ComponentCustomProperties {
    $store: Store;
  }
}


declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: any
  }
}
