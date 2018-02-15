<template>
  <div class="notification-container">

    <div
      class="ib-g"
      v-for="(notification, index) in notifications"
      :notification-object="notification"
      :index="index"
      :key="index" >
        <div class="ib-u-1-1 ib-alert-error-big">
          
          {{notification.type}} <br>
          {{notification.text}} <br><br>
          <a class="ib-btn" @click="handleClose(notification)">Close Me</a>
          
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

<!-- FIXME: this is a spike for style; move thisinto css -->
<style scoped>
  .notification-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: magenta;
  }
</style>
