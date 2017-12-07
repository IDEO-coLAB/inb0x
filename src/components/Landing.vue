<template>
  <div>
    <h1>Landing Page</h1>


      <span v-show="!address">
        <p>Type in a valid ethereum address to get started</p>
      </span>
      <span v-show="address">
        <router-link :to="{ path: `/update/${address}` }">Update EAM for this address</router-link>
      </span>

  </div>
</template>

<script>
  export default {
    computed: {
      address () {
        return this.$store.getters.address.address
      },
    },
  }
</script>
