import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  // the ethereum address for the (if connected) metamask wallet
  web3Addr: null,
  // the web3 provider instance
  web3Provider: null,
}

// Getters
const getters = {
  web3Addr: state => state.web3Addr,
  web3Provider: state => state.web3Provider,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.SET_WEB3_PROVIDER] (state, provider) {
    // Freeze this object so that Vue doesn't add reactivity
    // otherwise this will cause an infinite loop
    // https://stackoverflow.com/questions/47452401/how-to-store-non-reactive-data-in-vuex
    if (_.isUndefined(provider)) {
      state.web3Provider = null
    } else {
      state.web3Provider = Object.freeze(provider)
    }
    console.log(MUTATION_TYPES.SET_WEB3_PROVIDER, provider)
  },

  [MUTATION_TYPES.SET_WEB3_ADDR] (state, address) {
    // DO CHECKS HERE
    if (_.isUndefined(address)) {
      state.web3Addr = null
    } else {
      state.web3Addr = address
    }
    console.log(MUTATION_TYPES.SET_WEB3_ADDR, address)
  },
}

export default {
  state,
  getters,
  mutations,
}
