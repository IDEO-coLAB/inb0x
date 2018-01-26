<!-- *************** GUIDE HEADER ********************
 -->

<template>
  <div class="guide-header">
    <div class="container">
      <div class="columns">
        <div class="column col-3">
          <a href="#" class="header--nav larish" style="margin-left: calc(2.5rem);">inb0x | Component Library</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    data () {
      return {
        recipient: null,
      }
    },
  }
</script>


<style type="scss" scoped>

  .guide-header{
    height: 60px;
    width: 100%;
    background-color: #002D47;
  }

  .header--nav{
    color: #FFF;
    text-decoration: none;
    line-height: 60px;
  }


</style>
