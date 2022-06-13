// import { Galaxy } from '@/api/galaxy';
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)

    Vue.prototype.$brain_create = async function(){
      console.log(store.state.core.nodes)

      let brainName = prompt("What is the name of this brain ?");
      console.log(brainName)
      let brainNode
      if (brainName != undefined) {
        let b = {name: brainName,
          neurones : store.state.core.nodes.map(n => {return {id: n.id.startsWith('http') ? n.id : n['@context']['@base']+n.id}}),
          type: "brain",
          color: "purple"}
          brainNode = await Vue.prototype.$newNode(b)
          console.log(brainNode)
          store.dispatch('core/saveNode', brainNode)
        }

        for (const n of store.state.core.nodes){
          let brainNodeId = brainNode.id.startsWith('http') ? brainNode.id : n['@context']['@base']+brainNode.id
          n.brains == undefined ? n.brains = [] : ""
          var index = n.brains.findIndex(x => x.id==brainNodeId);
          if(index === -1){
            n.brains.push({id: brainNodeId})
          }
          store.dispatch('core/saveNode', brainNode)

          console.log(n)
        }


      }
      // let galaxy = new Galaxy()
      // galaxy.init()
      // console.log(galaxy)
      // store.commit('core/setGalaxy', galaxy)
      // Vue.prototype.$search = async function(params){
      //   console.log("searching ", params.text, store.state.core.nodes)
      //   let candidates = store.state.core.nodes
      //   let results = candidates.filter(n => (n.name != undefined && n.name.includes(params.text)) )
      //   if (params.searchById == true){
      //     /* || n.id.includes(text)*/
      //     let resultsById = candidates.filter(n => (n.id.includes(params.text)) )
      //     results = results.concat(resultsById)
      //   }
      //
      //
      //   //store.commit('app/setBrain', brain)
      //   return results
      // }


    }
  }

  // Auto-install
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
  }

  export default plugin
