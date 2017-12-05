import Vue from 'vue'
import Vuex from 'vuex'
import storeSubscriptions from './plugins/store-subscriptions'
import address from './modules/address'
import messages from './modules/messages'
import eam from './modules/eam'

Vue.use(Vuex)

const debug = true // make dynamic?

export default new Vuex.Store({
  plugins: [ storeSubscriptions ],
  modules: {
    address,
    messages,
    eam,
  },
  strict: debug,
})
