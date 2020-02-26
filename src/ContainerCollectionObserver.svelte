<script context="module">
  // insert all the js
  // find the recents section, generate placeholders
  // find the  categories do the same
  import Tile, { tile } from "./Tile.svelte";

  async function fetchFromIdWait(id) {
    let j = await baseFetch(id);
    console.log("first", j);
    return j;
  }
    function baseFetch(id) {
    return fetch(
      `https://www.googleapis.com/drive/v3/files?q='${id}'+in+parents&key=AIzaSyBI94GIyr19f26_9x7DBoXUPKeda7-q8tk&fields=files(*)`
    ).then(res => res.json());
  }
  let containerId = "1H8eX-uMP2OmgdelMdBDSc7A8oF_mkOue";
  async function start() {
    let folders = await fetchFromIdWait(containerId);
    // iterate over folders
    for (let f of folders.files) {
      let t = tile(document.querySelector("#collection"));
      console.log("indiv", f);
      t.start(f);
    }
  }
  // hook up events
  // menu button
  // search button
  // tile clicks

  export { start };
</script>

<Tile />
