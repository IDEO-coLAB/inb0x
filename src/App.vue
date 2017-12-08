<template>
  <div class="app-container">

    <!-- <app-header></app-header> -->

    <!-- move to app-body! -->

      <div class="columns col-gapless height-full">
        <div class="column col-8 app-body">
          <router-view></router-view>
        </div>

        <div class="column col-4 app-sidebar">
          <h4>Ethereum Address Info Here</h4>
          <p>Address: {{address}}</p>
          <p>Address: {{address.address}}</p>
          <p>Pages Fetched: {{address.pageIdx-1}}</p>
          <p>Current Tx Count: {{transactions.length}}</p>
          <p>Route Name: {{route.name}}</p>

          <router-link
            class="btn btn-link"
            active-class="active"
            v-show="address.address"
            :to="{ path: `/settings/${address.address}` }">
            Settings
          </router-link>

          <router-link
            class="btn btn-link"
            active-class="active"
            v-show="address.address"
            :to="{ path: `/inbox/${address.address}` }">
            Inbox
          </router-link>
        </div>
      </div>










  </div>
</template>

<script>
  import _ from 'lodash'
  import web3 from 'web3'
  import AppHeader from './components/AppHeader'
  import { MUTATION_TYPES } from './constants/mutations'
  import { ACTION_TYPES } from './constants/actions'
  import { EAMError, MessageError } from './constants/errors'
  import { testRouteForAddressAndMessage } from './utils/route-utils'

  export default {
    components: {
      AppHeader,
    },
    methods: {

    },
    beforeCreate () {
      console.log('\n\n\n=================================')
      console.log('0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      console.log('0x1ed014aec47fae44c9e55bac7662c0b78ae61798')
      console.log('=================================\n\n\n')
      // this.$store.commit(SET_ADDR, '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // if (!this.$route.params.address) {
        // this.$router.push('/inbox?addresses=0x8d12a197cb00d4747a1fe03395095ce2a5cc6819')
      // }
      // this.$router.push('/inbox/0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // this.$router.push('/new/0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // this.$router.push('/new/0x1ed014aec47fae44c9e55bac7662c0b78ae61798/setup')
    },
    computed: {
      error () { return this.$store.getters.error },
      address () { return this.$store.getters.address },
      transactions () { return this.$store.getters.transactions },
      route () { return this.$route },
    },
    mounted () {
      testRouteForAddressAndMessage(this.$router, this.$store)
    },
    watch: {
      '$route' (to, from) {
        testRouteForAddressAndMessage(this.$router, this.$store)
      },
    },
  }
</script>

<style lang="scss">
  @import "styles/main.scss"
</style>
