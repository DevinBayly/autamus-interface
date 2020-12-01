
<script>
// load the tile elements
import Search from "./Search.svelte"
</script>
<style>
.holder {
  display:flex;
  justify-content:center;
}
.rows {
  flex-direction:column;
  }
</style>

<div id="middle">

     <Search /> 
  <hr />
  <div class="holder rows">
  <div class="holder">
    <h5>Container Collection</h5>
    </div>
    <div id="options">
      <div id="collection" />
    </div>
  </div>
</div>
