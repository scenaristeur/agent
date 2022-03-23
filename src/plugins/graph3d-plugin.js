import ForceGraph3D from '3d-force-graph';
import { Neurone/*, Brain,*/ /* Graph*/ } from '@/neurone-factory'

// let graph = undefined
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)


    Vue.prototype.$graphInit = async function(options){
      console.log(options)

      // const N = 300;
      //
      // let nodes =  [...Array(N).keys()].map(i => (
      //   // { id: i , name: "node fictif "+i}
      //   new Neurone(
      //     {
      //       //  blip: "blop",
      //       //  color: this.randomColor(),
      //       //
      //       id: i,
      //       name: "node fictif "+i, //"name for graph_",
      //       age: 0,
      //       type: "neurone"
      //     }
      //   )
      //
      // ))
      // let links = [...Array(N).keys()]
      // .filter(id => id)
      // .map(id => ({
      //   source: id,
      //   target: Math.round(Math.random() * (id-1))
      // }))
      //
      // let gData = {name: "default basic brain demo", nodes: nodes, links: links}
      //
      // let brain = new Brain(gData)
      // console.log(brain)
      //
      // store.commit ('core/setBrain', brain)
      // //
      // // console.log("newNeurone")
      // // let node = new Neurone(
      // //   {
      // //     //  blip: "blop",
      // //     //  color: this.randomColor(),
      // //     name: "name for graph_",
      // //     age: 0,
      // //     type: "neurone"
      // //   }
      // // )
      // // console.log("neurone ", node)
      let graphData={nodes: [], links: []}

      let graph = ForceGraph3D()(options.domElement).graphData(graphData)
      graph
      .onBackgroundClick(event => onBackgroundClick(event))
      .onNodeClick(node => onNodeClick(node))

      console.log(graph)
      store.commit ('core/setGraph', graph)
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

      store.state.core.graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
      store.commit ('core/setCurrentNode', node)

    }

    async function onBackgroundClick(event){
      let node =       new Neurone(
        {
          //  blip: "blop",
          //  color: this.randomColor(),
          //
          //  id: i,
          //  name: "node fictif "+i, //"name for graph_",
          age: 0,
          type: "neurone",
          color: '#ffff00'
        }
      )
      console.log("onBackgroundClick", event)
      store.commit('core/setCurrentNode', node)
      console.log("new", node)
      //  Vue.prototype.$bvModal.show("modal-node")

    }
  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
