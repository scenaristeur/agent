// import Vue from 'vue'
// import idb from '@/api/idb-nodes';
// import * as Automerge from 'automerge'
// import { v4 as uuidv4 } from 'uuid';

const state = () => ({
  doc: null,
  awareness : null,
  nodes: [],
  links: []
})

const mutations = {
  setAwareness(state, a){
    console.log(a)
    state.awareness = a
  },
  setNodes(state, n) {
    state.nodes = n
    //render(newDoc)
  },
  setLinks(state, l) {
    state.links = l
    //render(newDoc)
  },

  onNodesChange(state, n){
    console.log("nodes changed", n)
  },
  onLinksChange(state, l){
    console.log("links changed", l)
  },

  async onContentArrayChange(state,ca){
    let brains = ca.content
    let room = ca.room

    for await (const brain of brains) {

      let id = brain._item.id
      let getId = id.clock - id.client
      console.log("BRain",getId, id/*, brain*/)
      for await (const neurone of brain) {


        neurone.group = getId
        console.log("room",room,"Neuron",neurone)
        // var index = state.nodes.findIndex(x => x.id == neurone.id);
        //
        // index === -1 ? state.nodes.push(neurone) : Object.assign(state.nodes[index], neurone)
        // //console.log(state.nodes[index])
        // state.graph.graphData({nodes: state.nodes, links: state.links})

      }
    }

    // brains.forEach((brain) => {
    //
    //   let id = brain._item.id
    //   let getId = id.clock - id.client
    //   console.log("BRAIN",brain,brain._item, id, getId)
    //   brain.forEach((neurone) => {
    //     console.log("neurone",neurone)
    //   });
    //
    //
    //
    // });

  },

}

const actions = {
  set(context, item){
    console.log("set",item)
    console.log("nodes in yjs",context.state.nodes)
    let {map, node} = item
    console.log(map, node)
    context.state[map].set(node.id, node)
    // console.log("state.nodes", state.nodes)
    // context.state.nodes.insert(context.state.nodes.length, a.item);
  },
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
