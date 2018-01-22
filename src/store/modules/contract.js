import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  address: "",
  addrmessages: []
}

// Getters
const getters = {
  getAddress: state => state.address,
  getMessages: state => state.addrmessages
}

// Mutations
const mutations = {

  [MUTATION_TYPES.UPDATE_ADDRESS] (state, address) {
    state.address = address
    console.log("we updated the address to" + address);
  },

  [MUTATION_TYPES.UPDATE_ADDRMESSAGES] (state, address) {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    var inboxContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_recipient","type":"address"}],"name":"getInbox","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_mNumber","type":"uint256"}],"name":"revokeReplyBounty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_mNumber","type":"uint256"}],"name":"revokeReadBounty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_recipient","type":"address"},{"name":"_index","type":"uint256"}],"name":"getMessage","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_mNumber","type":"uint256"},{"name":"_didReply","type":"bool"}],"name":"readMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_messageText","type":"string"},{"name":"_readBounty","type":"uint256"},{"name":"_replyBounty","type":"uint256"}],"name":"sendMessage","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_mNumber","type":"uint256"}],"name":"confirmReply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]);

    var inbox = inboxContract.at(this.getters.contractID);

    inbox.getInbox(address,function(error,result){
      if(!error){
        var recs = result[1].toNumber();
        for (var i = 0; i < recs; i++) {
          inbox.getMessage(address,i, function(error,result){
            if(!error){
              var id = state.addrmessages.length;
              var payload = {"from": result[0], "input":result[1], "value": result[4].toNumber(), "key": id};
              state.addrmessages.push(payload);
            }
            else{
              console.log(error);
            }
          });
        }
      }
      else{
        console.log(error);
      }
    });
  },


  [MUTATION_TYPES.UPDATE_BALANCE] (state, { address, balance }) {
    Vue.set(state.balances, address, balance)
    console.log(MUTATION_TYPES.UPDATE_BALANCE, state.balances[address])
  },


  [MUTATION_TYPES.RESET_BALANCE] (state, { address }) {
    Vue.set(state.balances, address, null)
    console.log(MUTATION_TYPES.RESET_BALANCE, state.balances[address])
  },

}

export default {
  state,
  getters,
  mutations,
}
