<template>
  <div class="header">

    <!-- <div class="header-section header-action">
      <div class="dropdown">
        <button class="btn btn-link dropdown-toggle" tabindex="0">
          <i class="icon icon-menu"></i>
        </button>

        <ul class="menu">
          <li class="menu-item"><a href="">Home</a></li>
        </ul>
      </div>
    </div> -->

    <div class="header-section">
      <div class="header-content">

        <span v-show="!isSearching">
          <span v-show="!address"><samp>inbox</samp></span>
          <span v-show="address"><samp>inb<span>{{address}}</span></samp></span>
        </span>

        <span class="input-group" v-show="isSearching">
          <input
            class="form-input"
            type="text"
            v-model="searchAddress"
            placeholder="Enter an Ethereum address"
            v-on:keyup.enter="submit" />

          <button class="btn input-group-btn" @click="submit">
            load <samp>inb0x</samp>
          </button>
        </span>

      </div>
    </div>

    <div class="header-section header-action">
      <span class="header-content">
        <button class="btn btn-link" v-show="!isSearching" @click="toggleSearch">
          <i class="icon icon-search"></i>
        </button>

        <button class="btn btn-link" v-show="isSearching" @click="toggleSearch">
          <i class="icon icon-cross"></i>
        </button>
      </span>
    </div>

  </div>
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'
  import { ACTION_TYPES } from '../constants/actions'
  import ROUTE_NAMES from '../constants/routes'

  export default {
    data () {
      return {
        searchAddress: this.address || null,
        isSearching: false,
      }
    },
    methods: {
      fetchTokenHolders (address) {
        const curAddress = this.$store.getters.search.tokensAddr

        if (address === curAddress) return

        console.log('FETCHING TOKEN HOLDERS IN THE SEARCH BAR!')

        return this.$store.dispatch(ACTION_TYPES.FETCH_TOKEN_HOLDERS, address)
          .then(() => {
            return this.$router.push({
              path: `/search`,
              query: { address },
            })
          })
          .catch((error) => {
            console.error('NEW TOKENS FETCH ERROR', error)
            return true
          })
          .then(() => {
            this.isSearching = false
            this.resetInput()
          })
      },


      fetchMessages (address) {
        const curAddress = this.$store.getters.search.messagesAddr

        if (address === curAddress) return

        console.log('FETCHING MESSAGES IN THE SEARCH BAR!')

        return this.$store.dispatch(ACTION_TYPES.FETCH_MSGS_HEADERS, address)
          .then(() => {
            return this.$router.push({
              path: `/messages`,
              query: { address },
            })
          })
          .catch((error) => {
            console.error('NEW MESSAGES FETCH ERROR', error)
            return true
          })
          .then(() => {
            this.isSearching = false
            this.resetInput()
          })
      },



      toggleSearch () {
        this.isSearching = !this.isSearching
      },
      resetInput () {
        this.searchAddress = this.address || null
      },
      submit () {
        const searchAddress = this.searchAddress
        const validEthAddress = web3.utils.isAddress(searchAddress)

        // Bail if not a valid address
        if (!validEthAddress) return

        switch (this.$route.name) {
          case ROUTE_NAMES.MESSAGES_PAGE:
            this.fetchMessages(searchAddress)
            break
          case ROUTE_NAMES.SEARCH_PAGE:
            this.fetchTokenHolders(searchAddress)
            break
        }
      },
    },
    computed: {
      address () {
        return this.$store.getters.inboxAccountId
      },
    },
  }
</script>
