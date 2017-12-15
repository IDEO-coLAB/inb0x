import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  eams: {},
}

// Getters
const getters = {
  eams: state => state.eams,
}

// Mutations
const mutations = {



  [MUTATION_TYPES.UPDATE_EAMS] (state, { address, eam }) {
    // let newAddrEamObj = state.eams[address] || {}
    // newAddrEamObj.eam = eam

    Vue.set(state.eams, address, eam)
    console.log(MUTATION_TYPES.UPDATE_EAMS, state.eams[address])
  },


  [MUTATION_TYPES.RESET_EAMS] (state, { address }) {
    // let newAddrEamObj = state.eams[address] || {}
    // newAddrEamObj.eam = null

    Vue.set(state.eams, address, null)
    console.log(MUTATION_TYPES.RESET_EAMS, state.eams[address])
  },





  // [MUTATION_TYPES.UPDATE_EAM] (state, eam) {
  //   state.eams = eam
  //   console.log(MUTATION_TYPES.UPDATE_EAM, eam)
  // },

  // [MUTATION_TYPES.RESET_EAM] (state) {
  //   state.eams = null
  //   console.log(MUTATION_TYPES.RESET_EAM)
  // },
}

export default {
  state,
  getters,
  mutations,
}
