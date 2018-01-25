<!-- *************** Grid ********************
  * inb0x live style guide
 -->

<template>
      <div>
        <h1>Grid System</h1>
        <p>
          The grid system for inb0x is made up of 12 columns that can be mixed and matched to create the layout you desire.
          Each group must add to 12. Each col block has a default margin of 1.5%. This can be changed tbd.
        </p>

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


</style>
