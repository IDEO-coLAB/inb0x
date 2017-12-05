import _ from 'lodash'
import Vue from 'vue'
import { SET_EAM, UNSET_EAM } from '../../constants/mutations'

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
  [SET_EAM] (state, eam) {
    state.eam = eam
    console.log(SET_EAM, eam)
  },

  [UNSET_EAM] (state) {
    state.eam = null
    console.log(UNSET_EAM)
  },
}

export default {
  state,
  getters,
  mutations,
}
