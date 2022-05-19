import ForceGraph3D from '3d-force-graph';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import SpriteText from 'three-spritetext';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

// let selectedNodes = new Set(),
// let highlightNodes = new Set(),
// highlightLinks = new Set(),
// hoverNode= null
// import { Neurone/*, Brain,*/ /* Graph*/ } from '@/neurone-factory'

// let graph = undefined
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    const objects = [];
    const targets = { table: [], sphere: [], helix: [], grid: [] };


    Vue.prototype.$testHelix = async function(){
      console.log("test")
      let graph = store.state.core.graph
      let scene = graph.scene()

//test timestamp
let now = Date.now()
let table = []
// table = table.push({symbol: 'Now', detail1:'now Timestamp', detail2: now, x:0, y:0})

let periode = 50
for (let i = -periode ; i < periode; i++ ){
  let d = new Date(now)
  d.setDate(d.getDate()+i);
  table.push({symbol: i, detail1:d.toLocaleString(), detail2:now+i, x:d.getDate(),y:d.getMonth()})
}

console.log(table)

    // table

      for ( let i = 0; i < table.length; i ++ ) {
let e = table [i]
        const element = document.createElement( 'div' );
        element.className = 'element';
        // element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
        element.style.backgroundColor = e.symbol == 0 ?  'rgba(127,0,0,' + ( Math.random() * 0.5 + 0.25 ) + ')' : 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')'

        const number = document.createElement( 'div' );
        number.className = 'number';
        number.textContent = e.x;
        element.appendChild( number );

        const symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = e.symbol;
        element.appendChild( symbol );

        const details = document.createElement( 'div' );
        details.className = 'details';
        details.innerHTML = e.detail1 + '<br>' + e.detail2;
        element.appendChild( details );
      //  console.log(element)

        element.addEventListener('pointerdown', () => {
        //  alert("click element")
          console.log(element)
         })

        const objectCSS = new CSS3DObject( element );
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        scene.add( objectCSS );

        objects.push( objectCSS );

        //

        const object = new THREE.Object3D();
        object.position.x = ( e.x * 140 ) - 1330;
        object.position.y = - ( e.y * 180 ) + 990;

        targets.table.push( object );

      }

      // sphere

      const vector = new THREE.Vector3();

      for ( let i = 0, l = objects.length; i < l; i ++ ) {

        const phi = Math.acos( - 1 + ( 2 * i ) / l );
        const theta = Math.sqrt( l * Math.PI ) * phi;

        const object = new THREE.Object3D();

        object.position.setFromSphericalCoords( 800, phi, theta );

        vector.copy( object.position ).multiplyScalar( 2 );

        object.lookAt( vector );

        targets.sphere.push( object );

      }
      // helix

      for ( let i = 0, l = objects.length; i < l; i ++ ) {

        const theta = i * 0.175 + Math.PI;
        const y = - ( i * 8 ) + 450;

        const object = new THREE.Object3D();

        object.position.setFromCylindricalCoords( 900, theta, y );

        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;

        object.lookAt( vector );

        targets.helix.push( object );

      }


      // grid

      for ( let i = 0; i < objects.length; i ++ ) {

        const object = new THREE.Object3D();

        object.position.x = ( ( i % 5 ) * 400 ) - 800;
        object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
        object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

        targets.grid.push( object );

      }

      // transform( targets.table, 2000 );



      ///////////////////////////////
      // test plane
      // const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
      // const planeMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000, side: THREE.DoubleSide});
      // const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
      // mesh.position.set(-100, -200, -100);
      // mesh.rotation.set(0.5 * Math.PI, 0, 0);
      //
      // graph.scene().add(mesh);
      transform( targets.helix, 2000 );
      console.log(store.state.core.graph.graphData())
      console.log(store.state.core.graph.scene())
    }


    Vue.prototype.$transformTable =  function (){
      transform( targets.table, 2000 );
    }
    Vue.prototype.$transformSphere =  function (){
      transform( targets.sphere, 2000 );
    }
    Vue.prototype.$transformHelix =  function (){
      transform( targets.helix, 2000 );
    }
    Vue.prototype.$transformGrid =  function (){
      transform( targets.grid, 2000 );
    }
Vue.prototype.$resetCam = function(){
//  console.log(store.state.core.graph.cameraPosition())
  store.state.core.graph.zoomToFit()
    // store.state.core.graph.cameraPosition(
    //   pos, // new position
    //   node, // lookAt ({ x, y, z })
    //   3000  // ms transition duration
    // );
  }

    Vue.prototype.$graphInit = async function(options){
      // console.log(options)
      let graphData={nodes: [], links: []}

      let graph = ForceGraph3D({extraRenderers: [new CSS2DRenderer(), new CSS3DRenderer()]})(options.domElement).graphData(graphData)
      graph
      //.backgroundColor('#eafaff')
      // .nodeId('id')
      .nodeLabel('name')
      .nodeAutoColorBy("type")
      .nodeColor(node => /*highlightNodes.has(node) ? node === hoverNode ? 'rgb(255,0,0,1)' : 'rgba(255,160,0,0.8)' :*/ node.color)
      //.onBackgroundClick(event => onBackgroundClick(event))
      .onNodeClick(node => onNodeClick(node))
      .onLinkClick(ln => onLinkClick(ln))
      .nodeThreeObjectExtend(node => node.shape == undefined || node.shape == null)
      .nodeThreeObject(node => nodeThreeObject(node))
      // .nodeThreeObject(node => nodeThreeObjectGroup(node))
      .linkCurvature('curvature')
      .linkCurveRotation('rotation')
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
            [c]: start[c] + (end[c] - start[c]) / 4 // calc middle point
          })))
          // Position sprite
          Object.assign(sprite.position, middlePos);
        }
      })
      // console.log(graph)
      store.commit ('core/setGraph', graph)
    }


    function transform( targets, duration) {
      // let graph = store.state.core.graph
      // console.log(graph)
      // let renderer = graph.renderer()
      TWEEN.removeAll();

      for ( let i = 0; i < objects.length; i ++ ) {

        const object = objects[ i ];
        const target = targets[ i ];

        new TWEEN.Tween( object.position )
        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

        new TWEEN.Tween( object.rotation )
        .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

      }

      new TWEEN.Tween( this )
      .to( {}, duration * 2 )
      //.onUpdate( render )
      .start();

    }

    function onLinkClick(ln){
      console.log(ln)
    }


    function nodeThreeObject(node){
      let shape = null
      let geometry = null
      let material =   new THREE.MeshLambertMaterial({
        color: node.color ||Math.round(Math.random() * Math.pow(2, 24)),
        transparent: true,
        opacity: 0.75
      })
      let image, texture, sprite = null
      // console.log(material)
      // console.log(node.shape)
      switch (node.shape) {
        case "box":
        geometry = new THREE.BoxGeometry( 20,  20,  20)
        break;
        case "cylinder":
        geometry = new THREE.CylinderGeometry( 10,  10,  20)
        break;
        case "cone":
        geometry = new THREE.ConeGeometry( 10,  20)
        break;
        case "dodecahedron":
        geometry = new THREE.DodecahedronGeometry( 10)
        break;
        case "sphere":
        geometry = new THREE.SphereGeometry( 10)
        break;
        case "torus":
        geometry = new THREE.TorusGeometry( 10,  2)
        break;
        case "torusKnot":
        geometry = new THREE.TorusKnotGeometry( 10,  2)
        break;
        case "base64":
        //  console.log("base64",node)
        image = new Image();
        image.src = node.base64;
        texture = new THREE.Texture();
        texture.image = image;
        image.onload = function () {
          texture.needsUpdate = true;
        };
        material = new THREE.SpriteMaterial({ map: texture });
        sprite = new THREE.Sprite(material);
        sprite.scale.set(12, 12);
        //return sprite;
        break;
        default:
        //  geometry = null

      }
      if (sprite != null){
        shape = sprite
        //  console.log("sprite", shape)
      }else{
        if(geometry == null){
          const nodeEl = document.createElement('div');
          nodeEl.textContent = node.name //node.id;
          nodeEl.style.color = node.color || "#ffffff";
          nodeEl.className = 'node-label';
          shape = new CSS2DObject(nodeEl);
          // console.log(shape)
          // nodeEl.addEventListener('pointerdown', () => {
          //   alert(1)
          //   console.log(shape)
          //  })
        }else{
          shape = new THREE.Mesh(geometry, material)
        }
      }
      return shape
    }


    // function nodeThreeObjectGroup(node){
    //
    //   const group = new THREE.Group();
    //
    //   let label = null
    //   let geometry = null
    //   let material =   new THREE.MeshLambertMaterial({
    //     color: node.color ||Math.round(Math.random() * Math.pow(2, 24)),
    //     transparent: true,
    //     opacity: 0.75
    //   })
    //   // console.log(material)
    //   // console.log(node.shape)
    //   switch (node.shape) {
    //     case "box":
    //     geometry = new THREE.BoxGeometry(Math.random() * 20, Math.random() * 20, Math.random() * 20)
    //     break;
    //     case "cylinder":
    //     geometry = new THREE.CylinderGeometry(Math.random() * 10, Math.random() * 10, Math.random() * 20)
    //     break;
    //     case "cone":
    //     geometry = new THREE.ConeGeometry(Math.random() * 10, Math.random() * 20)
    //     break;
    //     case "dodecahedron":
    //     geometry = new THREE.DodecahedronGeometry(Math.random() * 10)
    //     break;
    //     case "sphere":
    //     geometry = new THREE.SphereGeometry(Math.random() * 10)
    //     break;
    //     case "torus":
    //     geometry = new THREE.TorusGeometry(Math.random() * 10, Math.random() * 2)
    //     break;
    //     case "torusKnot":
    //     geometry = new THREE.TorusKnotGeometry(Math.random() * 10, Math.random() * 2)
    //     break;
    //     default:
    //   }
    //
    //   const nodeEl = document.createElement('div');
    //   nodeEl.textContent = node.name //node.id;
    //   nodeEl.style.color = node.color || "#ffffff";
    //   nodeEl.className = 'node-label';
    //   label =  new CSS2DObject(nodeEl);
    //
    //   if (geometry != null){
    //     group.add(new THREE.Mesh(geometry, material))
    //   }
    //   group.add(label)
    //
    //   return group
    // }


    // function nodeThreeObject1(node){
    //   const nodeEl = document.createElement('div');
    //   nodeEl.textContent = node.name //node.id;
    //   nodeEl.style.color = node.color || "#ffffff";
    //   nodeEl.className = 'node-label';
    //   return new CSS2DObject(nodeEl);
    // }
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
      console.log("node",node)

      const distance = 40;
      let pos = {x: distance, y: distance, z: distance}
      if(node.x != 0 && node.y != 0 && node.z != 0){
        const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
        pos = { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
      }
      store.state.core.graph.cameraPosition(
        pos, // new position
        node, // lookAt ({ x, y, z })
        3000  // ms transition duration
      );
      // console.log(store.state.core.graph)
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
