import Specific from "./Specific.svelte"

export let replace = (specOb) => {
    // create single page entity
    new Specific({
        target: document.querySelector("#bottom"),
        props: {
            ob: specOb
        }
    })
}
