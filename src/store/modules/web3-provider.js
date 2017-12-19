import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  web3Provider: null,
}

// Getters
const getters = {
  web3Provider: state => state.web3Provider,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_WEB3_PROVIDER] (state, provider) {
    // Freeze this object so that Vue doesn't add reactivity
    // otherwise this will cause an infinite loop
    // https://stackoverflow.com/questions/47452401/how-to-store-non-reactive-data-in-vuex
    state.web3Provider = Object.freeze(provider)
    console.log(MUTATION_TYPES.UPDATE_WEB3_PROVIDER, state.web3Provider)
  },

  [MUTATION_TYPES.RESET_WEB3_PROVIDER] (state) {
    state.web3Provider = null
    console.log(MUTATION_TYPES.RESET_WEB3_PROVIDER, state.web3Provider)
  },
}

export default {
  state,
  getters,
  mutations,
}
