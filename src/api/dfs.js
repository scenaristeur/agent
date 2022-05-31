// from https://github.com/Dletta/visualGraph/blob/master/visualGraph.js
/* Depth First Search - explore all of the nodes from the given Soul
* then update D3 data and the force-layout from the html
*/
import Gun from 'gun'
var stack;
var nodes;
var edges;
var start;
var u;
var label;
var opt = false;
var stop = false;
var limit = 500;
var gun = undefined
let mod = undefined

var util = {}

  util.printMap = function (map) {
    var array = Array.from(map);
    var i =0;
    var l = array.length;
    for(;i<l;i++){
      console.log(array[i][1])
    }
  }

  util.printArr = function (array){
    var i =0;
    var l = array.length;
    for(;i<l;i++){
      console.log(array[i])
    }
  };

  util.makeNodes = function (map){
    var array = Array.from(map);
    var nodes = [];
    var i =0;
    var l = array.length;
    for(;i<l;i++){
      nodes.push(array[i][1])
    }
    return nodes;
  };

  util.makeEdges = function (map) {
    var array = Array.from(map);
    var edges = [];
    var i =0;
    var l = array.length;
    for(;i<l;i++){
      edges.push(array[i][1])
    }
    return edges;
  };

export { Dfs }

class Dfs {
  constructor(_gun) {
    gun = _gun
    console.log(gun)
    mod = this
  }
  search(soul, lbl, lim){
    console.log('Starting with:',soul);
    if(lbl){opt = true;} else { opt = false;}
    if(lim){limit = lim}
    console.log(limit);
    label = lbl;
    start = soul;
    stack = [];
    nodes = new Map();
    edges = new Map();
    gun.get(soul).once(mod.node)
  }

  node(node, key) {
    //console.log('called', nodes.size);
    if(!node){console.error('no data:',key, node); mod.back();return;}
    var soul = Gun.node.soul(node);
    if(soul == start){
      stack.push(soul);
    }
    u = node;
    if(!opt || node[label] == undefined){
      nodes.set(soul, {id:soul,label:key})
    } else {
      nodes.set(soul, {id:soul,label:node[label]})
    }
    console.log(this)
    console.log(u, edges)
    mod.edge(u, edges);
  }


    edge(node, edges) {
      if(stop){console.log('stopped');return;}
      var temp;
      var soul = Gun.node.soul(node);
      var tLabel = 'none';
      var arr = Object.keys(node);
      for(var item of arr){
        //save label if the prop meets the label
        if(item == label) { tLabel = node[item] }
        //console.log(tLabel);
        // if it's an object, then there is more
        if(typeof node[item] == 'object'){
          //skip nulled items or metadata
          if(node[item] == null || item == "_"){continue}
          if(!edges.has(soul+node[item]['#'])){
           temp = node[item];

            break;
          }
        }
      }
      if(temp){
        mod.next(temp, soul,temp['#'], tLabel);
      } else {
        if(start == soul) {stack.pop()}
        mod.back();
      }
    }

    next(next, edgeS, edgeT, tLabel) {
      console.log(tLabel)
      var v = next;
      var soul = v['#'];
      nodes.set(soul, {id:soul,label:v['#']})
      edges.set(edgeS+edgeT, {source:edgeS,target:edgeT})
      stack.push(soul)
      u = v;
      if(nodes.size >= limit){console.info('Reached limit');mod.render();return;}
      gun.get(soul).once(mod.node)
    }

  back() {
    if(!(stack.length == 0)){
      var soul = stack.pop();
      gun.get(soul).once(mod.node)
    } else {
      mod.render();
    }
  }

    render() {
      //console.log('Rendering');
      let graph = {}
      graph.nodes = util.makeNodes(nodes);
      graph.edges = util.makeEdges(edges);
      console.log("graph", graph)
      //update();
    }


}



// var DFS = (function(){
//   var stack;
//   var nodes;
//   var edges;
//   var start;
//   var u;
//   var label;
//   var opt = false;
//   var stop = false;
//   var limit = 500;
//
//   var util = {};
//
//   util.printMap = function (map) {
//     var array = Array.from(map);
//     var i =0;
//     var l = array.length;
//     for(;i<l;i++){
//       console.log(array[i][1])
//     }
//   }
//
//   util.printArr = function (array){
//     var i =0;
//     var l = array.length;
//     for(;i<l;i++){
//       console.log(array[i])
//     }
//   };
//
//   util.makeNodes = function (map){
//     var array = Array.from(map);
//     var nodes = [];
//     var i =0;
//     var l = array.length;
//     for(;i<l;i++){
//       nodes.push(array[i][1])
//     }
//     return nodes;
//   };
//
//   util.makeEdges = function (map) {
//     var array = Array.from(map);
//     var edges = [];
//     var i =0;
//     var l = array.length;
//     for(;i<l;i++){
//       edges.push(array[i][1])
//     }
//     return edges;
//   };
//
//   var dfs = {};
//
//   dfs.search = function(soul, lbl, lim){
//     console.log('Starting with:',soul);
//     if(lbl){opt = true;} else { opt = false;}
//     if(lim){limit = lim}
//     console.log(limit);
//     label = lbl;
//     start = soul;
//     stack = [];
//     nodes = new Map();
//     edges = new Map();
//     gun.get(soul).once(dfs.node)
//   };
//
//   dfs.node = function(node, key) {
//     //console.log('called', nodes.size);
//     if(!node){console.error('no data:',key, node); dfs.back();return;}
//     var soul = Gun.node.soul(node);
//     if(soul == start){
//       stack.push(soul);
//     }
//     u = node;
//     if(!opt || node[label] == undefined){
//       nodes.set(soul, {id:soul,label:key})
//     } else {
//       nodes.set(soul, {id:soul,label:node[label]})
//     }
//     dfs.edge(u, edges);
//   };
//
//   dfs.edge = function (node, edges) {
//     if(stop){console.log('stopped');return;}
//     var temp;
//     var soul = Gun.node.soul(node);
//     var tLabel = 'none';
//     var arr = Object.keys(node);
//     for(var item of arr){
//       //save label if the prop meets the label
//       if(item == label) { tLabel = node[item] }
//       //console.log(tLabel);
//       // if it's an object, then there is more
//       if(typeof node[item] == 'object'){
//         //skip nulled items or metadata
//         if(node[item] == null || item == "_"){continue}
//         if(!edges.has(soul+node[item]['#'])){
//          temp = node[item];
//
//           break;
//         }
//       }
//     }
//     if(temp){
//       dfs.next(temp, soul,temp['#'], tLabel);
//     } else {
//       if(start == soul) {stack.pop()}
//       dfs.back();
//     }
//   };
//
//   dfs.next = function (next, edgeS, edgeT, tLabel) {
//     console.log(tLabel)
//     var v = next;
//     var soul = v['#'];
//     nodes.set(soul, {id:soul,label:v['#']})
//     edges.set(edgeS+edgeT, {source:edgeS,target:edgeT})
//     stack.push(soul)
//     u = v;
//     if(nodes.size >= limit){console.info('Reached limit');dfs.render();return;}
//     gun.get(soul).once(dfs.node)
//   };
//
//   dfs.back = function () {
//     if(!(stack.length == 0)){
//       var soul = stack.pop();
//       gun.get(soul).once(dfs.node)
//     } else {
//       dfs.render();
//     }
//   };
//
//   dfs.render = function () {
//     //console.log('Rendering');
//     let graph = {}
//     graph.nodes = util.makeNodes(nodes);
//     graph.edges = util.makeEdges(edges);
//     console.log("graph", graph)
//     update();
//   };
//
//   return dfs;
// }) (Gun, gun, graph, update);
