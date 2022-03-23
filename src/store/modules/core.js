// import Vue from 'vue'
const state = () => ({
  core: undefined,
  currentNode : undefined,
  brain: undefined,
  graph: undefined,
  db: undefined,
  history: [],
  lastCommand: null
})

const mutations = {
  setCore(state, c){
    console.log(c)
    state.c = c
  },
  pushHistory(state, c){
    state.lastCommand = c
    state.history.push(c)
  },
  setCurrentNode(state, n){
    console.log(n)
    state.currentNode = n
  },
  setBrain(state, b){
    console.log(b)
    state.brain = b
  },
  setGraph(state, g){
    console.log(g)
    state.graph = g
  },
  setDb(state, db){
    console.log(db)
    state.db = db
  },
  addNode(state, n){
    let {nodes, links} = state.graph.graphData()
    nodes.push(n)
    state.graph.graphData({ nodes: nodes, links: links })
  }
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
