// import ForceGraph3D from '3d-force-graph';
// import { Core /*Neurone, Brain,  Graph*/ } from '@/neurone-factory'
//
import { v4 as uuidv4 } from 'uuid';
// let graph = undefined


import {
  getSolidDataset,
  // getThingAll,
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
      if(store.state.solid.pod == null){
        alert("Please Login to your pod before trying to save this brain")
      }else{

        let suggestedpath = store.state.solid.pod.storage+"brains/"
        console.log(suggestedpath)

        let  path = prompt("Please confirm the path where to store the nodes", suggestedpath);
        console.log(path)
        if(path != null){
          path = !path.endsWith('/') ? path+= '/' : path

          store.state.core.nodes.forEach(n => {
            Vue.prototype.$spinnerAdd({id: "saving "+n.id})
          });



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
            Vue.prototype.$spinnerRemove({id: "saving "+n.id})


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

          Vue.prototype.$spinnerAdd({id: "saving "+store.state.solid.pod.brains})
          const brainsFile = await getFile(store.state.solid.pod.brains, { fetch: sc.fetch });
          //  console.log(brainsFile)
          const reader = new FileReader();
          reader.onload = async () => {
            try {

              let brainsIndex = JSON.parse(reader.result)

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

              //reload brains
              Vue.prototype.$checkBrains()
              Vue.prototype.$spinnerRemove({id: "saving "+store.state.solid.pod.brains})
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
    }


    Vue.prototype.$loadBrainsFromWikidata = async function(tags){
      console.log(tags)

      tags.forEach(async function(t) {
        console.log(t)
        let node = {id: t.url, name: t.item.aliases && t.item.aliases[0] || t.item.label || t.text, color: "lightblue", url: t.url, source: "https://wikidata.org"}


        await store.dispatch('core/saveNode', node)

      });

      await store.dispatch('core/getNodes')



      // let test = "https://www.wikidata.org/wiki/Special:EntityData/Q182665.jsonld"
      // console.log(test)
      //loadExternalNeurones(tags)

    }


    Vue.prototype.$loadBrainFromSolid = async function(path){
      if (path == undefined){
        let suggestedpath = store.state.solid.pod != null ? store.state.solid.pod.storage+"brains/" : "https://solid.provider/brains_folder or example..."
        console.log(suggestedpath)
        path = prompt("Load brain from ", suggestedpath);
      }

      if(path != null){
        console.log("load brain from", path)
        Vue.prototype.$spinnerAdd({id: "loading "+path})
        let dataset = null
        try{
          dataset = await getSolidDataset( path, { fetch: sc.fetch });
          let remotesUrl  = await getContainedResourceUrlAll(dataset,{fetch: sc.fetch} )
          console.log(remotesUrl)
          await loadNeurones(remotesUrl)
        }
        catch(e){
          alert(e)
        }
        Vue.prototype.$spinnerRemove({id: "loading "+path})
      }
    }

    Vue.prototype.$checkBrains = async function(){
      Vue.prototype.$spinnerAdd({id: "checkBrains"})
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
          "homepage": "https://scenaristeur.github.io/agent",
        };
        await overwriteFile(
          store.state.solid.pod.brains,
          new Blob([JSON.stringify(default_brains)], { type: "application/ld+json" }),
          { contentType: "application/ld+json", fetch: sc.fetch }
        );
      }

      try{
        const file = await getFile(store.state.solid.pod.brains, { fetch: sc.fetch });
        const reader = new FileReader();

        reader.onload = async () => {
          try {
            let brainsIndex = JSON.parse(reader.result)
            store.commit('core/setBrains',brainsIndex)
          } catch (err) {
            console.log(err);
          }
        };
        reader.onerror = (error) => {
          console.log(error);
        };
        reader.readAsText(file);
      }catch(e){
        console.log(e)
      }finally{
        Vue.prototype.$spinnerRemove({id: "checkBrains"})
      }
    }


    // async function loadExternalNeurones(sources){
    //   // todo : move move outside "solid"-data-plugin
    //   console.log(sources)
    //   let test = "simple" // "jsonld" || "json"
    //   // let test =  "jsonld"
    //
    //   for await (let s of sources){
    //     console.log(s)
    //     let id = s.item.id
    //     let node = null
    //
    //     if(test == "simple"){
    //       let response = await fetch("https://www.wikidata.org/wiki/Special:EntityData/"+id+".json")
    //       let data = await response.json()
    //       console.log(data)
    //       node = data.entities[id]
    //       console.log(node)
    //       await store.dispatch('core/saveNode', node)
    //       //let node = JSON.parse(reader.result)
    //
    //     }else{
    //       //full loading the graph of the resource
    //       Vue.prototype.$spinnerAdd({id: "loading "+id})
    //       let response = await fetch("https://www.wikidata.org/wiki/Special:EntityData/"+id+".jsonld")
    //       let jsonld = await response.json()
    //       console.log(jsonld)
    //       console.log(jsonld['@graph'])
    //       let cpt = 1000
    //       for(let item of jsonld['@graph']){
    //         if (cpt ==0){
    //           store.dispatch('core/getNodes')
    //           Vue.prototype.$spinnerRemove({id: "loading "+id})
    //           return
    //         }
    //         cpt--
    //         Vue.prototype.$spinnerAdd({id: "loading "+cpt})
    //         console.log(cpt)
    //         console.log(item)
    //         // let options = {}
    //        item['@context'] == undefined ? item['@context'] = jsonld['@context'] : ""
    //         // // item['@context'].id = '@id'
    //         // // item['@context'].type = "@type"
    //         // options.id = item['@id']
    //         // options.name = item.about
    //         // //  item.type = item['@type']
    //         // console.log(options)
    //         node = Vue.prototype.$newNode(item)
    //         console.log(node)
    //         await store.dispatch('core/saveNode', node)
    //         Vue.prototype.$spinnerRemove({id: "loading "+cpt})
    //
    //       }
    //
    //     }
    //
    //     console.log("done")
    //
    //     store.dispatch('core/getNodes')
    //
    //   }
    //
    //
    //   //     var url = "https://en.wikipedia.org/w/api.php";
    //   //
    //   //     var params = {
    //   //         action: "query",
    //   //         format: "json",
    //   //         titles: "Lyon",
    //   //         prop: "links"
    //   //     };
    //   //
    //   //     url = url + "?origin=*";
    //   //     Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    //   //
    //   //     fetch(url)
    //   //         .then(function(response){return response.json();})
    //   //         .then(function(response) {
    //   //           console.log(response)
    //   //             var pages = response.query.pages;
    //   //             for (var p in pages) {
    //   //                 for (var l of pages[p].links) {
    //   //                     console.log(l.title);
    //   //                 }
    //   //             }
    //   //         })
    //   //         .catch(function(error){console.log(error);});
    //   //
    //   // }
    //
    //
    //   // async function loadExternalNeurones1(sources){
    //   //   console.log(sources)
    //   //
    //   //   var url = "https://wikidata.org/w/api.php";
    //   //   // var url = "https://en.wikipedia.org/w/api.php";
    //   //
    //   //   var params = {
    //   //     action: "query",
    //   //     format: "json",
    //   //     // titles: "Albert Einstein",
    //   //     pageids: "680",
    //   //     prop: "links"
    //   //   };
    //   //   // var params = {
    //   //   //     action: "query",
    //   //   //     format: "json",
    //   //   //     list: "tags",
    //   //   //     tgprop: "hitcount",
    //   //   //     tglimit: "3"
    //   //   // };
    //   //
    //   //   url = url + "?origin=*";
    //   //   Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    //   //
    //   //
    //   //   fetch(url)
    //   //   .then(function(response){return response.json();})
    //   //   .then(function(response) {
    //   //     var pages = response.query.pages;
    //   //     for (var p in pages) {
    //   //       for (var l of pages[p].links) {
    //   //         console.log(l.title);
    //   //       }
    //   //     }
    //   //   })
    //   //   .catch(function(error){console.log(error);});
    //   //
    //   //   // fetch(url)
    //   //   //     .then(function(response){return response.json();})
    //   //   //     .then(function(response) {
    //   //   //         var tags = response.query.tags;
    //   //   //         for (var t in tags) {
    //   //   //             console.log(tags[t].name);
    //   //   //         }
    //   //   //     })
    //   //   //     .catch(function(error){console.log(error);});
    //   //
    //   //
    //   //   // const filePromises = sources.map(async function(s) {
    //   //   //   // let url = s.url+'.jsonld'
    //   //   //   let url = s.item.concepturi+".jsonld&origin*"
    //   //   //   //https://www.wikidata.org/entity/Q42.jsonld
    //   //   //   console.log("loading",s.text)
    //   //   //   try{
    //   //   //     console.log("fetching",url)
    //   //   //     const res = await fetch(url)
    //   //   //     const data = await res.json()
    //   //   //     console.log(data)
    //   //   //     // this.items = suggestions.search
    //   //   //     // console.log(this.items)
    //   //   //     // this.autocompleteItems = suggestions.search.map(a => {
    //   //   //     //   return { text: a.match.text+" ("+a.description+")", url: a.concepturi };
    //   //   //     // });
    //   //   //   }catch(e){
    //   //   //     alert(e)
    //   //   //   }
    //   //   // });
    //   //   //
    //   //   // // Wait for all promises to be resolved
    //   //   // await Promise.all(filePromises);
    //   //   //  store.dispatch('core/getNodes')
    //   //
    //   //
    // }

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

      // let nodes = []

      const filePromises = remotesUrl.map(async function(url) {

        if(url.endsWith('/')){
          Vue.prototype.$loadBrainFromSolid(url)
          return
        }

        // Return a promise per file
        Vue.prototype.$spinnerAdd({id: "loading "+url})
        const file = await getFile(url, { fetch: sc.fetch });
        return new Promise( function(resolve, reject) {

          const reader = new FileReader();
          reader.onload = async () => {
            try {
              //response =
              // Resolve the promise with the response value
              let node = JSON.parse(reader.result)
              await store.dispatch('core/saveNode', node)
              Vue.prototype.$spinnerRemove({id: "loading "+url})
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
      await Promise.all(filePromises);
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
