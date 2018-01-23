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

    //sweep this for errors
    const inbox = this.getters.contractObject;
    console.log(inbox);
    inbox.methods.getInbox(address).call({from: '0xa9933ffa51983d93f2e288709d6d7fa5b9176014'})
    .then(function(result){
      var recs = result[1];
      for (var i = 0; i < recs; i++) {
        inbox.methods.getMessage(address,i).call({from: '0xa9933ffa51983d93f2e288709d6d7fa5b9176014'})
        .then(function(result,error){
          if(!error){
            console.log(result);
            var id = state.addrmessages.length;
            var payload = {"from": result[0], "input":result[1], "value": result[4], "key": id};
            state.addrmessages.push(payload);
          }
          else{ console.log(error); }
        });
      }
    })

  },

}

export default {
  state,
  getters,
  mutations,
}
