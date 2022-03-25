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
    state.c = c
  },
  setCurrentNode(state, n){
    state.currentNode = n
  },
  setBrain(state, b){
    state.brain = b
  },
  setGraph(state, g){
    state.graph = g
  },
  setDb(state, db){
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
      subjectNode == undefined ? subjectNode = Vue.prototype.$newNode({name: c.value.subject}) : ""
      if (c.value.predicate.startsWith('.'))
      {
        let p = c.value.predicate.slice(1)
        console.log("add prop", p)
        let n = Vue.prototype.$addProp({node: subjectNode, propertie: p, value: c.value.object})
        console.log(n)
        await context.dispatch('saveNode', n)

        await context.dispatch('getNodes')



      }
      else
      {
        let objectNode = context.state.nodes.find(x => x.name == c.value.object)

        objectNode == undefined ? objectNode = Vue.prototype.$newNode({name: c.value.object}) : ""
        let nodes2save  = Vue.prototype.$addLink({subject: subjectNode, predicate:c.value.predicate, object:objectNode})
        nodes2save.forEach(async function(n) {
          await context.dispatch('saveNode', n)
        });
        await context.dispatch('getNodes') // pose problème de rafraichissement, certainement car on a enlevé __ob & __threeObj
      }
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
  async removeNode(context,n){
    console.log("removing", n)
    if (n.reverse){
      console.log("must update", n.reverse)
      for (const [key, value] of Object.entries(n.reverse)) {
        console.log(key, ":", value);
        if(Array.isArray(value)){
          for(const item of value ){
            console.log(item)
            let node = context.state.nodes.find(x => x.id == item.id)
          //  console.log(node)
            console.log("----A", key,  node[key])
            node[key] = node[key].filter(function(candidate) {
              return candidate.id != n.id;
            });
            console.log("====A",key,  node[key])
            console.log(node)
          }
        }else{
          console.log("todo remove object", value.id , "from",)
          let node = context.state.nodes.find(x => x.id == value.id)
        //  console.log(node)
          console.log("----O", key,  node[key])
          node[key] = node[key].filter(function(candidate) {
            return candidate.id != n.id;
          });
          console.log("====O",key,  node[key])
          console.log(node)
        }




      }




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

  },
  switchTo(context, id){
    let n = context.state.nodes.find(n=> n.id == id)
    context.commit('setCurrentNode', n)
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
