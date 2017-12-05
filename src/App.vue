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
  import { SET_ADDR, SET_CURRENT_MESSAGE_ID } from './constants/mutations'

  const testRouteForAddrs = (route, store) => {
    const urlAddress = route.params.address
    if (!urlAddress) return
    if (web3.utils.isAddress(urlAddress)) {
      store.commit(SET_ADDR, urlAddress)
    }
  }

  const testRouteForMsg = (route, store) => {
    const urlMsgId = route.params.message
    if (!urlMsgId) return
    if (store.getters.currentMessageId === urlMsgId) return
    if (!web3.utils.isHex(urlMsgId)) return // do some error handling here...
    store.commit(SET_CURRENT_MESSAGE_ID, urlMsgId)
  }

  // const testRouteForMsg = (route, store) => {
  //   const queryMsg = route.query.message

  //   if (!web3.utils.isHex(queryMsg)) return
  //   if (store.getters.currentMessageId === queryMsg) return

  //   store.commit(SET_CURRENT_MESSAGE_ID, queryMsg)
  // }

  export default {
    beforeCreate () {
      // this.$store.commit(SET_ADDR, '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // if (!this.$route.query.addresses) {
      //   this.$router.push('/inbox?addresses=0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      //   // this.$router.push('/inbox?addresses=0x8d12a197cb00d4747a1fe03395095ce2a5cc6819')
      // }
    },
    mounted () {
      testRouteForAddrs(this.$route, this.$store)
      testRouteForMsg(this.$route, this.$store)
    },
    watch: {
      '$route' (to, from) {
        testRouteForAddrs(to, this.$store)
        testRouteForMsg(this.$route, this.$store)
      },
    },
  }
</script>

<style lang="scss">
  @import "styles/main.scss"
</style>
