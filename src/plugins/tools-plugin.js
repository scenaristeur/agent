// import ForceGraph3D from '3d-force-graph';
// import { Core /*Neurone, Brain,  Graph*/ } from '@/neurone-factory'
//
import { v4 as uuidv4 } from 'uuid';
// let graph = undefined
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)

    Vue.prototype.$newNode = function(options){
      let node = {
        "@context": {
          "name": "http://xmlns.com/foaf/0.1/name",
          "knows": "http://xmlns.com/foaf/0.1/knows",
          "id": "@id",
          "type": "@type",
          "reverse": "@reverse",
          "homepage": {
            "@id": "http://xmlns.com/foaf/0.1/homepage",
            "@type": "@id"
          }
        },
        "id": "http://local/"+uuidv4(),
        "name": options.name,
        type: "neurone",
        color: "#00ff00",
        "homepage": "http://manu.sporny.org/",
        // "knows": [{
        //   "name": "Daniele"
        // }, {
        //   "name": "Lucio"
        // }],
        // "knows": [{
        //   "id": "_:7053c150-5fea-11e3-a62e-adadc4e3df76",
        //   "name": "Boby"
        // }, {
        //   "id": "_:9d2bb59d-3baf-42ff-ba5d-9f8eab34ada4",
        //   "name": "John"
        // }]
      };

      return node
    }

    Vue.prototype.$addProp = function(t){
      console.log(t)
      let s = t.subject
      let p = t.predicate
      let o = t.object
      s = set(s, p, o)
      o = setReverse(o, p, s)
      return [s,o]
    }

    function setReverse(main, p, item){
      main.reverse ==  undefined ? main.reverse = {}: ""
      if(main.reverse[p] == undefined){
        main.reverse[p] = {id: item.id, name: item.name}
      }else{
        switch (typeof main.reverse[p]) {
          case "string":
          console.log("TODO string", main.reverse[p] )
          break;
          default:
          if(Array.isArray(main.reverse[p])){
            main.reverse[p].push({id: item.id, name: item.name})
          }else{
            let old = main.reverse[p]
            main.reverse[p] = []
            main.reverse[p].push(old)
            main.reverse[p].push({id: item.id, name: item.name})
          }
        }
      }
      console.log(main)
      return main
    }
    function set(main, p, item){
      console.log(typeof main[p], main[p], item)
      if(main[p] == undefined){
        main[p] = {id: item.id, name: item.name}
      }else{
        switch (typeof main[p]) {
          case "string":
          console.log("TODO string", main[p] )
          break;
          default:
          if(Array.isArray(main[p])){
            main[p].push({id: item.id, name: item.name})
          }else{
            let old = main[p]
            main[p] = []
            main[p].push(old)
            main[p].push({id: item.id, name: item.name})
          }
        }
      }
      console.log(main)
      return main
    }


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
