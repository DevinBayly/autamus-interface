// insert all the js
// find the recents section, generate placeholders
// find the  categories do the same
import { tile } from "./tileinit.js";
import Tile from "./Tile.svelte";
import { readable } from "svelte/store";
// this is the collection of the tiles of the generated containers
// this is the id of the google drive folder with the containers in it
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
export const containerStore = readable([], function start(set) {
  let tiles = [];
  let interval = setInterval(async () => {
    let folders = await fetchFromIdWait(containerId);
    for (let folder of folders.files) {
      // folder.name etc is defined
      
      if (tiles.map(e=> e.name).indexOf(folder.name) == -1) {
        // trigger tile creation
        let t = tile();
        t.start(folder).then(() => {
          console.log("completed pull of info, creating tile")
          // TODO, replace the actual tile generation with a storage of the tile information in the background,
          // this will be accessible to the search machinery, and the 
          tiles.push(t);
          set(tiles)
          console.log(t);
          new Tile({
            target: document.querySelector("#collection"),
            props: {
              specOb: t,
            }
          });
        }).catch(
          "something went wrong, checking back soon"
        )
      }
    }
  }, 2000);
  return function stop() {
    clearInterval(interval);
  };
});
console.log("my readable", containerStore)