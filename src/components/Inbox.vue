<template>
  <div>
    <div class="row">
      <div class="col-3">
        <messages></messages>
      </div>
      <div class="col-9">
        <message></message>
      </div>
    </div>
  </div>
</template>

<script>
  import Messages from './Messages'
  import Message from './Message'

  export default {
    components: {
      Messages,
      Message,
    },
  }
</script>
