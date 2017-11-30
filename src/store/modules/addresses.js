import _ from 'lodash'
import { ADD_ADDRESS, REMOVE_ADDRESS, UPDATE_ADDRESS, RESET_ADDRESS } from '../../constants/mutations'

const createDefaultAddressObj = (address) => {
  return {
    address,
    protocol: null,
    messages: [],
    transactions: [],
    isUpdating: false,
  }
}

// Initial state
const state = {
  addresses: {}
}

// Getters
const getters = {
  addresses: state => state.addresses,
}

// Mutations
const mutations = {
  [ADD_ADDRESS] (state, address) {
    if (_.has(state.addresses, address)) return
    state.addresses[address] = createDefaultAddressObj(address)
  },

  [UPDATE_ADDRESS] (state, data) {
    const addrToUpdate = state.addresses[data.address]

    if (_.has(data, 'isUpdating')) {
      addrToUpdate.isUpdating = data.isUpdating
    }
    if (_.has(data, 'protocol')) {
      addrToUpdate.protocol = data.protocol
    }
    if (_.has(data, 'transactions')) {
      addrToUpdate.transactions = data.transactions
    }
    if (_.has(data, 'messages')) {
      addrToUpdate.messages = data.messages
    }
  },

  [REMOVE_ADDRESS] (state, address) {

  },
}

export default {
  state,
  getters,
  mutations,
}
