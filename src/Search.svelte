<script>
  import Tile from "./Tile.svelte"
  // populate a section below the search with the container tiles that actually work for the term
  // naive approach use regex match testing

  // look at a reader defined in both here and the collection. just copy the tile up

  // iterating to keep names updated
  import { containerStore } from "./ContainerCollectionObserver.js";

  let configs;

  let unsubscribe = containerStore.subscribe(v => {
    configs = v;
  });

  let inputText = "";

  // could also bind to the  input text and trigger this function every time it changes
  let activateSearch = () => {
    // clear the previous entries out
    if (document.querySelector("#results div")) {
      for (let d of document.querySelectorAll("#results div")) {
        d.remove();
      }
    }
    console.log(inputText);
    console.log(configs)
    let inputRegex = new RegExp(inputText);

    for (let i = 0; i < configs.length; i++) {
      let name = configs[i].name;
      if (inputRegex.exec(name)) {
        new Tile ({
          target:document.querySelector("#results"),
          props: {
            specOb:configs[i]
            }
        })
      }
    }
  };
</script>
<style>
  img {
    width:60px;
    cursor:pointer;
  }
  .holder {
    display:flex;
    justify-content:center;
  }
  .center {
    display:flex;
    align-items:center;
    justify-contnent:center;

  }
  .center * {
  padding-left:2%;
  padding-right:2%;
  }

</style>
<div id="search">

  <div class="center holder">
    <label for="search">Container Search:</label>
    <input bind:value={inputText} type="text" name="search" id="searchbar" />
    <img
      src="data:image/png;base64,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"
      alt=""
      on:click={activateSearch} />
  </div>
  <div id="results" class="holder center" />
</div>
