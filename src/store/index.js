import Vue from 'vue'
import Vuex from 'vuex'
import storeSubscriptions from './plugins/store-subscriptions'
import addresses from './modules/addresses'

Vue.use(Vuex)

const debug = true // make dynamic?

export default new Vuex.Store({
  plugins: [ storeSubscriptions ],
  modules: {
    addresses,
  },
  strict: debug,
})
