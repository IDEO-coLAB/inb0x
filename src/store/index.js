import Vue from 'vue'
import Vuex from 'vuex'
import messages from './modules/messages'
import appState from './modules/app-state'
import web3Provider from './modules/web3-provider'

Vue.use(Vuex)

const debug = true // make dynamic?

export default new Vuex.Store({
  modules: {
    messages,
    appState,
    web3Provider,
  },
  strict: debug,
})
