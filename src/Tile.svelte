<script context="module">
  // ? how do I make the parent  and the google file parameters that get filled in later?
  import * as jsyaml from "js-yaml";

  let tile = parent => {
    let ob = {};
    // need to store folder id, then get the src folder id, then the
    ob.parent = parent;
    ob.start = googleFile => {
      // id is the folder id
      let id = googleFile.id;
      ob.name = googleFile.name;
      ob.folderId = id;
      // spawn the fetches to the index
      baseFetch(ob.folderId)
        .then(j => {
          console.log(j);
          ob.indexFolderId = j.files[0].id;
          console.log(ob.indexFolderId);
          return baseFetch(ob.indexFolderId);
        })
        .then(j => {
          console.log(j);
          // get the src and config ids
          for (let f of j.files) {
            if (f.name == "config.yml") {
              ob.configId = f.id;
            } else {
              ob.srcId = f.id;
            }
          }
          //get config text
          ob.handleConfig();
          //get all sources
          ob.handleSource();
        });
    };
    ob.handleConfig = () => {
      // this is where the yaml parser comes in
      downloadFetch(ob.configId)
        .then(res => res.text())
        .then(t => {
          ob.configInfo = jsyaml.safeLoad(t);
          ob.addDivs(ob.parent, 1);
        });
    };
    ob.handleSource = () => {
      baseFetch(ob.srcId).then(j => {
        console.log(j);
        ob.srcLinks = [];
        for (let f of j.files) {
          // each of these is a version image
          ob.srcLinks.push({
            version: f.name,
            link: `https://www.googleapis.com/drive/v3/files/${f.id}/?key=AIzaSyBI94GIyr19f26_9x7DBoXUPKeda7-q8tk&alt=media`
          });
        }
      });
    };
    ob.titleInfo = () => {
      let centerer = document.createElement("div");
      centerer.className = "centerer";
      let p = document.createElement("p");
      p.innerHTML = ob.name;
      p.className = "title";
      centerer.append(p);
      return centerer;
    };
    ob.addDivs = (parent, num) => {
      for (let i = 0; i < num; i++) {
        let div = document.createElement("div");
        div.append(ob.titleInfo());
        div.className = "tile";
        div.onclick = ob.specificPage;
        parent.append(div);
      }
    };
    ob.specificPage = () => {
      let sk = pageStructure();
      sk.impartValues({ ...ob.configInfo, links: ob.srcLinks });
      sk.makeskeleton();
      sk.createSpecificElement();
    };

    return ob;
  };

  function downloadFetch(id) {
    return fetch(
      `https://www.googleapis.com/drive/v3/files/${id}/?key=AIzaSyBI94GIyr19f26_9x7DBoXUPKeda7-q8tk&alt=media`
    );
  }

  function baseFetch(id) {
    return fetch(
      `https://www.googleapis.com/drive/v3/files?q='${id}'+in+parents&key=AIzaSyBI94GIyr19f26_9x7DBoXUPKeda7-q8tk&fields=files(*)`
    ).then(res => res.json());
  }
  export { tile };
</script>

<style>
  .even {
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .tile {
    background-color: #eee;
    padding: 0% !important;
    margin: 2%;
    width: 80px;
    height: 80px;
    display: inline-block;
  }
  .centerer {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100%;
  }
  .title {
    word-break: break-all;
    height: 80%;
    width: 80%;
    margin: auto auto;
    text-align: center;
    font-size: 10px;
  }
</style>

<div class="tile">
  <div class="centerer">
    <p class="title">Name</p>
  </div>
</div>
