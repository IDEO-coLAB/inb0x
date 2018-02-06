import _ from 'lodash'
import Vue from 'vue'
import axios from 'axios'

import { MUTATION_TYPES } from '../../constants/mutations'
import { ACTION_TYPES } from '../../constants/actions'
import { getTokenFetchUrl } from '../../constants/urls'

// Initial state
const state = {
  tokenHolders: []
}

// Getters
const getters = {
  tokenHolders: state => state.tokenHolders,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_TOKEN_HOLDERS] (state, { tokenHolders }) {
    // Vue does not track deeply nested objects
    state.tokenHolders = tokenHolders
    console.log(MUTATION_TYPES.UPDATE_TOKEN_HOLDERS, tokenHolders)
  },

  [MUTATION_TYPES.RESET_TOKEN_HOLDERS] (state) {
    state.tokenHolders = []
    console.log(MUTATION_TYPES.RESET_TOKEN_HOLDERS, state.tokenHolders)
  },

}



// Actions
const actions = {
  [ACTION_TYPES.FETCH_TOKEN_HOLDERS] ({ commit, state }, address) {

    const url = getTokenFetchUrl(address)
    commit(MUTATION_TYPES.RESET_TOKEN_HOLDERS)

    return axios.get(url)
      .then((tokenHolders) => {
        commit(MUTATION_TYPES.UPDATE_TOKEN_HOLDERS, { tokenHolders })
        console.log('GOT TOKEN HODLER RESULTS!', tokenHolders)
      })
  },
}

// Exports
export default {
  state,
  getters,
  actions,
  mutations,
}






