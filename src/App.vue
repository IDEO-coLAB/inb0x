<template>
  <div class="container">
    <div class="body">
      <h2>main</h2>
      <router-view></router-view>
      <div v-for="addr in addresses">
        {{addr.messages}}
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import web3 from 'web3'
  import { ADD_ADDRESS } from './constants/mutations'

  const testRouteForAddrs = (route, store) => {
    const addrsInStore = Object.keys(store.getters.addresses)
    const addrsInQuery = route.query.addresses && route.query.addresses.split(',')

    if (!addrsInQuery) return

    addrsInQuery.forEach((addr) => {
      const isValidAddr = web3.utils.isAddress(addr)
      if (isValidAddr && !_.has(addrsInStore, addr)) {
        store.commit(ADD_ADDRESS, addr)
      }
    })
  }

  export default {
    beforeCreate () {
      this.$router.push('/inbox?addresses=0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
    },
    mounted () {
      testRouteForAddrs(this.$route, this.$store)
    },
    watch: {
      '$route' (to, from) {
        testRouteForAddrs(to, this.$store)
      }
    },
    computed: {
      addresses () {
        return this.$store.getters.addresses
      }
    }
  }
</script>

<style lang="scss">
  @import "styles/main.scss"
</style>
