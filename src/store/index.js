import Vue from 'vue'
import Vuex from 'vuex'
import storeSubscriptions from './plugins/store-subscriptions'
import addresses from './modules/addresses'
import messages from './modules/messages'
import eips from './modules/eips'

Vue.use(Vuex)

const debug = true // make dynamic?

export default new Vuex.Store({
  plugins: [ storeSubscriptions ],
  modules: {
    addresses,
    messages,
    eips,
  },
  strict: debug,
})
