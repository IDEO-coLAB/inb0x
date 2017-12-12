<template>
  <div class="header">

    <div class="header-section header-action">
      <div class="dropdown">
        <button class="btn btn-link dropdown-toggle" tabindex="0">
          <i class="icon icon-menu"></i>
        </button>

        <ul class="menu">
          <li class="menu-item"><a href="">Home</a></li>
        </ul>
      </div>
    </div>

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
  import { EAMError, MessageError } from '../constants/errors'
  import addressTruncate from '../directives/address-truncate'

  export default {
    directives: {
      addressTruncate,
    },
    data () {
      return {
        searchAddress: this.address || null,
        isSearching: false,
      }
    },
    methods: {
      toggleSearch () {
        this.isSearching = !this.isSearching
      },
      resetInput () {
        this.searchAddress = this.address || null
      },
      submit () {
        const searchAddress = this.searchAddress
        const curAddress = this.$store.getters.address.address
        const validEthAddress = web3.utils.isAddress(searchAddress)

        // Bail if not a valid address
        if (!validEthAddress) return

        // Skip if the new address is the same as what we already have
        if (searchAddress === curAddress) return

        this.$store.commit(MUTATION_TYPES.RESET_ADDR)
        this.$store.commit(MUTATION_TYPES.RESET_TRANSACTIONS)
        this.$store.commit(MUTATION_TYPES.RESET_EAM)
        this.$store.commit(MUTATION_TYPES.RESET_MESSAGES)
        this.$store.commit(MUTATION_TYPES.RESET_CURRENT_MESSAGE)

        // finally, fetch the details for the address
        return this.$store.dispatch(ACTION_TYPES.FETCH_ADDR_TX, searchAddress)
          .then(() => {
            return this.$router.push({ path: `/inbox/${searchAddress}` })
          })
          .catch((error) => {
            console.error('NEW ADDR FETCH ERROR', error)
            return true
          })
          .then(() => {
            this.isSearching = false
            this.resetInput()
          })
      },
    },
    computed: {
      address () {
        return this.$store.getters.address.address
      },
    },
  }
</script>
