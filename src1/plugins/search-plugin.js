const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)

    Vue.prototype.$search = async function(params){
      console.log("searching ", params.text, store.state.core.nodes)
      let candidates = store.state.core.nodes
      let results = candidates.filter(n => (n.name != undefined && n.name.includes(params.text)) )
      if (params.searchById == true){
        /* || n.id.includes(text)*/
        let resultsById = candidates.filter(n => (n.id.includes(params.text)) )
        results = results.concat(resultsById)
      }


      //store.commit('app/setBrain', brain)
      return results
    }


  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
