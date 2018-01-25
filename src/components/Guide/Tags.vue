<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Tags</h1>
    <p>
      Form elements are the elements that range from inputs (like searchbars), to sliders, dropdowns, and checkboxes.
    </p>

    <div class="grid-container">

      <div class="section">
        <h3 class="section--title">Search Tags</h3>
        <p class="section-description">There are three classes of searchbars in the inb0x component library, each used on a different page.
        The searchbar is an input elemnt with the primary class .searchbar, and a secondary class of searchbar-[inbox/search/segment] depending on the page.</p>
          <div class="tag tag-search">REP <span class="tag-close"></span></div>
          <div class="tag tag-search">ZRX <span class="tag-close"></span></div>
      </div>

      <div class="section">
        <h3 class="section--title">Segment Tags</h3>
        <p class="section-description">There are three classes of searchbars in the inb0x component library, each used on a different page.
        The searchbar is an input elemnt with the primary class .searchbar, and a secondary class of searchbar-[inbox/search/segment] depending on the page.</p>
          <div class="tag tag-segment">REP Holders > 50 ETH</div>
      </div>
    </div>


  </div>

</template>

<script>

  export default {

  }
</script>

<style type="scss" scoped>

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

.tag{
  display: inline;
  font-size: .7rem;
}

.tag-search{
  background-color: #00E0BF;
  color: #002D47;
  padding: 10px 15px;
}

.tag-segment{
  background-color: #002D47;
  color: #FFF;
  padding: 10px 15px;
  border-radius: 20px;
}

.tag-close{
  margin-left: 10px;
}

.tag-close::after{
  content: '\2715';
}


</style>
