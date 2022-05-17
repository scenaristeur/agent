// import Vue from 'vue'

// import { v4 as uuidv4 } from 'uuid';
let gunRoot = 'biptest1'

const plugin = {
  async install(Vue, opts = {}) {
    let store = opts.store
    // const IPFS = window.IpfsCore;
    // const ipfs = await IPFS.create()
    // let id = await ipfs.id()
    // console.log(ipfs,id )
    // store.commit('core/setIpfsNode',id)



    Vue.prototype.$saveBrainToGun = async function(){
      let gun = Vue.prototype.$gun

      // gun.get(gunRoot).map().on((node, key) => {
      //   console.log("node",node, key)
      //   // add results straight to the Vue component state
      //   // and get updates when nodes are updated by GUN
      //   //this.todos[key] = node;
      //   //  console.log(this.todos)
      // });
      //  console.log("IPFS",ipfs,store.state.core.nodes)
      let nodes = store.state.core.nodes
      console.log(nodes, gun)


      // let mark = {
      //   age: 23,
      //   hacker: true,
      //   name: "Mark Nadal"
      // }
      store.state.core.nodes.forEach((n) => {
        let mark1 =  gun.get(gunRoot).set(n)
        console.log(mark1)

      })

      let retrieve = gun.get(gunRoot)
      console.log("retrieve",retrieve)
      // retrieve.toJSON().once(function(value, key){
      //   console.log("What is the name?", value, key);
      // })
      // retrieve.get('name').once(function(value, key){
      //   console.log("What is the name?", value, key);
      // })


      // store.state.core.nodes.forEach((n) => {
      //   let saved = gun.get('pin').set(n)
      //   console.log("saved", saved)
      // });
      //
      //
      //

      //  let links = store.state.core.links
      //  let graph = nodes.concat(links)
      // const graph_cid = await ipfs.add(JSON.stringify(nodes))
      //
      // console.log(graph_cid)
      // store.commit('core/setGraphCid', graph_cid)

    }

    Vue.prototype.$loadAllFromGun = async function(){
      let gun = Vue.prototype.$gun

      gun.get(gunRoot).map().on((node, key) => {
      //  console.log("node",node, key)
        rebuild(node, key)
        // add results straight to the Vue component state
        // and get updates when nodes are updated by GUN
        //this.todos[key] = node;
        //  console.log(this.todos)
      });
    }

    async function rebuild(n){
      let gun = Vue.prototype.$gun
      let node = {}
      for (const [key, value] of Object.entries(n)) {
        console.log(key, value);
        switch (typeof value) {
          case "string":
        //  console.log("string ", value)
          node[key] = value
          break;
          case "object":
        //  console.log("object ", value)
          if (value['#'] != undefined){
            gun.get(value['#']).once(function(value, key){
              console.log("value of the object", value, key);
            })
          }else{
            console.log("# undefined in", value)
          }
          break;
          default:
          console.log("todo  ", typeof value, value)
        }
      }
console.log("rebuilded", node)


    }

    Vue.prototype.$loadBrainFromGun = async function(id){
      console.log(id)


      // let chunks = []
      //
      // for await (const chunk of ipfs.cat(cid)) {
      //   chunks.push(chunk);
      // }
      //
      // const data = concat(chunks)
      // const decodedData = JSON.parse(new TextDecoder().decode(data).toString());
      // console.log("decoded",decodedData)
      // for await (const node of decodedData) {
      //   await store.dispatch('core/saveNode', node)
      // }
      // console.log('1')
      // await store.dispatch('core/getNodes')
      // console.log('2')
      //alert("comming soon",JSON.stringify(decodedData))

    }


    // Vue.prototype.$saveNodesToIpfs = async function(){
    //
    //   console.log("IPFS",ipfs,store.state.core.nodes)
    //   store.commit('core/resetIpfsCid')
    //
    //
    //   store.state.core.nodes.forEach(async function(node) {
    //
    //     console.log(node)
    //     const cid = await ipfs.add(JSON.stringify(node))
    //     console.log(cid, node)
    //     let c = {cid: cid.path, name: node.name, id: node.id}
    //     store.commit('core/addIpfsCid', c)
    //     let chunks = []
    //
    //     for await (const chunk of ipfs.cat(cid.path)) {
    //       chunks.push(chunk);
    //     }
    //
    //     const data = concat(chunks)
    //     const decodedData = JSON.parse(new TextDecoder().decode(data).toString());
    //     console.log(decodedData)
    //     // const cid = await ipfs.object.new(node)
    //     // console.log(cid)
    //   });
    //
    //
    //
    //   // we loop over the results because 'add' supports multiple
    //   // additions, but we only added one entry here so we only see
    //   // one log line in the output
    //   // for await (const { cid } of results) {
    //   //   // CID (Content IDentifier) uniquely addresses the data
    //   //   // and can be used to get it again.
    //   //   console.log(cid.toString())
    //   // }
    //
    //   // const { cid } = await ipfs.add('Hello world')
    //   // console.info(cid)
    //
    //
    //
    //
    // }


  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
