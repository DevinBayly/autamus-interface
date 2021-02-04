<script>
import About from "./about.svelte"
</script>

<style>
  /* CSS files add styling rules to your content */
  .holder {
    display:flex;
    justify-content:center;
    align-items:center;
    }
  .row {
    flex-direction:column;
    }
  
  #top {
    margin-top:5%;
    margin-bottom: 5%;
  }

  #description{
    margin:2%;
  }
  #description p {
  width:50%
  }
  #desc-statement {
    font-weight:600;
    text-align:center;
  }

</style>

<div id="top">
  <div class="holder">
    <img
      src="icons/autamus.png"
      alt="" />
    <h1>Autamus</h1>
  </div>
  <div class="holder row" id="description">
    <p id="desc-statement">
Autamus is an Autonomous Containerized Build System created for maintaining large collections of up-to-date applications.
    </p>
    <About></About>
  </div>
</div>
