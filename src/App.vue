<template>
  <div class="layout-container">

    <app-notifications-component />

    <div class="layout-main">
      <!-- turn main-header into header component -->
      <div class="layout-main--header"><samp><h1>inb0x</h1></samp></div>
      <router-view></router-view>
    </div>

    <!-- turn layout-sidebar into sidebar component -->
    <div class="layout-sidebar">
      <router-link class="ib-menu-text u-pl-2"
        :to="{ path: 'tokens', query: { address: $store.getters.search.tokensAddr }}"><span class="ib-icon-search"></span>TOKENS</router-link>
      <br>
      <br>
      <router-link class="ib-menu-text u-pl-2"
        :to="{ path: 'messages', query: { address: $store.getters.search.messagesAddr }}"><span class="ib-icon-mail"></span>MESSAGES</router-link>
    </div>
    <!-- turn into sidebar component -->

  </div>
</template>

<script>
  import _ from 'lodash'
  import Web3 from 'web3'

  import inboxABI from './ethereum/inbox-abi'
  import AppNotificationsComponent from './components/AppNotificationsComponent'
  import { MUTATION_TYPES } from './constants/mutations'
  import { ACTION_TYPES } from './constants/actions'
  import { NOTIFICATION_TYPES } from './models/notification'
  import testRouteForAddress from './utils/route-utils'

  export default {
    components: {
      AppNotificationsComponent,
    },
    beforeCreate () {
      console.log('\n\n\n=================================')
      console.log('MESSAGES ADDR:')
      console.log('0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      console.log('CONTRACT ADDR:')
      console.log('0xf230b790e05390fc8295f4d3f60332c93bed42e2')
      console.log('=================================\n\n\n')

      // this.$router.push('/messages?address=0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      this.$router.push('/tokens?address=0xf230b790e05390fc8295f4d3f60332c93bed42e2')
      // this.$router.push('/messages?address=somethingBogus')
      // this.$router.push('/search?address=somethingnotGood')
      // this.$router.push('/search?address=0xf230b790e05390fc8295f4d3f60332c93bed42e2')
    },
    mounted () {
      // If web3 is defined, set up the app
      if (!_.isUndefined(window.web3)) {
        // Store the contract interface so we can interact with it directly

        const provider = new Web3(window.web3.currentProvider)
        const inboxContract = new provider.eth.Contract(inboxABI, this.$store.getters.inboxContractAddr)
        this.$store.commit(MUTATION_TYPES.SET_INBOX_CONTRACT_OBJ, inboxContract)

        // only test the url for messages if we have a contract to interact with
        testRouteForAddress(this.$router, this.$store)

        // Poll to listen for metamask account/key changes
        // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
        const interval = setInterval(() => {
          provider.eth.getAccounts()
            .then((accounts) => {
              const curWeb3Addr = this.$store.getters.web3Addr
              const newWeb3Addr = _.first(accounts)

              if (!newWeb3Addr) return

              if (!curWeb3Addr || !_.isEqual(curWeb3Addr, newWeb3Addr)) {
                this.$store.commit(MUTATION_TYPES.SET_WEB3_ADDR, newWeb3Addr)
              }
            })
            .catch((error) => {
              // TODO: there is a better way to handle this, but can wait
              const notification = {
                text: `There was an issue loading Web3. Please refresh the page.`,
                type: NOTIFICATION_TYPES.INFO,
              }
              this.$store.commit(MUTATION_TYPES.ADD_NOTIFICATION, notification)
              clearInterval(interval)
            })
        }, 2000)
      }
      else {
        const notification = {
          text: `You cannot use inb0x without metamask or a Web3 client. Please install one.`,
          type: NOTIFICATION_TYPES.INFO,
        }
        this.$store.commit(MUTATION_TYPES.ADD_NOTIFICATION, notification)
      }
    },
    watch: {
      '$route' (to, from) {
        testRouteForAddress(this.$router, this.$store)
      },
    },
  }
</script>

<style lang="css">
  @import "styles/inbox/inbox.css"
</style>
