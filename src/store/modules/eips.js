import _ from 'lodash'
import Vue from 'vue'
import { SET_EIP_FOR_ADDR } from '../../constants/mutations'

// Initial state
const state = {
  eips: {}
}

// Getters
const getters = {
  eips: state => state.eips,
}

// Mutations
const mutations = {
  [SET_EIP_FOR_ADDR] (state, data) {
    if (!data.address) return
    if (!_.has(state.eips, data.address)) {
      Vue.set(state.eips, data.address, data.eip)
    } else {
      state.eips[data.address] = data.eip
    }
    console.log(SET_EIP_FOR_ADDR, data.eip)
  },
}

export default {
  state,
  getters,
  mutations,
}
