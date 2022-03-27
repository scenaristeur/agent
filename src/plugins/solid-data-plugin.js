// import ForceGraph3D from '3d-force-graph';
// import { Core /*Neurone, Brain,  Graph*/ } from '@/neurone-factory'
//
// import { v4 as uuidv4 } from 'uuid';
// let graph = undefined


import {
  getSolidDataset,
  //getThingAll,
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
  //addStringNoLocale,
  //setThing,
  //saveSolidDatasetAt,
  //createSolidDataset,
  //createThing,
  //addUrl,
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



        }
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
      console.log(result)
      return result
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
