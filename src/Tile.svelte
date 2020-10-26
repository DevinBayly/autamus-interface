<script>
  import { wipe, replace } from "./transition.js";
  export let specOb;
  export let searchId
</script>

<style>
  .even {
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .tile {
    background-color: #eee;
    padding: 0% !important;
    margin: 2%;
    width: 80px;
    height: 80px;
    display: inline-block;
  }
  .centerer {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100%;
  }
  .title {
    word-break: break-all;
    height: 80%;
    width: 80%;
    margin: auto auto;
    text-align: center;
    font-size: 10px;
  }
</style>

<div class="tile" id={`tilenum${searchId}`} on:click={() => {
  wipe()
  replace(specOb)
}}>
  <div class="centerer">
    <p class="title">{specOb.name}</p>
  </div>
</div>
