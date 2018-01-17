<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Web3 from 'web3'
  import AppHeader from './components/AppHeader'
  import { MUTATION_TYPES } from './constants/mutations'
  import { ACTION_TYPES } from './constants/actions'
  import { testRouteForAddressAndMessage } from './utils/route-utils'
  import { Notification, NOTIFICATION_TYPES } from './models/notification'

  export default {
    beforeCreate () {
      console.log('\n\n\n=================================')
      console.log('0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      console.log('0x1ed014aec47fae44c9e55bac7662c0b78ae61798')
      console.log('=================================\n\n\n')
      // this.$store.commit(SET_ADDR, '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // if (!this.$route.params.address) {
        // this.$router.push('/inbox?addresses=0x8d12a197cb00d4747a1fe03395095ce2a5cc6819')
      // }
      // this.$router.push('/inbox')
      // this.$router.push('/inbox/0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // this.$router.push('/new/0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // this.$router.push('/new/0x1ed014aec47fae44c9e55bac7662c0b78ae61798/setup')
    },
    mounted () {
      testRouteForAddressAndMessage(this.$router, this.$store)

      // TODO: abstract this when better understood

      // If web3 is defined metamask is installed, set up the app's web3 provider
      if (!_.isUndefined(window.web3)) {
        const provider = new Web3(window.web3.currentProvider)
        this.$store.commit(MUTATION_TYPES.UPDATE_WEB3_PROVIDER, provider)

        // This is why we poll
        // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
        const iterval = setInterval(() => {
          provider.eth.getAccounts()
            .then((accounts) => {
              const curWeb3AccountId = this.$store.getters.web3AccountId
              const newWeb3AccountId = _.first(accounts)

              if (!newWeb3AccountId) return
              if (!curWeb3AccountId) {
                this.$store.commit(MUTATION_TYPES.UPDATE_WEB3_ACCT_ID, newWeb3AccountId)
                return
              }

              if (curWeb3AccountId !== newWeb3AccountId) {
                this.$store.commit(MUTATION_TYPES.UPDATE_WEB3_ACCT_ID, newWeb3AccountId)
              }
            })
            .catch((error) => {
              console.error('WEB 3 ERROR!', error)
              console.error('DECIDE HOW TO HANDLE THESE')
              // something outside will need to kick this thing off again if there is an error
              clearInterval(iterval)
            })
        }, 2000)

      }
      // TODO: handle global info state and errors
      else {

        const note = new Notification({
          description: 'This is some descriptive text for the notification.',
          type: NOTIFICATION_TYPES.INFO,
          actions: [{
            name: 'action name',
            fn: () => console.log('clicked an action in the notification'),
          }],
          onClose: () => console.log('clicked close')
        })
        console.log(note)
        this.$store.commit(MUTATION_TYPES.UPDATE_NOTIFICATIONS, note)
      }
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
