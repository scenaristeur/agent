import Vue from 'vue'
import idb from '@/api/idb-nodes';
import { v4 as uuidv4 } from 'uuid';

const state = () => ({
  core: undefined,
  currentNode : undefined,
  nodeLinks: [],
  nodeProperties: [],
  brain: undefined,
  graph: undefined,
  db: undefined,
  commandHistory: [],
  command: null,
  nodes: [],
  links: []
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
  setNodeLinks(state, l){
    console.log(l)
    state.nodeLinks = l
  },
  setNodeProperties(state, p){
    console.log(p)
    state.nodeProperties = p
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
  }
  // addNode(state, n){
  //
  //   //let {nodes, links} = state.graph.graphData()
  //   //nodes.push(n)
  //   //state.graph.graphData({ nodes: nodes, links: links })
  // }
}

const actions = {
  async pushCommandHistory(context, c){
    context.commit('setCommand', c)
    context.commit('pushHistory',c)
    if(c.type == "triplet"){
      let triplet = c.value
    //  console.log(triplet, c.selected)
      let s = triplet.subject
      let p = triplet.predicate
      let o = triplet.object

    //  console.log(s,p,o)

    //  console.log(context.state.nodes)

      let subjectNode = context.state.nodes.find(x => x.name == s)
      let objectNode = context.state.nodes.find(x => x.name == o)

    //  console.log(subjectNode, objectNode)
      if(subjectNode == undefined){
        subjectNode = Vue.prototype.$newNode({name: s})
      }

      if(objectNode == undefined){
        objectNode = Vue.prototype.$newNode({name: o})
      }

    //  console.log(subjectNode, objectNode)

      let nodes2save  = Vue.prototype.$addProp({subject: subjectNode, predicate:p, object:objectNode})
      console.log(nodes2save)
      nodes2save.forEach(n => {
        context.dispatch('saveNode', n)
      });

      // subjectNode[p] = {id: objectNode.id, name: objectNode.name}
      // objectNode.reverse == undefined ? objectNode.reverse = {} : ""
      // objectNode.reverse[p] = {id: subjectNode, name: subjectNode.name}

    //  console.log(subjectNode, objectNode)


      // var index = context.state.nodes.findIndex(x => x.name == s);
      // // console.log(n.id, index)
      // index === -1 ? context.state.nodes.push(n) : Object.assign(context.state.nodes[index], n)
      // // let subjectNode =





    }



  },
  async newNode(context){
    // let node = { id: uuidv4(), name: "", type: "neurone", color: "#00ff00"}
    let node = {
      "@context": {
        "name": "http://xmlns.com/foaf/0.1/name",
        "knows": "http://xmlns.com/foaf/0.1/knows",
        "id": "@id",
        "type": "@type",
        "homepage": {
          "@id": "http://xmlns.com/foaf/0.1/homepage",
          "@type": "@id"
        }
      },
      "id": "http://local/"+uuidv4(),
      "name": "Manu Sporny",
      type: "neurone",
      color: "#00ff00",
      "homepage": "http://manu.sporny.org/",
      // "knows": [{
      //   "name": "Daniele"
      // }, {
      //   "name": "Lucio"
      // }],
      "knows": [{
        "id": "_:7053c150-5fea-11e3-a62e-adadc4e3df76",
        "name": "Boby"
      }, {
        "id": "_:9d2bb59d-3baf-42ff-ba5d-9f8eab34ada4",
        "name": "John"
      }]
    };
    context.commit('setCurrentNode', node)
    // console.log("onBackgroundClick", event)
  },
  async saveNode(context, node){
    console.log(node)
    // delete node.__ob__
    // delete node.__threeObj
    try{
      await idb.saveNode(node);
      await context.dispatch('getNodes') // pose problème de rafraichissement, certainement car on a enlevé __ob & __threeObj
    }catch(e){
      alert(e)
    }
  },
  async getNodes(context) {
    // context.state.nodes = [];
    let nodes = await idb.getNodes();
    console.log("nodes in db", nodes)
    nodes.forEach(n => {
      n.type == undefined ? n.type = "neurone" : ""
      // context.state.nodes.push(n);
      var index = context.state.nodes.findIndex(x => x.id==n.id);
      console.log(n.id, index)
      index === -1 ? context.state.nodes.push(n) : Object.assign(context.state.nodes[index], n)
    });

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
