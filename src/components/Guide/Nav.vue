<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Navigation</h1>
    <p>
      The navigation is a component of its own, and can be created by giving a div the class of .nav. Each item with the navigation is given the class nav-item
    </p>

    <div class="grid-container">

      <div class="section">
        <h3 class="section--title">Nav</h3>
        <p class="section-description">The active nav-item takes the class '.underline' to give it a highlight. The inactive nav-items take the class nav-item-inactive to give them less of a highlight.</p>

        <div class="container">
          <div class="columns">
            <div class="column col-2 nav-item underline">inbox</div>
            <div class="column col-2 nav-item nav-item-inactive">search</div>
            <div class="column col-2 nav-item nav-item-inactive">segments</div>

          </div>
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

.nav-item{
  text-align: center;
}


.section{
  margin-bottom: 48px;
}

.section-description{
  font-size: .8rem;
}

.subsection{
  margin-bottom: 24px;
}

.searchbar{
  width: 100%;
  border: none;
  padding: 8px;
}


</style>
