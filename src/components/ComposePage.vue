<template>
  <div class="layout-main--page">

    <!-- recipient bar -->
    <div class="pure-g">
      <form class="form pure-u-1 u-no-pad">

        <div class="input-has-addons-left">
          <!-- TODO: Spend time thinking through clean up CSS class .btn -->
          <span class="input-addon-lg">To:</span>
          <input
            class="input-1 input-lg"
            type="text"
            v-model="recipient"
            placeholder="Enter an Ethereum address" />
        </div>

      </form>
    </div>

    <!-- local compose component -->
    <compose-component :recipient="recipient" />
  </div>
</template>

<script>
  import ComposeComponent from './ComposeComponent'

  export default {
    components: {
      ComposeComponent,
    },
    data () {
      return {
        recipient: '',
      }
    },
  }
</script>
