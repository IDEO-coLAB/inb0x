<template>
  <div class="columns">
    <div class="column col-12">
      <h1>Update</h1>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      currentAddressId () {
        return this.$store.getters.currentAddressId
      }
    }
  }
</script>
