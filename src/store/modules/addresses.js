import _ from 'lodash'
import Vue from 'vue'
import { ADD_ADDR, REMOVE_ADDR } from '../../constants/mutations'

// Initial state
const state = {
  // currentAddresses: [],
  addresses: []
}

// Getters
const getters = {
  addresses: state => state.addresses,
  // currentAddresses: state => state.currentAddresses,
}

// Mutations
const mutations = {
  // [UPDATE_CURRENT_ADDRS] (state, address) {
  //   if (state.currentAddresses.includes(address)) return
  //   state.currentAddresses.push(address)
  // },

  [ADD_ADDR] (state, address) {
    if (!address || state.addresses.includes(address)) return
    state.addresses.push(address)
    console.log(ADD_ADDR, address)
  },

  [REMOVE_ADDR] (state, address) {
    const index = state.addresses.indexOf(address)
    state.addresses.splice(index, 1)
    console.log(REMOVE_ADDR, address)
  },
}

export default {
  state,
  getters,
  mutations,
}
