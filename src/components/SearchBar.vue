<!-- *************** SearchBar ********************
  * component for searching erc20 tokens, and ethereum addresses.
  * currently only searches for addresses.
  * status: incomplete.
 -->

<template>
    <div class="logobar">
      <img src="../assets/logo.svg" alt="inbox logo">
      <input
        class="form-input"
        type="text"
        v-model="searchAddress"
        placeholder="Enter an Ethereum address"
        v-on:keyup.enter="submit" />
    </div>
</template>

<script>

  export default {
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
        const curAddress = this.$store.getters.inboxAccountId
        const validEthAddress = web3.utils.isAddress(searchAddress)

        // Bail if not a valid address
        if (!validEthAddress) return

        // Skip if the new address is the same as what we already have
        if (searchAddress === curAddress) return

        this.$store.commit(MUTATION_TYPES.RESET_INBOX_ACCT_ID)
        this.$store.commit(MUTATION_TYPES.RESET_MSG_ID)

        const payload = { address: searchAddress }
        this.$store.commit(MUTATION_TYPES.RESET_TRANSACTIONS_STATE, payload)
        this.$store.commit(MUTATION_TYPES.RESET_TRANSACTIONS, payload)
        this.$store.commit(MUTATION_TYPES.RESET_MESSAGES, payload)
        this.$store.commit(MUTATION_TYPES.RESET_BALANCE, payload)
        this.$store.commit(MUTATION_TYPES.RESET_EAMS, payload)

        // finally, fetch the details for the address
        return this.$store.dispatch(ACTION_TYPES.FETCH_TXS, searchAddress)
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
      }
    },
  }

</script>


<style type="scss" scoped>
  /*

  this is terrible terrible CSS that needs to be fixed.
  z-index? hardcoded width? get that shit out of here.

  */

  .logobar{
    display: inline-flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  .logobar input{
    background-color: #00E7C0;
    border: none;
    border-radius: none;
    color: #002D47;
    margin-left: -1px;
    width: 1200px;
  }

  ::-webkit-input-placeholder { color: #002D47;  }
  ::-moz-placeholder { color: #002D47;  }
  :-ms-input-placeholder { color: #002D47;  }
  :-moz-placeholder { color: #002D47;  }

</style>
