<template>
  <div class="">
    <GuideHeader></GuideHeader>
    <div class="grid-container">
      <div class="col3">
        <GuideNav></GuideNav>
      </div>

      <div class="col9">
        <router-view></router-view>
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
