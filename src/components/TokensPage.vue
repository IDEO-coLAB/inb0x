<template>
  <div class="ib-main-body u-plr-4">

    <!-- search bar -->
    <token-holder-search-component />

    <!-- search results -->
    <div class="ib-container">
      <token-search-result-tile-component
        v-show="tokenHolders"
        v-for="(tokenHolder, index) in tokenHolders"
        :search-object="tokenHolder"
        :index="index"
        :key="index" />
    </div>

    <!-- pagination / footer -->

  </div>
</template>

<script>
  import TokenHolderSearchComponent from './TokenHolderSearchComponent'
  import TokenSearchResultTileComponent from './TokenSearchResultTileComponent'

  export default {
    components: {
      TokenHolderSearchComponent,
      TokenSearchResultTileComponent,
    },
    computed: {
      tokenHolders () {
        return this.$store.getters.tokenHolders
      }
    }
  }
</script>
