let graph = undefined
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)


    Vue.prototype.$graphInit = async function(_graph){
      graph = _graph
      graph.onBackgroundClick(event => onBackgroundClick(event))
      .onNodeClick(node => onNodeClick(node))

      console.log(graph)
    }


    async function onNodeClick(node){

      // Aim at node from outside it
      //  console.log(node)
      //this.selectedNodes.clear()
      //this.selectedNodes.has(node) ? this.selectedNodes.delete(node) : this.selectedNodes.add(node);
      // console.log(this.selectedNodes)
      // if(node.url != undefined && node.url.startsWith('http')){
      //   app.$store.commit ('app/mustExplore', node.url)
      // }

      const distance = 160;
      const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

      graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
      store.commit ('core/setCurrentNode', node)

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
