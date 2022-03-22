// import Vue from 'vue'
const state = () => ({
  currentNode : undefined,
  history: [],
  lastCommand: null
})

const mutations = {
  pushHistory(state, c){
    state.lastCommand = c
    state.history.push(c)
  },
  setCurrentNode(state, n){
    console.log(n)
    state.currentNode = n
  },
}

const actions = {
  // async addWorkspace(context, w) {
  //   context.state.pod.workspaces.push(w)
  //   Vue.prototype.$addWorkspaceToPod(w)
  // },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
