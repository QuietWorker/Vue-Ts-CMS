import { Store, createStore ,useStore as useVuexStore} from 'vuex'

import { IRootState , IStoreType } from './type'
import login from './login/login'
import system from './main/system/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'yyt',
      age:18
    }
  },

  modules: {
    login,
    system
  }
})

export default store

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore():Store<IStoreType> {
  return useVuexStore()
}
