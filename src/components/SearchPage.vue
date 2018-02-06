<template>
  <div class="columns col-gapless height-full">

    <!-- Main Section -->
    <div class="column col-12 page-container">

      <div class="page-content">

        <!-- Search header -->
        <app-header></app-header>

        <!-- Body Content -->
        <div class="body body-with-header-and-footer">
          <div class="columns">
            <div class="column col-12">

              <search-tile v-show="tokenHolders" v-for="(tokenHolder, index) in tokenHolders" :search-object="tokenHolder" :index="index" :key="index"></search-tile>

            </div>
          </div>
        </div>


      </div>

    </div>

  </div>
</template>

<script>
  import web3 from 'web3'
  import _ from 'lodash'
  import { ACTION_TYPES } from '../constants/actions'
  import AppHeader from './AppHeader'
  import SearchTile from './SearchTile'

  export default {
    components: {
      AppHeader,
      SearchTile,
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
