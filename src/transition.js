import Specific from "./Specific.svelte"

export let replace = (specOb) => {
  // remove all existing bottom categories
  for (let c of document.querySelector("#bottom").children) {
    c.remove()
  }

    // create single page entity
    new Specific({
        target: document.querySelector("#bottom"),
        props: {
            ob: specOb
        }
    })
  // use a tweened to update page

}
