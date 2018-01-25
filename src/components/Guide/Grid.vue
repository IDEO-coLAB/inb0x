<!-- *************** Grid ********************
  * inb0x live style guide
 -->

<template>
      <div style="border: 2px solid red;">
        <h1>Grid System</h1>
        <p>
          There is no need to reinvent the wheel, so inb0x uses sprectre's grid layout.
        </p>
<!--
        <div class="grid-container">
          <div class="col12 grid-demo">col12</div>

          <div class="col6 grid-demo">col6</div>
          <div class="col6 grid-demo">col6</div>

          <div class="col4 grid-demo">col4</div>
          <div class="col4 grid-demo">col4</div>
          <div class="col4 grid-demo">col4</div>

          <div class="col3 grid-demo">col3</div>
          <div class="col3 grid-demo">col3</div>
          <div class="col3 grid-demo">col3</div>
          <div class="col3 grid-demo">col3</div>
        </div> -->

        <div class="container" style="border:2px solid blue">
          <div class="columns">
            <div class="column col-6">col-6</div>
            <div class="column col-3">col-3</div>
            <div class="column col-2">col-2</div>
            <div class="column col-1">col-1</div>
          </div>

          <div class="columns col-gapless">
            <div class="column col-6">col-6</div>
            <div class="column col-6">col-6</div>
          </div>

        </div>

      </div>
</template>

<script>

  export default {

  }
</script>

<style type="scss" scoped>

  .grid-demo{
    background-color: #00E7C0;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .column{
    background-color: #002D47;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: white;
  }


</style>
