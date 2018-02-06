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
  [MUTATION_TYPES.SET_TOKEN_HOLDERS] (state, tokenHolders) {
    if (_.isUndefined(tokenHolders)) {
      state.tokenHolders = []
    } else {
      state.tokenHolders = tokenHolders
    }
    console.log(MUTATION_TYPES.SET_TOKEN_HOLDERS, tokenHolders)
  },
}

// Actions
const actions = {
  [ACTION_TYPES.FETCH_TOKEN_HOLDERS] ({ commit, state }, address) {
    const url = getTokenFetchUrl(address)
    // remove current token holders
    commit(MUTATION_TYPES.SET_TOKEN_HOLDERS)

    return axios.get(url)
      .then((result) => {
        const tokenHolders = result.data
        commit(MUTATION_TYPES.SET_TOKEN_HOLDERS, tokenHolders)
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






