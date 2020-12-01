<style>
  /* CSS files add styling rules to your content */
  .holder {
    display:flex;
    justify-content:center;
    align-items:center;
    }
  .row {
    flex-direction:column;
    }
  
  #top {
    margin-top:5%;
    margin-bottom: 5%;
  }

  #description{
    margin:2%;
  }
  #description p {
  width:50%
  }
  #desc-statement {
    font-weight:600;
  }

</style>

<div id="top">
  <div class="holder">
    <img
      src="icons/autamus.png"
      alt="" />
    <h1>Autamus</h1>
  </div>
  <div class="holder row" id="description">
    <p id="desc-statement">
Autamus is an Autonomous Containerized Build System created for maintaining large collections of up-to-date applications.
    </p>
    <p>
    Curating a large repository of software, whether as part of a Linux distribution or formal institution, takes a dedicated group of package maintainers/system administrators and a lot of continuous work. In a perfect world, no matters the size of the software collection, these developers would be able to keep the collection up-to-date and well tested. However, that's not the case, oftentimes Linux maintainers have to decide between having a small well-tested repository, and a larger repository where users are in charge of finding and reporting out-of-date applications. Linux Maintainers at least get this option, however, because system administrators are simply expected to incorporate the software required by their institution and criticized if it's not up to date. For both parties, this leads to a lot of time spent digging through cloud source repositories (Github, Gitlab, Sourceforge, etc...) checking for new updates. This time spent maintaining existing packages quickly eats into developing new software, refining user experiences, and building more efficient computer systems.
</p>
<p>
In the ever-accelerating release cycle, we call today, it's easy for small teams to get overwhelmed by this maintenance work and struggle to keep working on new projects. Thus a couple of us at the University of Arizona department of Research Computing starting thinking about a way to automate some of this repetitive package maintenance for Linux distributions and Systems Administrators alike. Our response was to build Autamus, a modular system for automatically building, packaging, and testing software. In our specific case, we needed a system to automatically track upstreams releases from source code repositories, and build it into Singularity containers for use on our HPC systems. However, the goal of this project is to keep the system modular so that any team can integrate Autamus into their workflow and build their software in whatever format with any combination of the build system that works best to fit their needs.
</p>
  </div>
</div>
