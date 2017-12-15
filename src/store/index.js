import Vue from 'vue'
import Vuex from 'vuex'
import addresses from './modules/addresses'
import balances from './modules/balances'
import transactions from './modules/transactions'
import messages from './modules/messages'
import eams from './modules/eams'
import error from './modules/error'

Vue.use(Vuex)

const debug = true // make dynamic?

export default new Vuex.Store({
  modules: {
    addresses,
    balances,
    transactions,
    messages,
    eams,
    error,
  },
  strict: debug,
})
