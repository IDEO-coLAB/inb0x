<template>
  <div>
    <app-header></app-header>

    <div class="empty">
      <div class="empty-icon">
        <i class="icon icon-2x icon-search"></i>
      </div>
      <p class="empty-title h5">No Address Entered</p>
      <p class="empty-subtitle">Search for an Ethereum address to load its <samp>inb0x</samp>.</p>
    </div>

  </div>
</template>

<script>
  import AppHeader from './AppHeader'

  export default {
    components: {
      AppHeader,
    },
  }
</script>
