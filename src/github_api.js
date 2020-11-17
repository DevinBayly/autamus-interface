
  let fetchWithAuth = url => {
    return fetch(url, {
      method: "GET",
    }).then(res => res.json());
  };
  let container = () => ({
    // do partial hydrate
    addKS(keyset) {
      this.keyset = keyset;
    },
    addYAML(yaml) {
      this.yaml = yaml;
    },
    // use atob on the conntents
    async fetchContents() {
      this.keysetContent = await fetchWithAuth(this.keyset.url).then(j=> atob(j.content).replace(/[ ]+/g," "));
      // fix multiple spaces craziness
      this.yamlContent = await fetchWithAuth(this.yaml.url).then(j=> atob(j.content));
    },
    makeLinks() {
      this.links = []
      let lines = this.keysetContent.split("\n")
      for(let line of  lines) {
        let [link,version] = line.split(" ")
        this.links.push({link:`https://link.arken.io/ipfs/${link}`,version})
      }
    },
  });
  export let keysetHandler = () => ({
    async retrieveFiles() {
      this.files = await fetch(
        "https://api.github.com/repos/autamus/container-keyset/git/trees/main?recursive=1",
        {
          method: "GET",
        }
      ).then(res => res.json());
    },
    // naming conventions are that the "name".yaml is the same as "name".ks and inside a ks file we have multiple versions with actual id's that would be used
    // the base part of the f in this iteration is what we will use in the eventual get
    makeContainers() {
      this.containers = [];
      // pair thee ks with the yamls
      for (let file of this.files.tree) {
        if (file.path.slice(-3) == ".ks") {
          let keyset = file;
          // now find the matching yaml
          for (let file2 of this.files.tree) {
            if (
              file2.path.slice(-5) == ".yaml" &&
              file2.path.slice(0, -5) == keyset.path.slice(0, -3)
            ) {
              let yaml = file2;
              let containerEntry = container();
              containerEntry.addKS(keyset);
              containerEntry.addYAML(yaml);
              this.containers.push(containerEntry);
              break;
            }
          }
        }
      }
    },
    async getContainerContents() {
      // use the get contents of each container
      for (let container of this.containers) {
        await container.fetchContents()
      }
    },
    async run() {
      await this.retrieveFiles()
      console.log(this.files.tree)
      this.makeContainers()
      await this.getContainerContents()
      console.log(this)

    }
  });
