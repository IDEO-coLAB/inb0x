<template>
  <!-- <div class="container bg-secondary"> -->
  <div class="bg-secondary">

      <div class="columns">
        <div class="column col-12">
          <address-search-input></address-search-input>
        </div>
      </div>



    <!-- <section class="navbar-section">
     <samp class="mxr-2">inb0x</samp> {{address}}
    </section> -->

    <!-- <section class="navbar-section">

      <div class="dropdown dropdown-right">
        <div class="btn-group">
          <a class="btn btn-link dropdown-toggle" tabindex="0">
            Settings <i class="icon icon-arrow-down"></i>
          </a>

          <ul class="menu">
            <li>
              <router-link class="btn btn-link" active-class="active" :to="{ path: setDynamicPath('/inbox') }">Inbox</router-link>
            </li>
            <li>
              <router-link class="btn btn-link" active-class="active" :to="{ path: setDynamicPath('/update') }">Settings</router-link>
            </li>
            <li>
              <router-link exact class="btn btn-link" active-class="active" :to="{ path: `/about` }">About</router-link>
            </li>
          </ul>
        </div>
      </div>


      <div class="dropdown dropdown-right">
        <div class="btn-group">
          <a class="btn btn-link dropdown-toggle" tabindex="0">
            Search <i class="icon icon-search"></i>
          </a>

          <div class="menu">
            <address-search-input></address-search-input>
          </div>
        </div>
      </div>
    </section> -->

  </div>
  <!-- </div> -->
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'
  import { ACTION_TYPES } from '../constants/actions'
  import { EAMError, MessageError } from '../constants/errors'
  import AddressSearchInput from './AddressSearchInput'

  export default {
    components: {
      AddressSearchInput,
    },
    methods: {
      setDynamicPath (pathRoot) {
        if (this.address) return `${pathRoot}/${this.address}`
        return pathRoot
      },
    },
    computed: {
      routeName () {
        return this.$route.name
      },
      address () {
        return this.$store.getters.address.address
      },
    },
  }
</script>
