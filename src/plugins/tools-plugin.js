// import ForceGraph3D from '3d-force-graph';
// import { Core /*Neurone, Brain,  Graph*/ } from '@/neurone-factory'
//
import { v4 as uuidv4 } from 'uuid';
// let graph = undefined
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)

    Vue.prototype.$newNode = async function(options = {}){
      if (options.name != undefined && options.name.startsWith("http")){
        console.log("search", options)
        let node = await Vue.prototype.$loadNeurone(options.name)
        console.log("neurone", node)
        return node
      }else{
        let context =  {
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
        }
        let node = {
          "@context" : Object.assign(context, options['@context']),
          "id": options['@id'] || options.id || uuidv4(),
          "name": options.name && options.name['@value'] || options.name || "",
          type: "neurone",
          //color: "#00ff00",
          "homepage": "https://scenaristeur.github.io/agent/",
        };
        if(options.base64 != undefined){
          node.shape = 'base64'
          node.base64 = options.base64
          node.type = options.type
        }

        return node
      }
    }

    Vue.prototype.$addProp = function(data){
      let n = data.node
      let p = data.propertie
      let newValue = data.value
      let oldValue = n[p]
      console.log(typeof oldValue, oldValue)
      if (oldValue == undefined){
        n[p] = newValue
      }else if(Array.isArray(oldValue)){
        n[p].push(newValue)
      }else{
        n[p] = [oldValue, newValue]
      }

      // }else if(typeof oldValue == 'object'){
      //
      // }else if(typeof oldValue == 'string'){
      //   n[p] = [oldValue, newValue]
      // }else{
      //   console.log("todo", data)
      // }



      return n
    }

    Vue.prototype.$addLink = function(t){
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
      let name = item.name
      let id = item.id

      if(main[p] == undefined){
        main[p] = {id: id, name: name}
      }else{
        switch (typeof main[p]) {
          case "string":
          console.log("TODO string", main[p] )
          // let old =
          main[p] = [main[p]]
          main[p].push({id: id, name: name})
          break;
          default:
          if(Array.isArray(main[p])){
            main[p].push({id: id, name: name})
          }else{
            let old = main[p]
            main[p] = []
            main[p].push(old)
            main[p].push({id: id, name: name})
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
