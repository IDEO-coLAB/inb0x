<template>
  <div class="container">
  <nav class="navbar">

    <section class="navbar-section">

      <div class="dropdown">
        <div class="btn-group">
          <a class="btn dropdown-toggle mxr-2" tabindex="0">
            <i class="icon icon-menu"></i>
          </a>

          <ul class="menu">
            <li>
              <router-link exact class="btn btn-link" active-class="active" :to="{ path: `/` }">Home</router-link>
            </li>
            <li>
              <router-link class="btn btn-link" active-class="active" :to="{ path: `/update/${address}` }">Setup</router-link>
            </li>
            <li>
              <router-link class="btn btn-link" active-class="active" :to="{ path: `/inbox/${address}` }">Inbox</router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="input-group input-inline width-full">
        <input class="form-input" type="text" placeholder="Ethereum Address">
        <button class="btn btn-primary input-group-btn">Find</button>
      </div>

    </section>

    <section class="navbar-section">
      <!-- TODO: position fix -->
    </section>

  </nav>
  </div>
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'
  import { ACTION_TYPES } from '../constants/actions'
  import { EAMError, MessageError } from '../constants/errors'

  export default {
    computed: {
      routeName () {
        return this.$route.name
      },
      address: {
        get () {
          return this.$store.getters.address.address
        },
        set (newAddress) {
          const curAddress = this.$store.getters.address.address
          const validEthAddress = web3.utils.isAddress(newAddress)

          // Bail if not a valid address
          if (!validEthAddress) return

          // Bail if the address matches the current address in the app
          if (curAddress === newAddress) return

          // if we have a new address, reset the app
          this.$store.commit(MUTATION_TYPES.RESET_ADDR)
          this.$store.commit(MUTATION_TYPES.RESET_EAM)
          this.$store.commit(MUTATION_TYPES.RESET_MESSAGES)
          this.$store.commit(MUTATION_TYPES.RESET_TRANSACTIONS)
          this.$store.commit(MUTATION_TYPES.RESET_CURRENT_MESSAGE_ID)

          // finally, fetch the details for the address
          this.$store.dispatch(ACTION_TYPES.FETCH_ADDR_TX, newAddress)
            // .then(() => this.$router.push({ path: `/inbox/${newAddress}` }))
            .catch((error) => {
              if (error instanceof EAMError) {
                this.$store.commit(MUTATION_TYPES.UPDATE_APP_ERROR, error)
                // this.$router.push({ path: `/new/${newAddress}` })
              }
              else if (error instanceof MessageError) {
                this.$store.commit(MUTATION_TYPES.UPDATE_APP_ERROR, error)
                // this.$router.push({ path: `/inbox/${newAddress}` })
              }
            })

          return newAddress

        }
      }
    },
  }
</script>
