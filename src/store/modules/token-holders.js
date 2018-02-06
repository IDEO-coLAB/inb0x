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
    // remove current token holders
    commit(MUTATION_TYPES.SET_TOKEN_HOLDERS)
    // update the latest token search addr
    commit(MUTATION_TYPES.SET_SEARCH_TOKENS_ADDR, address)
    commit(MUTATION_TYPES.SET_LOCK_STATE, true)

    const url = getTokenFetchUrl(address)
    return axios.get(url)
      .then((result) => {
        const tokenHolders = result.data
        commit(MUTATION_TYPES.SET_TOKEN_HOLDERS, tokenHolders)
        commit(MUTATION_TYPES.SET_LOCK_STATE, false)
        return true
      })
      .catch((error) => {
        commit(MUTATION_TYPES.SET_LOCK_STATE, false)
        return Promise.reject(error)
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






