// import ForceGraph3D from '3d-force-graph';
// import { Core /*Neurone, Brain,  Graph*/ } from '@/neurone-factory'
//

// import * as IPFS from 'ipfs-core' // pb webpack https://github.com/ipfs/js-ipfs/issues/1927
const IPFS = window.IpfsCore;


// import { v4 as uuidv4 } from 'uuid';

const plugin = {
  async install(Vue, opts = {}) {
    let store = opts.store
    const ipfs = await IPFS.create()
    console.log(ipfs)

    Vue.prototype.$saveBrainToIpfs = async function(){

  console.log("IPFS",store.state.core.nodes)

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


let donnees = store.state.core.nodes

// add your data to to IPFS - this can be a string, a Buffer,
// a stream of Buffers, etc
const cidAll = await ipfs.addAll(donnees)
console.log(cidAll)

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
