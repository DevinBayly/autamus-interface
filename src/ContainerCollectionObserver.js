// insert all the js
// find the recents section, generate placeholders
// find the  categories do the same
import * as jsyaml from "js-yaml";
import Tile from "./Tile.svelte";
import { readable } from "svelte/store";
// this is the collection of the names of the generated containers
// this is the id of the google drive folder with the containers in it
import { keysetHandler } from "./github_api.js"

let keyset = keysetHandler()

// this is a readable store that updates itself over time
export const containerStore = readable([], async function start(set) {
  let id = 0
  let names = [];
  // let interval = setInterval(async () => {
  // perform the get and thhe result is in a containers list
  await keyset.run()
  for (let container of keyset.containers) {
    // folder.name etc is defined
    // use the keyset file name
    if (names.indexOf(container.keyset.path) == -1) {
      // trigger tile creation
      // 
      names.push(container.keyset.path)
      console.log(container.yamlContent)
      console.log(jsyaml.safeLoad(container.yamlContent))
      let containerConfigInfo = jsyaml.safeLoad(container.yamlContent)
      new Tile({
        target: document.querySelector("#collection"),
        props: {
          specOb: containerConfigInfo,
          searchId: id
        }
      });
      id += 1
    }
  }
  // },5000);
  return function stop() {
    clearInterval(interval);
  };
});
console.log("my readable", containerStore)