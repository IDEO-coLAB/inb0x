import Vue from 'vue'
import Vuex from 'vuex'
import balances from './modules/balances'
import transactions from './modules/transactions'
import messages from './modules/messages'
import eams from './modules/eams'
import appState from './modules/app-state'
import web3Provider from './modules/web3-provider'
import contract from './modules/contract'

Vue.use(Vuex)

const debug = true // make dynamic?

export default new Vuex.Store({
  modules: {
    balances,
    transactions,
    messages,
    eams,
    appState,
    web3Provider,
    contract,
  },
  strict: debug,
})
