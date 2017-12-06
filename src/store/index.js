import Vue from 'vue'
import Vuex from 'vuex'
import address from './modules/address'
import messages from './modules/messages'
import transactions from './modules/transactions'
import eam from './modules/eam'
import error from './modules/error'

Vue.use(Vuex)

const debug = true // make dynamic?

export default new Vuex.Store({
  modules: {
    address,
    messages,
    transactions,
    eam,
    error,
  },
  strict: debug,
})
