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

              <!-- Has Messages -->
              <h4>current token holders</h4>
              <br>
              {{ tokenHolders }}

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
  // import MessageTile from './MessageTile'

  export default {
    components: {
      AppHeader,
      // MessageTile,
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
