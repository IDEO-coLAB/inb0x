<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Forms</h1>
    <p>
      Form elements are the elements that range from inputs (like searchbars), to sliders, dropdowns, and checkboxes.
    </p>

    <div class="grid-container">

      <div class="section">
        <h3 class="section--title">Searchbars</h3>
        <p class="section-description">There are three classes of searchbars in the inb0x component library, each used on a different page.
        The searchbar is an input elemnt with the primary class .searchbar, and a secondary class of searchbar-[inbox/search/segment] depending on the page.</p>
        <div class="subsection">
          <h5 class="subsection--title">Inbox</h5>
          <div class="searchbar-container">
            <input type="text" name="" value="" class="searchbar searchbar-inbox">
            <img src="../../assets/search-icon.png" alt="search-icon" class="searchbar-icon">
          </div>
        </div>
        <div class="subsection">
          <h5 class="subsection--title">Search</h5>
          <div class="searchbar-container">
            <input type="text" name="" value="" class="searchbar searchbar-search">
            <div class="filler">Search filters go here.</div>
            <img src="../../assets/search-icon.png" alt="search-icon" class="searchbar-icon">
          </div>


        </div>
        <div class="subsection">
          <h5 class="subsection--title">Segments*</h5>
          <div class="searchbar-container">
            <input type="text" name="" value="" class="searchbar searchbar-segments">
            <img src="../../assets/search-icon-white.png" alt="search-icon" class="searchbar-icon">
          </div>

        </div>
      </div>

      <div class="section">
        <h3 class="section--title">Dropdowns</h3>
        <p class="section-description">dropdowns are important</p>
        <div class="subsection">
          <h5 class="subsection--title">Inbox</h5>

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

.section{
  margin-bottom: 48px;
}

.section-description{
  font-size: .8rem;
}

.subsection{
  margin-bottom: 24px;
}

.searchbar-container{
  position: relative;
}

.searchbar{
  width: 100%;
  border: none;
  padding: 8px;
}

.searchbar-icon{
  position: absolute;
  right: 10px;
  top: 12px;
}

.searchbar-inbox{
  background-color: #F7F9FB;
  border-radius: 5px;
}

.searchbar-search{
  background-color: #00E7C0;
  border-radius: 5px 5px 0 0;
}

.filler{
  width: 100%;
  background-color: #F7F9FB;
  padding: 40px;
  text-align: center;
}

.searchbar-segments{
  background-color: #002D47;
  border-radius: 5px;
}


</style>
