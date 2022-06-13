// import Vue from 'vue'
let rot = Math.random()*Math.PI

const state = () => ({
  graph: undefined,
  nodes: [{id: "user", name: "USER", color: "lightblue"}, {id: "graph", name: "GRAPH"}],
  links: [
    {source: "user", target: "graph",label: "start", curvature: .3, rotation: rot, date: Date.now()}
  ],
  highlightNodes: new Set(),
  highlightLinks: new Set(),
  // rootNode: "test-brains",
  // gunBrains : []
})

const mutations = {
  setGraph(state, g){
    state.graph = g
  },
  // async addGunBrains(state, b){
  //   console.log(b)
  //   const index = await state.gunBrains.findIndex(object => object.key == b.key);
  //   console.log(index)
  //   if (index === -1) {
  //     let br = Object.assign({},b.node)
  //     br.key = b.key
  //     await state.gunBrains.push(br)
  //     // await Vue.prototype.$gun.get(b.key).open(async (doc) => {
  //     //   console.log("doc",b.key,  doc)
  //     //   doc.key = b.key
  //     //   await state.gunBrains.push(doc)
  //     // })
  //   }
  // },
  // setRootNode(state,r){
  //   state.rootNode = r
  // }
}

const actions = {
  // async newDoc(context){
  //   let doc = Automerge.init()
  //   context.commit('setDoc', doc)
  // },
  // addItem(context, text) {
  //   console.log(context.state.doc)
  //   let newDoc = Automerge.change(context.state.doc, doc => {
  //     if (!doc.items) doc.items = []
  //     doc.items.push({ text, done: false })
  //   })
  //   context.commit('updateDoc', newDoc)
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
