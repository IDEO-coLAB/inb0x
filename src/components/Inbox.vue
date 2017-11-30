<template>
  <div>
    <h2>Inbox!</h2>
  </div>
</template>

<script>
  // import { MUTATION_TYPES } from '../../constants/vue/mutations'

  export default {
    methods: {
      clear () {
        // this.$store.commit(MUTATION_TYPES.CHANGE_ERROR, { error: null })
      }
    },
    computed: {
      errorMsg () {
        // return this.$store.getters.error ? this.$store.getters.error.message : ""
      },
      hasError () {
        // return this.$store.getters.error
      },
    }
  }
</script>
