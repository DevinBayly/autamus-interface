// insert all the js
// find the recents section, generate placeholders
// find the  categories do the same
import * as jsyaml from "js-yaml";
import Tile from "./Tile.svelte";
import { readable } from "svelte/store";
// this is the collection of the names of the generated containers
import {keyset} from "./rawgit.js"
//




// this is a readable store that updates itself over time
export const containerStore = readable([], async function start(set) {
  let id = 0
  let names = [];
  let configs = []
  let loadFunc = async () => {
  // perform the get and thhe result is in a containers list
  await keyset.run()
  //console.log(keyset)
  for (let container of keyset.containers) {
    // folder.name etc is defined
    // use the keyset file name
    if (names.indexOf(container.name) == -1) {
      // trigger tile creation
      // 
      names.push(container.name)
      //console.log(container.yamlContent)
      //console.log(jsyaml.safeLoad(container.yamlContent))
      let containerConfigInfo = jsyaml.safeLoad(container.yamlContent)
      containerConfigInfo.srcLinks= container.links
      // take each line of theh keyset file and turn into an array of link.link link.version objects
      configs.push(containerConfigInfo)
      new Tile({
        target: document.querySelector("#collection"),
        props: {
          specOb: containerConfigInfo,
        }
      });
      id += 1
    }
  }
  set(configs)
  }
  loadFunc()
  let interval = setInterval(loadFunc,5000);
  return function stop() {
    clearInterval(interval);
  };
});
//console.log("my readable", containerStore)
