<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Atomic Components</h1>
    <p>
      The best way to think about creating components using the inb0x library is by following the atomic structure found <a href="http://atomicdesign.bradfrost.com/table-of-contents/">here</a>.
    </p>

    <div class="grid-container">
      <div class="col8">
        <div class="grid-container">
          <p class="col2 nav-item underline">inbox</p>
          <p class="col2 nav-item nav-item-inactive">search</p>
          <p class="col2 nav-item nav-item-inactive">segments</p>
          <p class="col6"></p>

          <div class="col12" style="border: 1px solid black;">
            search bar
          </div>

          <div class="col12" style="background-color:#F7F9FB; height: 400px;">

          </div>


        </div>
      </div>
      <div class="col4">
        <div class="grid-container">
          <div class="col12" style="background-color: #F7F9FB; height: 300px;"></div>
          <div class="col12" style="background-color: #002D47; height: 200px;"></div>

        </div>
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
