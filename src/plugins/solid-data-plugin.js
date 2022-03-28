// import ForceGraph3D from '3d-force-graph';
// import { Core /*Neurone, Brain,  Graph*/ } from '@/neurone-factory'
//
import { v4 as uuidv4 } from 'uuid';
// let graph = undefined


import {
  getSolidDataset,
  getThingAll,
  //getPublicAccess,
  //  getAgentAccess,
  //getSolidDatasetWithAcl,
  //getPublicAccess,
  //getAgentAccess,
  getFile,
  // isRawData,
  // getContentType,
  //saveFileInContainer,
  getContainedResourceUrlAll,
  //getStringNoLocaleAll,
  // createContainerAt,
  getSourceUrl,
  // deleteFile,
  //removeThing,
  // removeAll,
  //removeStringNoLocale,
  //deleteContainer,
  // addStringNoLocale,
  // setThing,
  // saveSolidDatasetAt,
  //createSolidDataset,
  // createThing,
  // addUrl,
  //buildThing,

  overwriteFile,
  // getStringNoLocale,
  // getThing,
  // getUrlAll,
  // getUrl,
  //addDatetime,
  //  getDatetime,
  //setUrl,
  //setStringNoLocale,
  //setDecimal,
  //setInteger,
  //  getDecimal,
  //getInteger,
  // setDatetime
} from "@inrupt/solid-client";

// import * as jsonld from 'jsonld';
// import { RDF,  } from "@inrupt/vocab-common-rdf";

import * as sc from '@inrupt/solid-client-authn-browser'
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store

    Vue.prototype.$saveBrainToSolid = async function(){
      console.log(store.state.core.nodes)
      let suggestedpath = store.state.solid.pod.storage+"agenttest/"
      console.log(suggestedpath)

      let  path = prompt("Please confirm the path where to store the nodes", suggestedpath);
      console.log(path)
      if(path != null){
        path = !path.endsWith('/') ? path+= '/' : path
        for await (const n of store.state.core.nodes){
          console.log(n.id, n)
          n['@context']['@base'] = path

          const savedFile = await overwriteFile(
            path+lastPartOfUrl(n.id),
            new Blob([JSON.stringify(n)], { type: "application/ld+json" }),
            { contentType: "application/ld+json", fetch: sc.fetch }
          );
          //  console.log(savedFile)

          console.log(`File saved at ${getSourceUrl(savedFile)}`);



          // let brainsDataset = await getSolidDataset(
          //   store.state.solid.pod.brains, {
          //     fetch: sc.fetch
          //   });
          //
          //   let brain = await getThing(brainsDataset, path, {fetch: sc.fetch})
          //   console.log(brain)
          //   if (brain == null){
          //
          //
          //
          //
          //
          //
          //
          //
          //     // let last = lastPartOfUrl(path)
          //     // console.log(last)
          //     // let brainThing = createThing({ name: last });
          //     // brainThing = addStringNoLocale(brainThing, "http://xmlns.com/foaf/0.1/name", last);
          //     // brainThing = addUrl(brainThing, RDF.type, "https://scenaristeur.github.io/agent/brain");
          //     // brainsDataset = setThing(brainsDataset, brainThing);
          //     // console.log(brainsDataset)
          //     // const savedSolidDataset = await saveSolidDatasetAt(
          //     //   store.state.solid.pod.brains,
          //     //   brainsDataset,
          //     //   { fetch: sc.fetch }             // fetch from authenticated Session
          //     // );
          //     // console.log(savedSolidDataset)
          //   }

        }

        // updating brainIndex
        //let last = lastPartOfUrl(path)
        // console.log(last)
        const brainsFile = await getFile(store.state.solid.pod.brains, { fetch: sc.fetch });
        //  console.log(brainsFile)
        const reader = new FileReader();
        reader.onload = async () => {
          try {
            //response =
            // Resolve the promise with the response value
            let brainsIndex = JSON.parse(reader.result)
            console.log("brains",brainsIndex)
            let now = Date.now()
            let currentBrain = {id: path, name: lastPartOfUrl(path), updated: now, checksum: 1000*Math.random()}
            var index = brainsIndex.brains.findIndex(x => x.id==currentBrain.id);
            if(index === -1){
              currentBrain.created= now
              brainsIndex.brains.push(currentBrain)
            }else{
              Object.assign(brainsIndex.brains[index], currentBrain)
            }


            await overwriteFile(
              store.state.solid.pod.brains,

              new Blob([JSON.stringify(brainsIndex)], { type: "application/ld+json" }),
              { contentType: "application/ld+json", fetch: sc.fetch }
            );


            // let currentBrain = brainsIndex.brains.find(x => x.id == path)
            // console.log(currentBrain)
            // if(currentBrain == undefined) {
            //   currentBrain = {id: path, name: lastPartOfUrl(path), created: Date.now(), updated: Date.now(), checksum: ""}
            //   brainsIndex.brains.push(currentBrain)
            // }else{
            //   currentBrain.
            // }
            // let thisBrain = {id: path, name: last}

            //  await store.dispatch('core/saveNode', node)
            //  resolve(node);
          } catch (err) {
            console.log(err);
          }
        };
        reader.onerror = (error) => {
          console.log(error);
        };
        reader.readAsText(brainsFile);







      }else{
        alert("saving to Solid Pod aborted")
      }


    }


    Vue.prototype.$loadBrainFromSolid = async function(){
      let suggestedpath = store.state.solid.pod.storage+"agenttest/"
      console.log(suggestedpath)

      let  path = prompt("Load brain from ", suggestedpath);

      if(path != null){
        console.log("load brain from", path)
        let dataset = null
        try{
          dataset = await getSolidDataset( path, { fetch: sc.fetch });
          let remotesUrl  = await getContainedResourceUrlAll(dataset,{fetch: sc.fetch} )
          console.log(remotesUrl)
          await loadNeurones(remotesUrl)
          console.log("end")
          //  return remotesUrl
        }
        catch(e){
          console.log(e)
          //return []
        }

      }
    }


    Vue.prototype.$checkBrains = async function(){
      try{
        const file = await getFile(store.state.solid.pod.brains, { fetch: sc.fetch });
        console.log(file)
      }catch(e){
        let default_brains = {
          "@context": {
            "name": "http://xmlns.com/foaf/0.1/name",
            "knows": "http://xmlns.com/foaf/0.1/knows",
            "@base": "http://local/",
            "@vocab": "https://scenaristeur.github.io/agent/",
            "id": "@id",
            "type": "@type",
            "reverse": "@reverse",
            "homepage": {
              "@id": "http://xmlns.com/foaf/0.1/homepage",
              "@type": "@id"
            }
          },
          "id": uuidv4(),
          "name": "Brain Index",
          type: "brainIndex",
          brains: [],
          //color: "#00ff00",
          "homepage": "https://scenaristeur.github.io/agent",
        };
        await overwriteFile(
          store.state.solid.pod.brains,

          new Blob([JSON.stringify(default_brains)], { type: "application/ld+json" }),
          { contentType: "application/ld+json", fetch: sc.fetch }
        );
      }

      try{
        const brains_ds = await getSolidDataset( store.state.solid.pod.brains, { fetch: sc.fetch });
        let brains = await getThingAll(brains_ds)
        console.log(brains)


      }catch(e){
        console.log(e)
      }
    }



    async function loadNeurones(remotesUrl){

      // urls.forEach(async function (u) {
      //   // let doc = null
      //   console.log(u)
      //   const file = await getFile(u, { fetch: sc.fetch });
      //   //  console.log(file)
      //   const reader = new FileReader();
      //
      //   reader.onload = async () => {
      //     try {
      //       //response =
      //       // Resolve the promise with the response value
      //       let doc = JSON.parse(reader.result)
      //       let context = doc['@context']
      //       console.log("result", doc);
      //
      //       const compacted = await jsonld.compact(doc, context);
      //       console.log(JSON.stringify(compacted, null, 2));
      //
      //       await store.dispatch('core/saveNode', compacted)
      //
      //
      //     } catch (err) {
      //       console.log(err);
      //     }
      //   };
      //   reader.onerror = (error) => {
      //     console.log(error);
      //   };
      //   reader.readAsText(file);
      //
      // });

      let nodes = []

      const filePromises = remotesUrl.map(async function(url) {
        // Return a promise per file
        const file = await getFile(url, { fetch: sc.fetch });
        return new Promise( function(resolve, reject) {

          const reader = new FileReader();
          reader.onload = async () => {
            try {
              //response =
              // Resolve the promise with the response value
              let node = JSON.parse(reader.result)
              await store.dispatch('core/saveNode', node)
              resolve(node);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsText(file);
        });
      });

      // Wait for all promises to be resolved
      nodes = await Promise.all(filePromises);

      console.log("finito", nodes)
      store.dispatch('core/getNodes')

    }
    function lastPartOfUrl(str){
      var n = str.lastIndexOf('/');
      var result = str.substring(n + 1);
      return result.length == 0 ? lastPartOfUrl(str.slice(0, -1)) : result
    }

    // Vue.prototype.$newNode = function(options = {}){
    //   let node = {
    //     "@context": {
    //       "name": "http://xmlns.com/foaf/0.1/name",
    //       "knows": "http://xmlns.com/foaf/0.1/knows",
    //       "id": "@id",
    //       "type": "@type",
    //       "reverse": "@reverse",
    //       "homepage": {
    //         "@id": "http://xmlns.com/foaf/0.1/homepage",
    //         "@type": "@id"
    //       }
    //     },
    //     "id": "http://local/"+uuidv4(),
    //     "name": options.name || "",
    //     type: "neurone",
    //     //color: "#00ff00",
    //     "homepage": "http://manu.sporny.org/",
    //     // "knows": [{
    //     //   "name": "Daniele"
    //     // }, {
    //     //   "name": "Lucio"
    //     // }],
    //     // "knows": [{
    //     //   "id": "_:7053c150-5fea-11e3-a62e-adadc4e3df76",
    //     //   "name": "Boby"
    //     // }, {
    //     //   "id": "_:9d2bb59d-3baf-42ff-ba5d-9f8eab34ada4",
    //     //   "name": "John"
    //     // }]
    //   };
    //
    //   return node
    // }
    //
    // Vue.prototype.$addProp = function(data){
    //   let n = data.node
    //   let p = data.propertie
    //   let newValue = data.value
    //   let oldValue = n[p]
    //   console.log(typeof oldValue, oldValue)
    //   if (oldValue == undefined){
    //     n[p] = newValue
    //   }else if(Array.isArray(oldValue)){
    //     n[p].push(newValue)
    //   }else{
    //     n[p] = [oldValue, newValue]
    //   }
    //
    //   // }else if(typeof oldValue == 'object'){
    //   //
    //   // }else if(typeof oldValue == 'string'){
    //   //   n[p] = [oldValue, newValue]
    //   // }else{
    //   //   console.log("todo", data)
    //   // }
    //
    //
    //
    //   return n
    // }
    //
    // Vue.prototype.$addLink = function(t){
    //   console.log(t)
    //   let s = t.subject
    //   let p = t.predicate
    //   let o = t.object
    //   s = set(s, p, o)
    //   o = setReverse(o, p, s)
    //   return [s,o]
    // }
    //
    // function setReverse(main, p, item){
    //   main.reverse ==  undefined ? main.reverse = {}: ""
    //   if(main.reverse[p] == undefined){
    //     main.reverse[p] = {id: item.id, name: item.name}
    //   }else{
    //     switch (typeof main.reverse[p]) {
    //       case "string":
    //       console.log("TODO string", main.reverse[p] )
    //       break;
    //       default:
    //       if(Array.isArray(main.reverse[p])){
    //         main.reverse[p].push({id: item.id, name: item.name})
    //       }else{
    //         let old = main.reverse[p]
    //         main.reverse[p] = []
    //         main.reverse[p].push(old)
    //         main.reverse[p].push({id: item.id, name: item.name})
    //       }
    //     }
    //   }
    //   console.log(main)
    //   return main
    // }
    // function set(main, p, item){
    //   console.log(typeof main[p], main[p], item)
    //   if(main[p] == undefined){
    //     main[p] = {id: item.id, name: item.name}
    //   }else{
    //     switch (typeof main[p]) {
    //       case "string":
    //       console.log("TODO string", main[p] )
    //       break;
    //       default:
    //       if(Array.isArray(main[p])){
    //         main[p].push({id: item.id, name: item.name})
    //       }else{
    //         let old = main[p]
    //         main[p] = []
    //         main[p].push(old)
    //         main[p].push({id: item.id, name: item.name})
    //       }
    //     }
    //   }
    //   console.log(main)
    //   return main
    // }


    // Vue.prototype.$findNodeByName = async function(name){
    //   console.log(name)
    //   let nodes = store.state.nodes
    //   console.log(nodes)
    //
    //
    //
    //
    //
    //
    // }
    //
    // Vue.prototype.$findNodeById = async function(id){
    //   console.log(id)
    //   let nodes = store.state.nodes
    //   console.log(nodes)
    //
    // }


  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
