<!-- *************** ContractInbox ********************
  * a test component for seeing if I can get the contract working
 -->

<template>

  <div class="columns">
    <div class="column col-1">
      <SideNav></SideNav>
    </div>

    <div class="column col-11 body">
      <SearchBar></SearchBar>
      <div class="body body-with-header noflow">
        <MessageTile v-for="message in addrmessages" v-bind:message="message" v-bind:key="message.key"></MessageTile>
      </div>
    </div>
</div>


</template>

<script>

import web3 from 'web3'
import _ from 'lodash'
import MessageTile from './MessageTile'
import SearchBar from './SearchBar'
import SideNav from './SideNav'
import weiToEth from '../directives/wei-to-eth'
import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        searchAddress: this.address || null,
        isSearching: false,
        messages: [],
      }
    },
    created () {

    },
    components: {
      MessageTile,
      SearchBar,
      SideNav
    },
    methods: {
      submit () {
      }
    },
    computed: mapGetters({
    address: 'getAddress',
    addrmessages: 'getMessages'
    }),
  }

</script>

<style type="scss" scoped>

  .col-1{background-color: #002D47;}
  .col-11{padding: 2rem;}
  .noflow{overflow: none;}

</style>
