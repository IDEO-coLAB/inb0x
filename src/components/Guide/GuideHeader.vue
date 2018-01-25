<!-- *************** GUIDE HEADER ********************
 -->

<template>
  <div class="guide-header">
    <div class="grid-container">
      <div class="col3">
        <a href="#" class="header--nav larish">inb0x | Component Library</a>
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

  .grid-container{
    max-width: 72em;
  }

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
