<template>
  <div>
    <app-sidebar></app-sidebar>



    <div v-show="error">
      <p>ERROR: {{error && error.message}}</p>
      <hr>
    </div>

    <router-view></router-view>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A
    <br>
    0x1ed014aec47fae44c9e55bac7662c0b78ae61798

  </div>
</template>

<script>
  import _ from 'lodash'
  import web3 from 'web3'
  import AppSidebar from './components/AppSidebar'
  import { MUTATION_TYPES } from './constants/mutations'
  import { ACTION_TYPES } from './constants/actions'
  import { EAMError, MessageError } from './constants/errors'
  import { testRoute } from './utils/route-utils'

  // const testRouteForAddrs = (router, store) => {
  //   const route = router.currentRoute
  //   const curAddress = store.getters.address.address
  //   const urlAddress = route.params.address
  //   const validEthAddress = web3.utils.isAddress(urlAddress)

  //   // Bail if no address is found in the URL
  //   if (!urlAddress) return

  //   // Bail if the address matches the current address in the app,
  //   if (curAddress === urlAddress) return

  //   // if a new address or invalid address is in the url, reset the app
  //   store.commit(MUTATION_TYPES.RESET_ADDR)
  //   store.commit(MUTATION_TYPES.RESET_EAM)
  //   store.commit(MUTATION_TYPES.RESET_MESSAGES)
  //   store.commit(MUTATION_TYPES.RESET_TRANSACTIONS)
  //   store.commit(MUTATION_TYPES.RESET_CURRENT_MESSAGE_ID)

  //   // if a valid eth address is in the url
  //   if (validEthAddress) {
  //     store.dispatch(ACTION_TYPES.FETCH_ADDR_TX, urlAddress)
  //       .then(() => router.push({ path: `/inbox/${urlAddress}` }))
  //       .catch((error) => {
  //         if (error instanceof EAMError) {
  //           store.commit(MUTATION_TYPES.UPDATE_APP_ERROR, error)
  //           router.push({ path: `/new/${urlAddress}` })
  //         }
  //         else if (error instanceof MessageError) {
  //           store.commit(MUTATION_TYPES.UPDATE_APP_ERROR, error)
  //           router.push({ path: `/inbox/${urlAddress}` })
  //         }
  //       })
  //     return
  //   }

  //   // redirect back to the inbox home
  //   router.push({ path: `/inbox` })
  // }

  // const testRouteForMsg = (router, store) => {
  //   const route = router.currentRoute
  //   const urlMsgId = route.params.message

  //   // Do nothing if no message is in the url
  //   if (!urlMsgId) return

  //   // Do nothing if the message in the url matches the current message in the app
  //   if (store.getters.currentMessageId === urlMsgId) return

  //   // If the message is a valid transaction hash, set the app's message id
  //   // to the message in the url
  //   if (web3.utils.isHex(urlMsgId)) {
  //     store.commit(UPDATE_CURRENT_MESSAGE_ID, urlMsgId)
  //     return
  //   }

  //   // if an invalid tx hash is the message id, reset the current message info
  //   store.commit(MUTATION_TYPES.RESET_CURRENT_MESSAGE_ID)

  //   // redirect back to the inbox home
  //   router.push({
  //     path: `/inbox/${store.getters.address.address}`
  //   })
  // }

  export default {
    components: {
      AppSidebar,
    },
    beforeCreate () {
      // this.$store.commit(SET_ADDR, '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // if (!this.$route.params.address) {
        // this.$router.push('/inbox?addresses=0x8d12a197cb00d4747a1fe03395095ce2a5cc6819')
      // }
      // this.$router.push('/inbox/0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // this.$router.push('/new/0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // this.$router.push('/new/0x1ed014aec47fae44c9e55bac7662c0b78ae61798/setup')
    },
    computed: {
      error () { return this.$store.getters.error }
    },
    mounted () {
      // testRouteForAddrs(this.$router, this.$store)
      // testRouteForMsg(this.$router, this.$store)
      testRoute(this.$router, this.$store)
    },
    watch: {
      '$route' (to, from) {
        // testRouteForAddrs(this.$router, this.$store)
        // testRouteForMsg(this.$router, this.$store)
        testRoute(this.$router, this.$store)
      },
    },
  }
</script>

<style lang="scss">
  @import "styles/main.scss"
</style>
