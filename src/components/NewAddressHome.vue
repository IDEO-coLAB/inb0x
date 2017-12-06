<template>
  <div class="row">
    <div class="col-12">
      New Address Home
      <br><br>
      Address in question: {{address}}
      <br><br>
      This address has not been set up to receive Ethereum Address Messages. To set this address up, click on one of the links below
      <br><br>
      <router-link :to="{ path: `/new/${address}/setup` }">I control this address</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      address () {
        return this.$store.getters.address.address
      }
    },
  }
</script>
