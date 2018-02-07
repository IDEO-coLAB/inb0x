<template>
  <div class="main-body">

    <token-holder-search-component />

    <div class="body-content">
      <token-search-result-tile-component
        v-show="tokenHolders"
        v-for="(tokenHolder, index) in tokenHolders"
        :search-object="tokenHolder"
        :index="index"
        :key="index" />
    </div>

    <div class="body-footer">
      Some search footer :)
    </div>

  </div>
</template>

<script>
  import web3 from 'web3'
  import _ from 'lodash'
  import { ACTION_TYPES } from '../constants/actions'
  import TokenHolderSearchComponent from './TokenHolderSearchComponent'
  import TokenSearchResultTileComponent from './TokenSearchResultTileComponent'

  export default {
    components: {
      TokenHolderSearchComponent,
      TokenSearchResultTileComponent,
    },
    computed: {
      inboxAccountId () {
        return this.$store.getters.inboxAccountId
      },
      tokenHolders () {
        return this.$store.getters.tokenHolders
      },
      error () { return this.$store.getters.error },
      address () { return this.$store.getters.inboxAccountId },
      route () { return this.$route },
    },
  }
</script>
