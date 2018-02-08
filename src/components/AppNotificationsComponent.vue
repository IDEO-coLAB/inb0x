<template>
  <div class="notification-container">

    <div
      class="pure-g"
      v-for="(notification, index) in notifications"
      :notification-object="notification"
      :index="index"
      :key="index" >
        <div class="pure-u-1-1">
          <hr>
          {{notification.type}} <br>
          {{notification.text}} <br>
          <button @click="handleClose(notification)">Close Me</button>
          <hr>
        </div>
    </div>

  </div>
</template>

<script>
  import { MUTATION_TYPES } from '../constants/mutations'

  export default {
    methods: {
      handleClose (notification) {
        this.$store.commit(MUTATION_TYPES.REMOVE_NOTIFICATION, notification)
      },
    },
    computed: {
      notifications () {
        return this.$store.getters.notifications
      },
    }
  }
</script>

<!-- TODO: this is a spike for style; move into css -->
<style scoped>
  .notification-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: magenta;
  }
</style>
