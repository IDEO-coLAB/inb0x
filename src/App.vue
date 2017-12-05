<template>
  <div class="container">
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import web3 from 'web3'
  import {
    MUTATION_TYPES,
    SET_ADDR,
    SET_CURRENT_MESSAGE_ID
  } from './constants/mutations'

  const testRouteForAddrs = (router, store) => {
    const route = router.currentRoute
    const urlAddress = route.params.address

    // Do nothing if no address is in the URL
    if (!urlAddress) return

    // if a valid eth address, set the app's address
    // to the address found in the url
    if (web3.utils.isAddress(urlAddress)) {
      store.commit(SET_ADDR, urlAddress)
      return
    }

    // if an invalid address is in the url, reset the app
    store.commit(MUTATION_TYPES.UNSET_ADDR)
    store.commit(MUTATION_TYPES.UNSET_EAM)
    store.commit(MUTATION_TYPES.UNSET_MESSAGES)
    store.commit(MUTATION_TYPES.UNSET_CURRENT_MESSAGE_ID)

    // redirect back to the inbox home
    router.push({
      path: `/inbox`
    })
  }

  const testRouteForMsg = (router, store) => {
    const route = router.currentRoute
    const urlMsgId = route.params.message

    // Do nothing if no message is in the url
    if (!urlMsgId) return

    // Do nothing if the message in the url matches the current message in the app
    if (store.getters.currentMessageId === urlMsgId) return

    // If the message is a valid transaction hash, set the app's message id
    // to the message in the url
    if (web3.utils.isHex(urlMsgId)) {
      store.commit(SET_CURRENT_MESSAGE_ID, urlMsgId)
      return
    }

    // if an invalid tx hash is the message id, reset the current message info
    store.commit(MUTATION_TYPES.UNSET_CURRENT_MESSAGE_ID)

    // redirect back to the inbox home
    router.push({
      path: `/inbox/${store.getters.address}`
    })
  }

  export default {
    beforeCreate () {
      // this.$store.commit(SET_ADDR, '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // if (!this.$route.query.addresses) {
      //   this.$router.push('/inbox?addresses=0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      //   // this.$router.push('/inbox?addresses=0x8d12a197cb00d4747a1fe03395095ce2a5cc6819')
      // }
    },
    mounted () {
      testRouteForAddrs(this.$router, this.$store)
      testRouteForMsg(this.$router, this.$store)
    },
    watch: {
      '$route' (to, from) {
        testRouteForAddrs(this.$router, this.$store)
        testRouteForMsg(this.$router, this.$store)
      },
    },
  }
</script>

<style lang="scss">
  @import "styles/main.scss"
</style>
