import Specific from "./Specific.svelte"
import {hiddentracker} from "./state_tracker.js"

let wipevalue
const unsubscribe = hiddentracker.subscribe(value=> {
    wipevalue = value
})

export let wipe = ()=> {
    console.log("updating in transition",wipevalue)
    hiddentracker.update(n=> n+1)
    if (wipevalue%2==1) {
        console.log("hiding")
        document.querySelector("#middle").classList.add("hidden") 
    } 
}

export let replace = (specOb) => {
    // create single page entity
    new Specific({
        target: document.querySelector("#bottom"),
        props: {
            ob: specOb
        }
    })
}