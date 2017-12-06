import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  error: null,
}

// Getters
const getters = {
  error: state => state.error,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_APP_ERROR] (state, error) {
    state.error = error
    console.log(MUTATION_TYPES.UPDATE_APP_ERROR, error)
  },

  [MUTATION_TYPES.RESET_APP_ERROR] (state) {
    state.error = null
    console.log(MUTATION_TYPES.RESET_APP_ERROR)
  },
}

export default {
  state,
  getters,
  mutations,
}
