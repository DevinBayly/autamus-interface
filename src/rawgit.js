// create a collection of keyset info collected from the manifest on the storage repo
//
//
import * as jsyaml from "js-yaml";
let getManifest = async ()=> {
  let text = await fetch("https://raw.githubusercontent.com/DevinBayly/container-keyset/main/manifest.yaml").then(res=>res.text())
  //console.log(text)
  return text
}
let convertToYaml = (text) => {
  return jsyaml.safeLoad(text)
}
let container =(info)=>({
  async init() {
    // there's going to be 2 parts to the info
    // here's the ks setup part
    this.name = info[0].name
    for (let containerFile of info) {
      let fileContents =await fetch(containerFile["web_url"]).then(res=>res.text())
      //console.log(fileContents)
      if (containerFile["relative_path"].match(/\.ks/)) {
        this.links = []
        let lines = fileContents.split("\n")
        for (let line of lines) {
          let [link,version] = line.split(/\s+/)
          //console.log("line",line)
          this.links.push({link:`https://link.arken.io/ipfs/${link}`,version})
        }
      } else {
       this.yamlContent = fileContents
      }
    }
  },

})
//[
//  {
//    name,
//    links,
//    yamlContent
//  }...
//]
export let keyset = {
  async run() {
    let text = await getManifest()
    let yaml = convertToYaml(text)
    //console.log(yaml)
    // iterate over the keys
    this.containers = []
    for (let key in yaml) {
      let c = container(yaml[key])
      await c.init()
      this.containers.push(c)
    }
  }
}

