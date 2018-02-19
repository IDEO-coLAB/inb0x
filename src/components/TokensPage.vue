<template>
  <div class="layout-main--page">

    <!-- search bar -->
    <token-holder-search-component />

    <!-- Search results list header-->
    <div class="list-header pure-g">
      <div class="pure-u-2-5">Address</div>
      <div class="pure-u-2-5">Holdings</div>
      <div class="pure-u-1-5">Percent</div>
    </div>

    <!-- search results -->
    <token-search-result-tile-component
      v-show="tokenHolders"
      v-for="(tokenHolder, index) in tokenHolders"
      :search-object="tokenHolder"
      :index="index"
      :key="index" />

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
