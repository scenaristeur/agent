// import Vue from 'vue'
// import idb from '@/api/idb-nodes';
import * as Automerge from 'automerge'
// import { v4 as uuidv4 } from 'uuid';

const state = () => ({
  doc: null
})

const mutations = {
  setDoc(state, d){
    console.log(d)
    state.doc = d
  },
  updateDoc(state, newDoc) {
    state.doc = newDoc
    //render(newDoc)
  },

}

const actions = {
  async newDoc(context){
    let doc = Automerge.init()
    context.commit('setDoc', doc)
  },
  addItem(context, text) {
    console.log(context.state.doc)
    let newDoc = Automerge.change(context.state.doc, doc => {
      if (!doc.items) doc.items = []
      doc.items.push({ text, done: false })
    })
    context.commit('updateDoc', newDoc)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
