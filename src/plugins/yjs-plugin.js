// import { Galaxy } from '@/api/galaxy';
import { WebsocketProvider } from "y-websocket";
// import { WebrtcProvider } from 'y-webrtc'
import * as Y from "yjs";
let awareness = {}

const plugin = {
  install(Vue, opts = {}) {
    let store = opts.store
    console.log(store)
    Vue.prototype.$createDoc = async function(room){
      console.log("create");

      const model = createDocModel(room);
      console.log(model)
      const doc = model.doc;
      // let providers = model.providers
      //console.log("providers",providers)
      this.$store.commit('yjs/setAwareness', model.awareness)
      const nodes = doc.getMap("nodes");
      const links = doc.getMap("links");
      this.$store.commit('yjs/setNodes', nodes)
      this.$store.commit('yjs/setLinks', links)

      let ymap = nodes
      ymap.observe(ymapEvent => {
        ymapEvent.target === ymap // => true

        // Find out what changed:
        // Option 1: A set of keys that changed
        ymapEvent.keysChanged // => Set<strings>
        // Option 2: Compute the differences
        ymapEvent.changes.keys // => Map<string, { action: 'add'|'update'|'delete', oldValue: any}>

        // sample code.
        ymapEvent.changes.keys.forEach((change, key) => {
          if (change.action === 'add') {
            console.log(`Property "${key}" was added. Initial value: "${JSON.stringify(ymap.get(key).name)}".`)
          } else if (change.action === 'update') {
            console.log(`Property "${key}" was updated. New value: "${JSON.stringify(ymap.get(key).name)}". Previous value: "${JSON.stringify(change.oldValue).name}".`)
          } else if (change.action === 'delete') {
            console.log(`Property "${key}" was deleted. New value: undefined. Previous value: "${JSON.stringify(change.oldValue).name}".`)
          }
        })
      })

      // ymap.set('key', 'value') // => Property "key" was added. Initial value: "value".
      // ymap.set('key', 'new') // => Property "key" was updated. New value: "new". Previous value: "value".
      // ymap.delete('key') // => Property "key" was deleted. New value: undefined. Previous Value: "new".

      // this.contentArray = content.toArray();
      // nodes.observe(event => {
      //   console.log("event", event, event.changes.delta);
      //   // this.contentArray = content.toArray();
      //   this.$store.commit('yjs/onNodesChange', {room: room, content: nodes, delta: event.changes.delta})
      // });
      // links.observe(event => {
      //   console.log("event", event, event.changes.delta);
      //   this.$store.commit('yjs/onLinksChange', {room: room, content: links, delta: event.changes.delta})
      //   // this.contentArray = content.toArray();
      //   //this.$store.commit('yjs/onContentArrayChange', {room: room, content: this.contentArray})
      // });

      this.$store.commit('core/addConnector', {name: 'yjs', room: room})
    }


    function createDocModel(id) {
      const doc = getDoc(id);
      return new Vue({
        data() {
          return {
            doc,
            content: null,
            awareness
          };
        }
      });
    }


    const getDoc = id => {
      const ydoc = new Y.Doc();
      // const providerWebsocket = new WebsocketProvider(`wss:yjs-demos.now.sh`, id, ydoc);
      const providerWebsocket = new WebsocketProvider(`wss://demos.yjs.dev`, id, ydoc);

        // const provider = new WebsocketProvider(`wss:yjs-demos.now.sh`, id, ydoc);
        // const providerWebrtc = new WebrtcProvider(id, ydoc)
        // providers.push(providerWebsocket)
        // providers.push(providerWebrtc)
        awareness.websocket = providerWebsocket.awareness
        // awareness.webrtc = providerWebrtc.awareness
        // const provider = new WebsocketProvider(`wss://demos.yjs.dev`, id, ydoc);
        // const provider = new WebsocketProvider(`ws://demos.yjs.dev`, id, ydoc);
        // const awarnessWebsocket = providerWebsocket.awareness
        // const awarenessWebrtc = providerWebrtc.awareness
        // //
        // Vue.prototype.$store.commit('core/setAwarness', {awarnessWebsocket: awarnessWebsocket, awarenessWebrtc: awarenessWebrtc})
        // // import { WebsocketProvider } from 'y-websocket'
        // //
        // // // connect to the public demo server (not in production!)
        // // const provider = new WebsocketProvider(
        // //   'wss://demos.yjs.dev', 'quill-demo-room', ydoc
        // // )
        //
        // console.log("provider", providerWebsocket, providerWebrtc)
        console.log("ydoc",ydoc)
        return ydoc;
      };
      // Vue.prototype.$brain_create = async function(){
      //   console.log(store.state.core.nodes)
      //
      //   let brainName = prompt("What is the name of this brain ?");
      //   console.log(brainName)
      //   let brainNode
      //   if (brainName != undefined) {
      //     let b = {name: brainName,
      //       neurones : store.state.core.nodes.map(n => {return {id: n.id.startsWith('http') ? n.id : n['@context']['@base']+n.id}}),
      //       type: "brain",
      //       color: "purple"}
      //       brainNode = await Vue.prototype.$newNode(b)
      //       console.log(brainNode)
      //       store.dispatch('core/saveNode', brainNode)
      //     }
      //
      //     for (const n of store.state.core.nodes){
      //       let brainNodeId = brainNode.id.startsWith('http') ? brainNode.id : n['@context']['@base']+brainNode.id
      //       n.brains == undefined ? n.brains = [] : ""
      //       var index = n.brains.findIndex(x => x.id==brainNodeId);
      //       if(index === -1){
      //         n.brains.push({id: brainNodeId})
      //       }
      //       store.dispatch('core/saveNode', brainNode)
      //
      //       console.log(n)
      //     }
      //
      //
      //   }
      // let galaxy = new Galaxy()
      // galaxy.init()
      // console.log(galaxy)
      // store.commit('core/setGalaxy', galaxy)
      // Vue.prototype.$search = async function(params){
      //   console.log("searching ", params.text, store.state.core.nodes)
      //   let candidates = store.state.core.nodes
      //   let results = candidates.filter(n => (n.name != undefined && n.name.includes(params.text)) )
      //   if (params.searchById == true){
      //     /* || n.id.includes(text)*/
      //     let resultsById = candidates.filter(n => (n.id.includes(params.text)) )
      //     results = results.concat(resultsById)
      //   }
      //
      //
      //   //store.commit('app/setBrain', brain)
      //   return results
      // }


    }
  }

  // Auto-install
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
  }

  export default plugin
