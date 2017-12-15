import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  balances: {},
}

// Getters
const getters = {
  balances: state => state.balances,
}

// Mutations
const mutations = {



  [MUTATION_TYPES.UPDATE_BALANCE] (state, { address, balance }) {
    // let newAddrBalObj = state.balances[address] || {}
    // newAddrBalObj.balance = balance

    Vue.set(state.balances, address, balance)
    console.log(MUTATION_TYPES.UPDATE_BALANCE, state.balances[address])
  },


  [MUTATION_TYPES.RESET_BALANCE] (state, { address }) {
    // let newAddrBalObj = state.balances[address] || {}
    // newAddrBalObj.eam = null

    Vue.set(state.balances, address, null)
    console.log(MUTATION_TYPES.RESET_BALANCE, state.balances[address])
  },





  // [MUTATION_TYPES.UPDATE_EAM] (state, eam) {
  //   state.eam = eam
  //   console.log(MUTATION_TYPES.UPDATE_EAM, eam)
  // },

  // [MUTATION_TYPES.RESET_EAM] (state) {
  //   state.eam = null
  //   console.log(MUTATION_TYPES.RESET_EAM)
  // },
}

export default {
  state,
  getters,
  mutations,
}
