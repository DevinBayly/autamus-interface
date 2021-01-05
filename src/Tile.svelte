<script>
  import {  replace } from "./transition.js";
import {tweened} from 'svelte/motion'
import {cubicOut} from 'svelte/easing'
  export let specOb;
  let current 
  const scroll = tweened(0,{
    duration:800,
    easing:cubicOut,
  })
  let active = false
scroll.subscribe(value=> {
if (active) {
console.log(value)
window.scrollTo(0,value*window.innerHeight + current-current*value)
}
if (value == 1) {
active = false
scroll.set(0)
}
})
</script>

<style>
  .tile {
    margin:2%;
    padding-top:3%;
    padding-bottom:3%;
    width:10%;
    background:#eee;
    display:flex;
    justify-content:center;
    cursor:pointer;
  }
  .title {
    word-break:break-all;
    font-size:90%;
    font-weight:600;
  }
</style>

<div class="tile"  on:click={() => {
  replace(specOb)
  current = window.scrollY
  active = true
  scroll.set(1.0)
}}>
  <div class="titleHolder">
    <p class="title">{specOb.name}</p>
  </div>
</div>
