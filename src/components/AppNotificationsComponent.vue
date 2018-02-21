<template>
  <div class="notification-container">

    <div
      class="pure-g"
      v-for="(notification, index) in notifications"
      :notification-object="notification"
      :index="index"
      :key="index" >

        <!-- TODO: FIXME: clean up CSS naming conventions -->

        <div
          class="pure-u-1-1 notification"
          v-bind:class="{
            'notification-warn': isError(notification),
            'notification-info': isInfo(notification),
            'notification-success': isSuccess(notification),
          }">

          <div class="pure-g">
            <div class="pure-u-2-3">
              <p>{{notification.text}}</p>
            </div>

            <div class="pure-u-1-3">
              <a
                class="btn u-float-r u-mt-1"
                v-bind:class="{
                  'btn-warn': isError(notification),
                  'btn-secondary': isInfo(notification) || isSuccess(notification),
                }"
                @click="handleClose(notification)">
                Close
              </a>
            </div>
          </div>

        </div>
    </div>

  </div>
</template>

<script>
  import { MUTATION_TYPES } from '../constants/mutations'
  import { NOTIFICATION_TYPES } from '../constants/notifications'

  export default {
    methods: {
      handleClose (notification) {
        this.$store.commit(MUTATION_TYPES.REMOVE_NOTIFICATION, notification)
      },
      isError (notification) {
        return notification.type === NOTIFICATION_TYPES.ERROR
      },
      isSuccess (notification) {
        return notification.type === NOTIFICATION_TYPES.SUCCESS
      },
      isInfo (notification) {
        return notification.type === NOTIFICATION_TYPES.INFO
      }
    },
    computed: {
      notifications () {
        return this.$store.getters.notifications
      },
    }
  }
</script>
