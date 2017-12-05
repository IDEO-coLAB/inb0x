import _ from 'lodash'
import Vue from 'vue'
import { SET_ADDR, UNSET_ADDR } from '../../constants/mutations'

// Initial state
const state = {
  address: null,
}

// Getters
const getters = {
  address: state => state.address,
}

// Mutations
const mutations = {
  [SET_ADDR] (state, address) {
    if (!address) {
      // add top level error type handling: mutation!!!
      throw new Error(`Mutation error ${SET_ADDR}: Must include address to set`)
      return
    }
    state.address = address
    console.log(SET_ADDR, address)
  },

  [UNSET_ADDR] (state) {
    state.address = null
    console.log(UNSET_ADDR)
  }
}

export default {
  state,
  getters,
  mutations,
}
