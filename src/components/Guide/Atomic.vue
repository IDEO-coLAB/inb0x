<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Atomic Components</h1>
    <p>
      The best way to think about creating components using the inb0x library is by following the atomic structure found <a href="http://atomicdesign.bradfrost.com/table-of-contents/">here</a>.
    </p>

    <div class="grid-container border">
      <div class="col9">
        <div class="col2">inbox</div>
        <div class="col2">search</div>
        <div class= "col2">segments</div>
        <div class="col6"></div>

        <div class="col12"><input type="text" name="" value="" class="searchbar"></div>
      </div>
      <div class="col3">
        this is the sidebar
      </div>

    </div>


  </div>

</template>

<script>

  export default {

  }
</script>

<style type="scss" scoped>

.border{
  border: 2px solid black;
}

.searchbar{
  width: 100%;
  border: 0;
  background-color: #00E7C0;
  border-radius: 5px 5px 0 0;
}



</style>
