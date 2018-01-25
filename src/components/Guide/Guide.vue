<template>
  <div>
    <GuideHeader></GuideHeader>
    <div class="container">
      <div class="columns">
        <div class="column col-3">
          <GuideNav></GuideNav>
        </div>

        <div class="column col-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GuideHeader from './GuideHeader'
  import GuideNav from './GuideNav'

  export default {
    components: {
      GuideHeader,
      GuideNav,
    },
  }
</script>

<style type="scss" scoped>

.grid-container{
  max-width: 72em;
}

</style>
