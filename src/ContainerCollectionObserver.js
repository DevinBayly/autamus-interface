// insert all the js
// find the recents section, generate placeholders
// find the  categories do the same
import { tile } from "./tileinit.js";
import Tile from "./Tile.svelte";
import { readable } from "svelte/store";
// this is the collection of the names of the generated containers
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
  let id = 0
  let names = [];
  let interval = setInterval(async () => {
    let folders = await fetchFromIdWait(containerId);
    for (let folder of folders.files) {
      // folder.name etc is defined
      if (names.indexOf(folder.name) == -1) {
        // trigger tile creation
        let t = tile();
        t.start(folder).then(() => {
          console.log("completed pull of info, creating tile")
          names.push(folder.name);
          set(names)
          console.log(t);
          new Tile({
            target: document.querySelector("#collection"),
            props: {
              specOb: t,
              searchId: id
            }
          });
          id += 1
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