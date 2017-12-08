<template>
  <div class="container">
    <h1>About MyEtherInbox</h1>
    <span v-show="!address">
      <p>Enter a valid ethereum address to use MyEtherInbox</p>
    </span>
    <span v-show="address">
      <span v-show="!eam">
        <p><router-link :to="{ path: `/update/${address}` }">Click here</router-link> to set up an inbox for this address</p>
      </span>
      <span v-show="eam">
        <p><router-link :to="{ path: `/update/${address}` }">Click here</router-link> to update the inbox definition for this address</p>
      </span>
    </span>

  </div>
</template>

<script>
  export default {
    computed: {
      eam () {
        return this.$store.getters.eam
      },
      address () {
        return this.$store.getters.address.address
      },
    },
  }
</script>
