// ? how do I make the parent  and the google file parameters that get filled in later?
import jsyaml from "js-yaml";

let tile = parent => {
    let ob = {};
    ob.configInfo = {}
    // need to store folder id, then get the src folder id, then the
    ob.parent = parent;
    ob.start = googleFile => {
        // id is the folder id
        let id = googleFile.id;
        ob.name = googleFile.name;
        ob.folderId = id;
        // spawn the fetches to the index
        return baseFetch(ob.folderId)
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
            })
            .catch(()=> {
                return "problem"
            });
    };
    ob.handleConfig = () => {
        // this is where the yaml parser comes in
        downloadFetch(ob.configId)
            .then(res => res.text())
            .then(t => {
                ob.configInfo = {...ob.configInfo, ...jsyaml.safeLoad(t)};
            });
    };
    ob.handleSource = () => {
        baseFetch(ob.srcId).then(j => {
            console.log(j);
            ob.configInfo.srcLinks = [];
            for (let f of j.files) {
                // each of these is a version image
                ob.configInfo.srcLinks.push({
                    version: f.name,
                    link: `https://www.googleapis.com/drive/v3/files/${f.id}/?key=AIzaSyBI94GIyr19f26_9x7DBoXUPKeda7-q8tk&alt=media`
                });
            }
        });
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