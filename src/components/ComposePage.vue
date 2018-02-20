<template>
  <div class="layout-main--page">

    <!-- search bar -->
    <!-- <token-holder-search-component /> -->


    <div class="pure-g">
      <form class="form pure-u-1 u-no-pad">

        <div class="input-has-addons-left">
          <!-- TODO: Spend time thinking through clean up CSS class .btn -->

          <span class="input-addon-lg">To:</span>


          <input
            class="input-1 input-lg"
            type="text"
            v-model="recipient"
            placeholder="Enter an Ethereum address" />
        </div>

      </form>
    </div>


    <!-- Search results list header-->
    <!-- <div class="list-header pure-g">
      <div class="pure-u-2-5">Address</div>
      <div class="pure-u-2-5">Holdings</div>
      <div class="pure-u-1-5">Percent</div>
    </div> -->

    <compose-component :recipient="recipient" />


  </div>
</template>

<script>
  import TokenHolderSearchComponent from './TokenHolderSearchComponent'
  // import TokenSearchResultTileComponent from './TokenSearchResultTileComponent'
  import ComposeComponent from './ComposeComponent'

  export default {
    components: {
      TokenHolderSearchComponent,
      ComposeComponent,
    },
    data () {
      return {
        recipient: '',
      }
    },
    computed: {
      tokenHolders () {
        return this.$store.getters.tokenHolders
      }
    }
  }
</script>
