<script context="module">
// insert all the js 
// find the recents section, generate placeholders
// find the  categories do the same
import * as jsyaml from "js-yaml"

let pageStructure = () => { let ob = {}
       ob.impartValues =(ymlJson)=> {
        ob.values = {...ymlJson}

    }
    ob.makeskeleton = () => {
        ob.skeleton = ` <div id="specHolder"> <div id="title">
    ${ob.values.name}
  </div>
 </div>
 <div id="mid">
   <div id="midtitle">
    <h2>
    Title: ${ob.values.name}
    </h2>
    <div id="mostrecent">
      <h3>Version: ${ob.values.version}</h3>
    </div>
   </div>
   <div id="introduction">
${ob.values.introduction}
</div>
   <div id="description">
   <h2>Description: </h2>
${ob.values.description}
   </div>
   <div id="links">
    <h2>Links</h2>
    ${JSON.stringify(ob.values.links)}
   </div>
   <div id="miscinfo">
     <div id="category">
       <h3>Category: ${ob.values.category}</h3>
     </div>
     <div id="maintainer">
     Maintainer: ${ob.values.maintainer}
     </div>
   </div>
 </div>
`}
    ob.createSpecificElement = ()=> {
        //overwrite prexisting content
        let holder = document.querySelector("#bottom")
        holder.innerHTML = ob.skeleton
    }
    return ob
}

let tile = (parent) => {
    let ob = {}
    // need to store folder id, then get the src folder id, then the 
    ob.parent = parent
    ob.start = (googleFile) => {
        // id is the folder id
        let id = googleFile.id
        ob.name = googleFile.name
        ob.folderId = id
        // spawn the fetches to the index
        baseFetch(ob.folderId).then(
            j => {
                console.log(j)
                ob.indexFolderId = j.files[0].id
                console.log(ob.indexFolderId)
                return baseFetch(ob.indexFolderId)
            }
        ).then(j => {
            console.log(j)
            // get the src and config ids
            for (let f of j.files) {
                if (f.name == "config.yml") {
                    ob.configId = f.id
                } else {
                    ob.srcId = f.id
                }
            }
            //get config text
            ob.handleConfig()
            //get all sources
            ob.handleSource()
        })
    }
    ob.handleConfig = () => {
        // this is where the yaml parser comes in
        downloadFetch(ob.configId).then(res => res.text()).then(t => {
            ob.configInfo = jsyaml.safeLoad(t)
            ob.addDivs(ob.parent, 1)
        })
    }
    ob.handleSource = () => {
        baseFetch(ob.srcId).then(j => {
            console.log(j)
            ob.srcLinks = []
            for (let f of j.files) {
                // each of these is a version image 
                ob.srcLinks.push({
                    version: f.name,
                    link: `https://www.googleapis.com/drive/v3/files/${f.id}/?key=AIzaSyBI94GIyr19f26_9x7DBoXUPKeda7-q8tk&alt=media`
                })

            }
        })
    }
    ob.titleInfo = () => {
        let centerer = document.createElement("div")
        centerer.className = "centerer"
        let p = document.createElement("p")
        p.innerHTML = ob.name
        p.className = "title"
        centerer.append(p)
        return centerer
    }
    ob.addDivs = (parent, num) => {
        for (let i = 0; i < num; i++) {
            let div = document.createElement("div")
            div.append(ob.titleInfo())
            div.className = "tile"
            div.onclick = ob.specificPage
            parent.append(div)
        }
    }
    ob.specificPage = () => {
        let sk = pageStructure()
        sk.impartValues({...ob.configInfo,links:ob.srcLinks})
        sk.makeskeleton()
        sk.createSpecificElement()
    }

    return ob
}
let randPlacer = (par) => {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            addDivs(par, 1)
        }, Math.random() * 10 * 1000)
    }
}

function downloadFetch(id) {
    return fetch(`https://www.googleapis.com/drive/v3/files/${id}/?key=AIzaSyBI94GIyr19f26_9x7DBoXUPKeda7-q8tk&alt=media`)
}

function baseFetch(id) {
    return fetch(`https://www.googleapis.com/drive/v3/files?q='${id}'+in+parents&key=AIzaSyBI94GIyr19f26_9x7DBoXUPKeda7-q8tk&fields=files(*)`).then(res => res.json())
}

async function fetchFromIdWait(id) {
    let j = await baseFetch(id)
    console.log("first", j)
    return j
}
let containerId = "1H8eX-uMP2OmgdelMdBDSc7A8oF_mkOue"
async function start() {
    let folders = await fetchFromIdWait(containerId)
    // iterate over folders
    for (let f of folders.files) {
        let t = tile(document.querySelector("#collection"))
        console.log("indiv", f)
        t.start(f)
    }

}
// hook up events
// menu button
// search button
// tile clicks

export {start}

</script>