<script>
  import {  replace } from "./transition.js";
  export let specOb;
</script>

<style>
  .tile {
    margin:2%;
    padding-top:3%;
    padding-bottom:3%;
    width:10%;
    background:#eee;
    display:flex;
    justify-content:center;
    cursor:pointer;
  }
  .title {
    word-break:break-all;
    font-size:90%;
    font-weight:600;
  }
</style>

<div class="tile"  on:click={() => {
  replace(specOb)
}}>
  <div class="titleHolder">
    <p class="title">{specOb.name}</p>
  </div>
</div>
