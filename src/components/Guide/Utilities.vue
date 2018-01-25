<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Utilities</h1>
    <p>
      Utilities are the group of css classes that transform a property of the element.
      They are not components themselves, but can modify the elements for certain edge cases.
    </p>

    <div class="grid-container">

      <div class="section">
        <div class="subsection">
          <h5 class="subsection--title">All Caps (.caps)</h5>
          <p class="section-description">Changes the text to all capital letters.</p>
          <p class="caps" style="font-size: .7rem; display: inline;">This is all caps</p>
          <p style="font-size: .7rem; display: inline;">this is not all caps</p>
        </div>
        <div class="subsection">
          <h5 class="subsection--title">Hidden (.hidden)</h5>
          <p class="section-description">Hides the element.</p>
        </div>
        <div class="subsection">
          <h5 class="subsection--title">Underline (.underline)</h5>
          <p class="section-description">Hides the element.</p>

          <h5 class="underline" style="display: inline; padding: 5px;">Inbox</h5>
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
