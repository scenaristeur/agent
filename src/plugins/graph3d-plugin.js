const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)


    Vue.prototype.$graphInit = async function(graph){
      graph.onBackgroundClick(event => onBackgroundClick(event))

      console.log(graph)
    }

    async function onBackgroundClick(event){

        console.log("onBackgroundClick", event)
        store.commit('core/setCurrentNode', null)
        console.log("new")
      //  Vue.prototype.$bvModal.show("modal-node")

    }
  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
