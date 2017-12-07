<template>
  <div>
    Update Address Page
    <br><br>
    <div v-show="!address">
      Type an address into the address bar to get started
    </div>

    <div v-show="address">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      address () {
        return this.$store.getters.address.address
      }
    }
  }
</script>
