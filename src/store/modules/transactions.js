import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  transactions: [],
}

// Getters
const getters = {
  transactions: state => state.transactions,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_TRANSACTIONS] (state, transactions) {
    state.transactions = state.transactions.concat(transactions)
    console.log(MUTATION_TYPES.UPDATE_TRANSACTIONS, state.transactions)
  },

  [MUTATION_TYPES.RESET_TRANSACTIONS] (state) {
    state.transactions = []
    console.log(MUTATION_TYPES.RESET_TRANSACTIONS)
  },
}

export default {
  state,
  getters,
  mutations,
}
