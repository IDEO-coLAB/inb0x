import Vue from 'vue'
import Vuex from 'vuex'
import appState from './modules/app-state'
import messages from './modules/messages'
import tokenHolders from './modules/token-holders'
import web3Provider from './modules/web3-provider'

Vue.use(Vuex)

const debug = true // make dynamic?

export default new Vuex.Store({
  modules: {
    appState,
    messages,
    tokenHolders,
    web3Provider,
  },
  strict: debug,
})
