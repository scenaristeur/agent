// import ForceGraph3D from '3d-force-graph';
// import { Core /*Neurone, Brain,  Graph*/ } from '@/neurone-factory'
//

// import * as IPFS from 'ipfs-core' // pb webpack https://github.com/ipfs/js-ipfs/issues/1927


import {concat} from 'uint8arrays'

// import { v4 as uuidv4 } from 'uuid';

const plugin = {
  async install(Vue, opts = {}) {
    let store = opts.store
    const IPFS = window.IpfsCore;
    const ipfs = await IPFS.create()
    let id = await ipfs.id()
    console.log(ipfs,id )
    store.commit('core/setIpfsNode',id)

    Vue.prototype.$saveBrainToIpfs = async function(){

  console.log("IPFS",ipfs,store.state.core.nodes)

      const text = 'Hello, Blabla'

// add your data to to IPFS - this can be a string, a Buffer,
// a stream of Buffers, etc
const cid = await ipfs.add(text)
console.log(cid, cid.toString())


const stream = ipfs.cat(cid.path)
let data = ''

for await (const chunk of stream) {
  // chunks of data are returned as a Buffer, convert it back to a string
  data += chunk.toString()
}

console.log(data)



// let donnees = store.state.core.nodes

// add your data to to IPFS - this can be a string, a Buffer,
// a stream of Buffers, etc
store.state.core.nodes.forEach(async function(node) {

console.log(node)
  const cid = await ipfs.add(JSON.stringify(node))
  console.log(cid, node)
  let c = {cid: cid.path, name: node.name, id: node.id}
  store.commit('core/addIpfsCid', c)
  let chunks = []

  for await (const chunk of ipfs.cat(cid.path)) {
     chunks.push(chunk);
}

const data = concat(chunks)
const decodedData = JSON.parse(new TextDecoder().decode(data).toString());
console.log(decodedData)
  // const cid = await ipfs.object.new(node)
  // console.log(cid)
});

// we loop over the results because 'add' supports multiple
// additions, but we only added one entry here so we only see
// one log line in the output
// for await (const { cid } of results) {
//   // CID (Content IDentifier) uniquely addresses the data
//   // and can be used to get it again.
//   console.log(cid.toString())
// }

// const { cid } = await ipfs.add('Hello world')
// console.info(cid)




}


  }
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
