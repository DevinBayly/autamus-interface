<script>
  import {onMount} from 'svelte'
  let clickCount = 0
  let container

import {tweened} from 'svelte/motion'
import {cubicOut} from 'svelte/easing'
  const scroll = tweened(0,{
    duration:800,
    easing:cubicOut,
  })

onMount(()=> {
  container.style.height ="0px"
  scroll.subscribe(value=> {
    if (clickCount > 0) {
    if(clickCount %2==0 && value < .1) {
      container.style.visibility = "hidden"
      container.style.height = "0px"
    } else if (clickCount %2 == 1 && value > .1)  {
      container.style.visibility = "visible"
      container.style.height= `100%`
    }
    }
  })
})

let expand =()=> {
  clickCount+=1
  if (clickCount%2==0) {
    scroll.set(0)
  } else {
    scroll.set(1)
  }
}

</script>
<style>
#aboutContainer {
  visibility:hidden;

}
#expandAbout {
  color:blue;
  text-decoration:underline;
  cursor:pointer;
}
</style>
<p id="expandAbout" on:click={expand}>About</p>
<div id="aboutContainer" bind:this={container}>
    <p>
    Curating a large repository of software, whether as part of a Linux distribution or formal institution, takes a dedicated group of package maintainers/system administrators and a lot of continuous work. In a perfect world, no matters the size of the software collection, these developers would be able to keep the collection up-to-date and well tested. However, that's not the case, oftentimes Linux maintainers have to decide between having a small well-tested repository, and a larger repository where users are in charge of finding and reporting out-of-date applications. Linux Maintainers at least get this option, however, because system administrators are simply expected to incorporate the software required by their institution and criticized if it's not up to date. For both parties, this leads to a lot of time spent digging through cloud source repositories (Github, Gitlab, Sourceforge, etc...) checking for new updates. This time spent maintaining existing packages quickly eats into developing new software, refining user experiences, and building more efficient computer systems.
</p>
<p>
In the ever-accelerating release cycle, we call today, it's easy for small teams to get overwhelmed by this maintenance work and struggle to keep working on new projects. Thus a couple of us at the University of Arizona department of Research Computing starting thinking about a way to automate some of this repetitive package maintenance for Linux distributions and Systems Administrators alike. Our response was to build Autamus, a modular system for automatically building, packaging, and testing software. In our specific case, we needed a system to automatically track upstreams releases from source code repositories, and build it into Singularity containers for use on our HPC systems. However, the goal of this project is to keep the system modular so that any team can integrate Autamus into their workflow and build their software in whatever format with any combination of the build system that works best to fit their needs.
</p>
</div>
