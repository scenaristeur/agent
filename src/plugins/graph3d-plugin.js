import ForceGraph3D from '3d-force-graph';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import SpriteText from 'three-spritetext';

// let selectedNodes = new Set(),
let highlightNodes = new Set(),
// highlightLinks = new Set(),
hoverNode= null
// import { Neurone/*, Brain,*/ /* Graph*/ } from '@/neurone-factory'

// let graph = undefined
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store



    Vue.prototype.$graphInit = async function(options){
      // console.log(options)
      let graphData={nodes: [], links: []}

      let graph = ForceGraph3D({extraRenderers: [new CSS2DRenderer()]})(options.domElement).graphData(graphData)
      graph
      //.backgroundColor('#eafaff')
      // .nodeId('id')
      .nodeLabel('name')
      .nodeColor(node => highlightNodes.has(node) ? node === hoverNode ? 'rgb(255,0,0,1)' : 'rgba(255,160,0,0.8)' : node.color)
      //.onBackgroundClick(event => onBackgroundClick(event))
      .onNodeClick(node => onNodeClick(node))
      .onLinkClick(ln => onLinkClick(ln))
      .nodeThreeObjectExtend(true)
      .nodeThreeObject(node => nodeThreeObject(node))
      .linkThreeObjectExtend(true)
      .linkThreeObject(link => {
        // extend link with text sprite
        if(link.label != undefined){
          const sprite = new SpriteText(`${link.label}`);
          sprite.color = 'lightgrey';
          sprite.textHeight = 1.5;
          return sprite;
        }
      })
      .linkDirectionalArrowLength(3.5)
      .linkDirectionalArrowRelPos(1)
      //  .linkCurvature(0.25)
      .linkPositionUpdate((sprite, { start, end }) => {
        if(sprite != undefined){
          const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
          })))



          // Position sprite
          Object.assign(sprite.position, middlePos);
        }
      })
      // .nodeThreeObject(({ url }) => nodeThreeObject(url))

      // console.log(graph)
      store.commit ('core/setGraph', graph)
    }


    function onLinkClick(ln){
      console.log(ln)
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
      console.log(store.state.core.nodes[1])

      const distance = 160;
      const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

      store.state.core.graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
      let n = store.state.core.nodes.find(n => n.id == node.id)
      store.commit ('core/setCurrentNode', n)

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
