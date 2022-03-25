import Vue from 'vue'
import idb from '@/api/idb-nodes';
import { v4 as uuidv4 } from 'uuid';

const state = () => ({
  core: undefined,
  currentNode : undefined,
  brain: undefined,
  graph: undefined,
  db: undefined,
  commandHistory: [],
  command: null,
  nodes: [],
  links: [],
  jsonldProps: ['@context', 'id', 'reverse', 'type'],
  graphProps: ['__ob__', '__threeObj', 'index', 'vx', 'vy', 'vz', 'x', 'y', 'z' ]
})

const mutations = {
  setCore(state, c){
    console.log(c)
    state.c = c
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
  setCommand(state, c){
    state.command = c
  },
  pushHistory(state, c){
    state.commandHistory.push(c)
  },
  setLinks(state, l){
    state.links = l
  }
}

const actions = {
  async pushCommandHistory(context, c){
    context.commit('setCommand', c)
    context.commit('pushHistory',c)
    if(c.type == "triplet"){
      let subjectNode = context.state.nodes.find(x => x.name == c.value.subject)
      let objectNode = context.state.nodes.find(x => x.name == c.value.object)
      subjectNode == undefined ? subjectNode = Vue.prototype.$newNode({name: c.value.subject}) : ""
      objectNode == undefined ? objectNode = Vue.prototype.$newNode({name: c.value.object}) : ""
      let nodes2save  = Vue.prototype.$addProp({subject: subjectNode, predicate:c.value.predicate, object:objectNode})
      nodes2save.forEach(async function(n) {
        await context.dispatch('saveNode', n)
      });
      await context.dispatch('getNodes') // pose problème de rafraichissement, certainement car on a enlevé __ob & __threeObj
    }
  },
  async newNode(context){
    let node = Vue.prototype.$newNode()
    context.commit('setCurrentNode', node)
  },
  async saveNode(context, node){
    try{
      await idb.saveNode(node);
    }catch(e){
      alert(e)
    }
  },
  async getNodes(context) {
    let nodes = await idb.getNodes();
    let linksTemp = []
    console.log("nodes in db", nodes)
    nodes.forEach(n => {
      n.type == undefined ? n.type = "neurone" : ""
      var index = context.state.nodes.findIndex(x => x.id==n.id);

      index === -1 ? context.state.nodes.push(n) : Object.assign(context.state.nodes[index], n)
      for (let [p,v] of Object.entries(n)){
        if(!context.state.jsonldProps.includes(p) && !context.state.graphProps.includes(p)){
          // console.log("#", typeof v,p, v)
          if(Array.isArray(v)){
            for(let item of v ){
              //  console.log('##',item.id, item)
              linksTemp.push({source: n.id, target: item.id, label: p})
            }
          }else if(typeof v == "object" && v.id != undefined){
            linksTemp.push({source: n.id, target: v.id, label: p})
          }
        }
      }
    });


    let validLinks = linksTemp.filter(l => context.state.nodes.findIndex(n => n.id==l.target) > -1 )
    let otherLinks = linksTemp.filter(l => context.state.nodes.findIndex(n => n.id==l.target) === -1 )
    console.log("validlinks, otherlinks",validLinks, otherLinks)

    context.commit('setLinks', validLinks)
  },
  async saveBrain(context){

    let {nodes, links} = context.state.graph.graphData()
    console.log(nodes, links)
    let nodes_ids = []
    for (let node of nodes){
      console.log(node)
      delete node.__ob__
      delete node.__threeObj
      node.id == undefined ? node.id = uuidv4() : ""
      node.created == undefined ? node.created = Date.now() : ""
      node.updated = Date.now()
      nodes_ids.push(node.id)
      console.log(node)
      await idb.saveNode(node);
    }

    let brain = {id: uuidv4(), nodes: nodes_ids, type: 'brain', color: "#fffff"}
    await idb.saveNode(brain);
    //  context.dispatch('getNodes')

  }
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
