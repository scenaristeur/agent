import ForceGraph3D from '3d-force-graph';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';

// let selectedNodes = new Set(),
let highlightNodes = new Set(),
// highlightLinks = new Set(),
hoverNode= null
// import { Neurone/*, Brain,*/ /* Graph*/ } from '@/neurone-factory'

// let graph = undefined
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)


    Vue.prototype.$graphInit = async function(options){
      console.log(options)
      let graphData={nodes: [], links: []}

      let graph = ForceGraph3D({extraRenderers: [new CSS2DRenderer()]})(options.domElement).graphData(graphData)
      graph
      // .nodeId('id')
      .nodeLabel('name')
      .nodeColor(node => highlightNodes.has(node) ? node === hoverNode ? 'rgb(255,0,0,1)' : 'rgba(255,160,0,0.8)' : node.color)
      //.onBackgroundClick(event => onBackgroundClick(event))
      .onNodeClick(node => onNodeClick(node))
      .nodeThreeObjectExtend(true)
      .nodeThreeObject(node => nodeThreeObject(node))
      // .nodeThreeObject(({ url }) => nodeThreeObject(url))

      console.log(graph)
      store.commit ('core/setGraph', graph)
    }




function nodeThreeObject(node){
  const nodeEl = document.createElement('div');
  nodeEl.textContent = node.name //node.id;
  nodeEl.style.color = node.color || "#ffffff";
  nodeEl.className = 'node-label';
  return new CSS2DObject(nodeEl);
}
// function nodeThreeObject({url}){
//   // .nodeThreeObject(({ url }) => {
//
//   // if(url == undefined){
//   //   url = "root"
//   // }
//   if (url != undefined && (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg'))){
//     const imgTexture = new THREE.TextureLoader().load(`${url}`);
//     const material = new THREE.SpriteMaterial({ map: imgTexture });
//     const sprite = new THREE.Sprite(material);
//     sprite.scale.set(12, 12);
//     return sprite;
//   }
//
// // })
// }


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

    // async function onBackgroundClick(event){
    //   // let node =       new Neurone(
    //   //   {
    //   //     //  blip: "blop",
    //   //     //  color: this.randomColor(),
    //   //     //
    //   //     //  id: i,
    //   //     //  name: "node fictif "+i, //"name for graph_",
    //   //     age: 0,
    //   //     type: "neurone",
    //   //     color: '#ffff00'
    //   //   }
    //   // )
    //   console.log(event)
    //   store.dispatch('core/newNode')
    //   // console.log("new", node)
    //   //  Vue.prototype.$bvModal.show("modal-node")
    //
    // }
  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
