import ForceGraph3D from '3d-force-graph';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import SpriteText from 'three-spritetext';
import {
  MeshLambertMaterial,
  BoxGeometry,
  CylinderGeometry,
  ConeGeometry,
  DodecahedronGeometry,
  SphereGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  Texture,
  SpriteMaterial,
  Sprite,
  Object3D,
  Vector3,
  Mesh } from 'three';

  import * as TWEEN from '@tweenjs/tween.js';

  const plugin = {
    install(Vue, opts = {}) {
      let store = opts.store
      const objects = [];
      const targets = { table: [], sphere: [], helix: [], grid: [] };
      let table = []
      let periode = 50
      let count = null



      Vue.prototype.$dynamic = function(){
        if (count == null){
          count = setInterval(() => {
            const { nodes, links } = store.state.core.graph.graphData();
            if (nodes.length == 0) nodes.push({id: 0 } )
            const id = nodes.length;
            store.state.core.graph.graphData({
              nodes: [...nodes, { id }],
              links: [...links, { source: id, target: id-1 }]
            });
          }, 1000);
        }else{
          console.log(count)
          clearInterval(count);
          count = null
        }
      }

      Vue.prototype.$testHelix = async function(){
        let now = Date.now()

        for (let i = -periode ; i < periode; i++ ){
          let d = new Date(now)
          d.setDate(d.getDate()+i);
          let id = now+i
          table.push({i: i,id: id, name: "j"+i, detail1:d.toLocaleString(), detail2:id, x:d.getDate(),y:d.getMonth()})
        }

        //console.log(table)


        for ( let i = 0; i < table.length; i ++ ) {
          let timeNode = await Vue.prototype.$newTimeNode(table[i])
          await store.state.core.nodes.push(timeNode)
        }
        transform( targets.helix, 2000 );
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

        let graphData={nodes: [], links: []}

        let graph = ForceGraph3D({extraRenderers: [new CSS2DRenderer(), new CSS3DRenderer()]})(options.domElement).graphData(graphData)
        graph
        //.backgroundColor('#eafaff')

        .nodeLabel('name')
        .nodeAutoColorBy("type")
        .nodeColor(node => /*highlightNodes.has(node) ? node === hoverNode ? 'rgb(255,0,0,1)' : 'rgba(255,160,0,0.8)' :*/ node.color)
        //.onBackgroundClick(event => onBackgroundClick(event))
        .onNodeClick(node => onNodeClick(node))
        // .onLinkClick(ln => onLinkClick(ln))
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
            Object.assign(sprite.position, middlePos);
          }
        })
        store.commit ('core/setGraph', graph)
      }


      function transform( targets, duration) {
        console.error("pb, ça multiplie à chaque fois",targets.length, objects.length)
        TWEEN.removeAll();

        for ( let i = 0; i < objects.length; i ++ ) {
          const object = objects[ i ];
          const target = targets[ i ];
          let name = target.name.split('_')[1]

          let node =store.state.core.graph.graphData()['nodes'].filter(x=> x.name== name)[0]

          node.fx = target.position.x
          node.fy = target.position.y
          node.fz = target.position.z


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
        //  .onUpdate( render )
        .start();


      }

      function nodeThreeObject(node){
        let shape = null
        let geometry = null
        let material =   new MeshLambertMaterial({
          color: node.color ||Math.round(Math.random() * Math.pow(2, 24)),
          transparent: true,
          opacity: 0.75
        })
        let image, texture, sprite = null
        switch (node.shape) {
          case "box":
          geometry = new BoxGeometry( 20,  20,  20)
          break;
          case "cylinder":
          geometry = new CylinderGeometry( 10,  10,  20)
          break;
          case "cone":
          geometry = new ConeGeometry( 10,  20)
          break;
          case "dodecahedron":
          geometry = new DodecahedronGeometry( 10)
          break;
          case "sphere":
          geometry = new SphereGeometry( 10)
          break;
          case "torus":
          geometry = new TorusGeometry( 10,  2)
          break;
          case "torusKnot":
          geometry = new TorusKnotGeometry( 10,  2)
          break;
          case "base64":
          image = new Image();
          image.src = node.base64;
          texture = new Texture();
          texture.image = image;
          image.onload = function () {
            texture.needsUpdate = true;
          };
          material = new SpriteMaterial({ map: texture });
          sprite = new Sprite(material);
          sprite.scale.set(12, 12);
          break;
          default:

        }
        if (sprite != null){
          shape = sprite
        }else{
          if(geometry == null){
            if(node.shape == "timeNode"){

              let e = node
              let i = e.i
              const element = document.createElement( 'div' );
              element.className = 'element';
              element.style.backgroundColor = e.name == 'j0' ?  'rgba(127,0,0,' + ( Math.random() * 0.5 + 0.5 ) + ')' : 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.5 ) + ')'

              const number = document.createElement( 'div' );
              number.className = 'number';
              number.textContent = e.x;
              element.appendChild( number );

              const name = document.createElement( 'div' );
              name.className = 'symbol';
              name.textContent = e.name;
              element.appendChild( name );

              const details = document.createElement( 'div' );
              details.className = 'details';
              details.innerHTML = e.detail1 + '<br>' + e.detail2;
              element.appendChild( details );

              const objectCSS = new CSS3DObject( element );
              objectCSS.position.x = Math.random() * 4000 - 2000;
              objectCSS.position.y = Math.random() * 4000 - 2000;
              objectCSS.position.z = Math.random() * 4000 - 2000;
              objectCSS.name = "defaut_"+e.name
              shape = objectCSS

              objects.push( objectCSS );

              element.parent = objectCSS;

              objectCSS.element.onclick = function(evt) {
                console.log("click", this, evt, e)
                this.parent.position.y += 10;

                onNodeClick(e);
              };

              // table

              const objectTable = new Object3D();
              objectTable.position.x = ( e.x * 140 ) - 1330;
              objectTable.position.y = - ( e.y * 180 ) + 990;
              objectTable.name = "table_"+e.name
              targets.table.push( objectTable );

              // sphere

              const vectorSphere = new Vector3();
              let l = table.length
              let k = l/2+i+2
              const phi = Math.acos( - 1 + ( 2 * k ) / l );
              const thetaSphere = Math.sqrt( l * Math.PI ) * Math.abs(phi);

              const objectSphere = new Object3D();

              objectSphere.position.setFromSphericalCoords( 800, phi, thetaSphere );

              vectorSphere.copy( objectSphere.position ).multiplyScalar( 2 );

              objectSphere.lookAt( vectorSphere );
              objectSphere.name = "sphere_"+e.name

              targets.sphere.push( objectSphere );

              //helix


              const thetaHelix = i * 0.175 + Math.PI;
              const y = - ( i * 8 ) + 450;

              const objectHelix = new Object3D();
              const vectorHelix = new Vector3();

              objectHelix.position.setFromCylindricalCoords( 900, thetaHelix, y );

              vectorHelix.x = objectHelix.position.x * 2;
              vectorHelix.y = objectHelix.position.y;
              vectorHelix.z = objectHelix.position.z * 2;

              objectHelix.lookAt( vectorHelix );
              objectHelix.name = "helix_"+e.name

              targets.helix.push( objectHelix );

              const objectGrid = new Object3D();

              objectGrid.position.x = ( ( i % 7 ) * 400 ) - 800;
              objectGrid.position.y = ( - ( Math.floor( i / 7 ) % 4 ) * 400 ) + 800;
              objectGrid.position.z = ( Math.floor( i / 28 ) ) * 1000 - 2000;
              objectGrid.name = "grid_"+e.name
              targets.grid.push( objectGrid );

            }else{
              const nodeEl = document.createElement('div');
              nodeEl.textContent = node.name //node.id;
              nodeEl.style.color = node.color || "#ffffff";
              nodeEl.className = 'node-label';
              shape = new CSS2DObject(nodeEl);
            }
          }else{
            shape = new Mesh(geometry, material)
          }
        }
        return shape
      }


      async function onNodeClick(node){

        //console.log("node",node)

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
        console.log(store.state.core.graph.graphData())
        let n = store.state.core.nodes.find(n => n.id == node.id)
        store.commit ('core/setCurrentNode', n)

      }
    }
  }

  // Auto-install
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
  }

  export default plugin
