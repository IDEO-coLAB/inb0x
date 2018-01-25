<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Tags</h1>
    <p>
      Tags are used when showing which parameters in a search are currently active. Each tag should be initialized with .tag, no matter which type it is.
    </p>

    <div class="grid-container">

      <div class="section">
        <h3 class="section--title">Search Tags</h3>
        <p class="section-description">The first set of tags are for the search panel. These tags are most likely used for different tokens that a user may be querying through the searchbar.
        Search tags take the class .tag-search, and are given an closing x by including a span with the class tag-close. By default, this span includes an 'x' symbol. However, there is no JS to actually close
      the tag or plum any data.</p>
          <div class="tag tag-search">REP <span class="tag-close"></span></div>
          <div class="tag tag-search">ZRX <span class="tag-close"></span></div>
      </div>

      <div class="section">
        <h3 class="section--title">Segment Tags</h3>
        <p class="section-description">Segment tags are used to show the users active segments. This feature is tbd, and not included in the MVP. Segment tags take the class .tag-segment.</p>
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
