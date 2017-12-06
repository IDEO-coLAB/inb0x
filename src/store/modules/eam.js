import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  eam: null,
}

// Getters
const getters = {
  eam: state => state.eam,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_EAM] (state, eam) {
    state.eam = eam
    console.log(MUTATION_TYPES.UPDATE_EAM, eam)
  },

  [MUTATION_TYPES.RESET_EAM] (state) {
    state.eam = null
    console.log(MUTATION_TYPES.CLEAR_EAM)
  },
}

export default {
  state,
  getters,
  mutations,
}
