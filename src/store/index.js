import { createStore } from 'vuex'
import callCenterPersonDetailsStore from './callCenterPersonDetailsStore.js'


const store = createStore({
  modules: {
    callCenterPersonDetailsStore,
  }
})

export default store
