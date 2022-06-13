import * as levelgraph from 'levelgraph/build/levelgraph.js'
import * as levelgraphJSONLD from 'levelgraph-jsonld/build/levelgraph-jsonld.js'

let db
const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)


    Vue.prototype.$dbInit = async function(options = {}){
      console.log(options)
      db = levelgraphJSONLD(levelgraph(options.dbname || 'agentdb'));
      console.log("db", db)
      store.commit ('core/setDb', db)
      testManu()
    }



    async function testManu(){
      var manu = {
        "@context": {
          "name": "http://xmlns.com/foaf/0.1/name",
          "homepage": {
            "@id": "http://xmlns.com/foaf/0.1/homepage",
            "@type": "@id"
          }
        },
        "@id": "http://manu.sporny.org#person",
        "name": "Manu Sporny",
        "homepage": "http://manu.sporny.org/"
      };

      db.jsonld.put(manu, function(err, obj) {
        console.log("LEVELGRAPHJSONLD",err, obj)
      });
    }

    // async function onNodeClick(node){
    //
    //   // Aim at node from outside it
    //   //  console.log(node)
    //   //this.selectedNodes.clear()
    //   //this.selectedNodes.has(node) ? this.selectedNodes.delete(node) : this.selectedNodes.add(node);
    //   // console.log(this.selectedNodes)
    //   // if(node.url != undefined && node.url.startsWith('http')){
    //   //   app.$store.commit ('app/mustExplore', node.url)
    //   // }
    //
    //   const distance = 160;
    //   const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
    //
    //   graph.cameraPosition(
    //     { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
    //     node, // lookAt ({ x, y, z })
    //     3000  // ms transition duration
    //   );
    //   store.commit ('core/setCurrentNode', node)
    //
    // }
    //
    // async function onBackgroundClick(event){
    //   let node =       new Neurone(
    //     {
    //       //  blip: "blop",
    //       //  color: this.randomColor(),
    //       //
    //       //  id: i,
    //       //  name: "node fictif "+i, //"name for graph_",
    //       age: 0,
    //       type: "neurone",
    //       color: 'rgb(255,0,0,1)'
    //     }
    //   )
    //   console.log("onBackgroundClick", event)
    //   store.commit('core/setCurrentNode', node)
    //   console.log("new", node)
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
