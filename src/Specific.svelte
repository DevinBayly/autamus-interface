<script>
  export let ob;
  import ExitSpec from "./ExitSpec.svelte";
  import SrcLink from "./SrcLink.svelte"
  let ele

</script>
<style>
.holder{
  display:flex;
  justify-content:center;
  margin:2%;
}
.specific {
width:80%;
border-radius:5%;
background:#eee;
padding:2%;
}
</style>
<div class="holder" bind:this={ele}>
  <div class="specific">

  <ExitSpec {ele} />

  <div id="specHolder"  class="holder center">
    <div id="title" >
      <h1>{ob.name}</h1>
    </div>
  </div>

  <div id="mid">
    <div id="midtitle">
      <div id="mostrecent">
        <h3>Version: {ob.version}</h3>
      </div>
    </div>
    <div id="introduction">{ob.introduction}</div>
    <div id="description">
      <h3>Description:</h3>
      {ob.description}
    </div>
    <div id="links">
      <h3>Links</h3>
      <div id="linksholder" class="holder center">
      {#each ob.srcLinks as link}
        <SrcLink link={link}/>
      {/each}
      </div>
    </div>
    <div id="miscinfo">
      <div id="category">
        <h3>Category: {ob.category}</h3>
      </div>
      <div id="maintainer">Maintainer: {ob.maintainer}</div>
    </div>
  </div>
  </div>
</div>
