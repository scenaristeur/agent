// import Vue from 'vue'

// import { v4 as uuidv4 } from 'uuid';
let gunRoot = 'biptest4'

import GUN from 'gun/gun'


const plugin = {
  async install(Vue, opts = {}) {
    let store = opts.store
    // const IPFS = window.IpfsCore;
    // const ipfs = await IPFS.create()
    // let id = await ipfs.id()
    // console.log(ipfs,id )
    // store.commit('core/setIpfsNode',id)



    Vue.prototype.$saveBrainToGun = async function(){
      let gun = Vue.prototype.$gun

      // gun.get(gunRoot).map().on((node, key) => {
      //   console.log("node",node, key)
      //   // add results straight to the Vue component state
      //   // and get updates when nodes are updated by GUN
      //   //this.todos[key] = node;
      //   //  console.log(this.todos)
      // });
      //  console.log("IPFS",ipfs,store.state.core.nodes)
      let nodes = store.state.core.nodes
      console.log(nodes, gun)


      // let mark = {
      //   age: 23,
      //   hacker: true,
      //   name: "Mark Nadal"
      // }
      store.state.core.nodes.forEach((n) => {
        let result =  gun.get(gunRoot).set(n)
        console.log(result)

      })

      let retrieve = gun.get(gunRoot)
      console.log("retrieve",retrieve)
      // retrieve.toJSON().once(function(value, key){
      //   console.log("What is the name?", value, key);
      // })
      // retrieve.get('name').once(function(value, key){
      //   console.log("What is the name?", value, key);
      // })


      // store.state.core.nodes.forEach((n) => {
      //   let saved = gun.get('pin').set(n)
      //   console.log("saved", saved)
      // });
      //
      //
      //

      //  let links = store.state.core.links
      //  let graph = nodes.concat(links)
      // const graph_cid = await ipfs.add(JSON.stringify(nodes))
      //
      // console.log(graph_cid)
      // store.commit('core/setGraphCid', graph_cid)

    }




    Vue.prototype.$loadAllFromGun1 = async function(){
      let gun = Vue.prototype.$gun

      gun.get(gunRoot).map().on(async (node, key) => {
        console.log("node",node, key)
        //  await rebuild(node, key)
        // await store.dispatch('core/saveNode', node)
        for (const [key, value] of Object.entries(node)) {
          //  console.log(key, value);
          if(typeof value == "object"){
            node =  await follow(gun, node, key, value)
          }
        }
        // add results straight to the Vue component state
        // and get updates when nodes are updated by GUN
        //this.todos[key] = node;
        //  console.log(this.todos)
        console.log("done", node)
        await store.dispatch('core/saveNode', node)
      });


      await store.dispatch('core/getNodes')

    }

    Vue.prototype.$loadAllFromGun = async function(){
      console.log("inspiration https://github.com/Stefdv/gun-ui-graph/blob/master/gun-ui-graph.html")
      let gun = Vue.prototype.$gun
      //let GUN = window.GUN
      console.log(gun, GUN)
      let gunRoot = gun.get(gunRoot)
      _gunChanged(gunRoot)
    }


  function _gunChanged (gunContext) {
    console.log(gunContext)
    let Gun = GUN
    if(Gun) {
     Gun.chain.valMapEnd = function (cb, end) {
       //var n = function () {},
        var count = 0,
         props = []//,
        // gunChain = function () {};
        // cb = cb || n;
         //end = end || n;

     var gunChain = {}
     gunChain.val = function (list) {
       var args = Array.prototype.slice.call(arguments);
       Gun.node.is(list, function (n, prop) {
         count += 1;
         props.push(prop);
       });
       props.forEach(function (prop) {
         gunChain.path(prop).val(function (val, key) {
           console.log("Val, key",val,key)
           count -= 1;
           cb.apply(this, arguments);
           if (!count) {
             end.apply(this, args);
           }
         });
       });
     };
     return gunChain;
   };
   if(/*this.gunroot && */gunContext instanceof Gun) _startGun()
 } else {
   console.warn('No Gun')
 }
}

    Vue.prototype. _gunChanged1  = async function(gunContext) {
      let Gun = Vue.prototype.$gun
      let gun = Vue.prototype.$gun
      let gunRoot = gun.get(gunRoot)
      if(Gun) {
        Gun.chain.valMapEnd = function (cb, end) {
          var n = function () {},
          count = 0,
          props = [],
          gunChain = this;
          cb = cb || n;
          end = end || n;

          gunChain.val(function (list) {
            var args = Array.prototype.slice.call(arguments);
            Gun.node.is(list, function (n, prop) {
              count += 1;
              props.push(prop);
            });
            props.forEach(function (prop) {
              gunChain.path(prop).val(function (val, key) {
                console.log(val, key)
                count -= 1;
                cb.apply(this, arguments);
                if (!count) {
                  end.apply(this, args);
                }
              });
            });
          });
          return gunChain;
        };
        if(gunRoot && gunContext instanceof Gun) _startGun()
      } else {
        console.warn('No Gun')
      }

    }

    // _lockChanged: function(state) {
    //  if(this.cy._private) {
    //   state ? this.cy.nodes().ungrabify() : this.cy.nodes().grabify()
    //  }
  //}

  function each(node) {
    console.log(node)
    //self._processGunNode(node)
  }
  function ended(collection) {
    console.log('Done mapping over:', collection);
    //self._initCy()


    _mapNodes()
  }

  function _startGun (){
    let Gun = GUN
    let gun = Vue.prototype.$gun
    let gunRoot = gun.get(gunRoot)
    console.log('_startGun');
    if(gunRoot && gun instanceof Gun) {
      // first build gun._.graph
      console.log('build gun._.graph')
      //var self = this

      gun.get(gunRoot).valMapEnd(each,ended)
      //this.gun.get(this.gunroot).map(each)
      //this.
      _mapNodes()

    }
  }

  function _mapNodes() {
    let Gun = GUN
    let gun = Vue.prototype.$gun
    let gunRoot = gun.get(gunRoot)
    console.log('_mapNodes')
    Gun.obj.map(gun._.graph,function(g_node){
      console.log("g_node",g_node)
      if(g_node._ && g_node._['#'] !== gunRoot) {
        _processGunNode(g_node)
        //console.log(g_node)
      }
    }.bind(this));
    this.async(function(){
      //this._initCy()
      console.log("initCY")
    })


  }

  function _createLabel (node) {
    var label =''
    if(this.useAsLabel) {
      this.useAsLabel.split(',').forEach(function(segment){
        if(typeof node[segment]=='string') {
          label+=node[segment] +'\n'
        }
      })
    } else { label = node._['#'] }
    return label
  }


  function _processGunNode (g_node) {
    var soul = g_node._['#'];
    var self = this;
    var gun = this.gun
    // only process nodes that we want to see
    //
    this._isAset(soul, function(isSet) {
      if(!isSet) {
        console.log('-----------------\nProcess gun node("%s")',g_node._['#'])
        // create initial cy_node
        var node = {
          id:g_node._['#'],
          raw:g_node,
          label:_createLabel(g_node)
        };

        var g_field //,field,raw;
        // exemanine each field to determine the g_nodes structure
        for(g_field in g_node) {

          if(g_field !=='_' && g_field !== 'tags') { // skip meta and guntagger tags
            if(typeof g_node[g_field] === 'object') {
              // we have a reference to something
              // but is it to a set or to a 'real' node?
              self._isAset(g_node[g_field]['#'],function(fieldIsSet){
                if(fieldIsSet) {
                  // it's a ref to a set
                  gun.get(g_node[g_field]['#']).val(function(refs){
                    delete refs._
                    for(let ref in refs) {
                      _pushEdge(soul ,ref,g_field)
                    }
                  })
                }  else {
                  // its to a 'real' node
                  _pushEdge(node.id,g_node[g_field]['#'],g_field)
                }
              }); // end _isAset(g_node[g_field]['#'])
            }// end is 'object'
          } // end !== _
        } // end for in
        _pushNode(node)
      }// end if(!isSet)
    }); // end isAset(soul)

  }



  function _pushNode (node) {

    var nodeData = {
      id: node.id,
      label:node.label || node.id,
      backgroundColor:'#E0E4E8'
    }

    if(this.cssLabels) {
      var labels = this.cssLabels.split(',')
      for(const csslabel in labels) {
        nodeData[labels[csslabel]] = node.raw[labels[csslabel]]
      }
    }
    if(node.raw[this.useAsCompound]) {
      nodeData.parent  = node.raw[this.useAsCompound]
    }
    this.nodes.push({
      group: 'nodes',
      data: nodeData,
      selectable: true,
      locked: false,
      grabbable: true
    })
  }

  function _pushEdge(source,target,label) {
    //console.log('%cinit edge(%s) from %s to %s',"color:brown",label,source,target)
    this.edges.push({
      data:{
        id: source + '+' + target,
        source:source,
        target:target,
        label:label
      }
    })
  }















  async function follow(gun, node, key, value, cpt = 0){
    //  console.log("follow")
    console.log(key, value, cpt)
    if (value['#'] != undefined){
      gun.get(value['#']).on(async (subnode, subkey) => {

        if(typeof subnode == "string"){
          node[subkey] = subnode
        }else{
          console.log("SUB",subnode, subkey)
          await follow(gun, node[key], subkey, subnode, cpt++)
        }
      })


    }


    return node

  }


  // async function rebuild(n){
  //   let gun = Vue.prototype.$gun
  //   let node = {}
  //   let rest = {more: []}
  //   for (const [key, value] of Object.entries(n)) {
  //   //  console.log(key, value);
  //     switch (typeof value) {
  //       case "string":
  //       //  console.log("string ", value)
  //       node[key] = value
  //       break;
  //       case "object":
  //       //  console.log("object ", value)
  //       if (value['#'] != undefined){
  //         await gun.get(value['#']).once(async function(v, k){
  //         //  console.log("value of the object", v, k);
  //         //  node[key] = v
  //         rest.more[k] = v
  //         })
  //       }else{
  //         console.log("# undefined in", value)
  //       }
  //       break;
  //       default:
  //       console.log("todo  ", typeof value, value)
  //     }
  //   }
  //   //node.more = more
  //   console.log("rebuilded", node)
  //  await store.dispatch('core/saveNode', node)
  //  rest.id = node.id
  //  console.log("rest", rest)
  //
  //
  // }

  Vue.prototype.$loadBrainFromGun = async function(id){
    console.log(id)


    // let chunks = []
    //
    // for await (const chunk of ipfs.cat(cid)) {
    //   chunks.push(chunk);
    // }
    //
    // const data = concat(chunks)
    // const decodedData = JSON.parse(new TextDecoder().decode(data).toString());
    // console.log("decoded",decodedData)
    // for await (const node of decodedData) {
    //   await store.dispatch('core/saveNode', node)
    // }
    // console.log('1')
    // await store.dispatch('core/getNodes')
    // console.log('2')
    //alert("comming soon",JSON.stringify(decodedData))

  }


  // Vue.prototype.$saveNodesToIpfs = async function(){
  //
  //   console.log("IPFS",ipfs,store.state.core.nodes)
  //   store.commit('core/resetIpfsCid')
  //
  //
  //   store.state.core.nodes.forEach(async function(node) {
  //
  //     console.log(node)
  //     const cid = await ipfs.add(JSON.stringify(node))
  //     console.log(cid, node)
  //     let c = {cid: cid.path, name: node.name, id: node.id}
  //     store.commit('core/addIpfsCid', c)
  //     let chunks = []
  //
  //     for await (const chunk of ipfs.cat(cid.path)) {
  //       chunks.push(chunk);
  //     }
  //
  //     const data = concat(chunks)
  //     const decodedData = JSON.parse(new TextDecoder().decode(data).toString());
  //     console.log(decodedData)
  //     // const cid = await ipfs.object.new(node)
  //     // console.log(cid)
  //   });
  //
  //
  //
  //   // we loop over the results because 'add' supports multiple
  //   // additions, but we only added one entry here so we only see
  //   // one log line in the output
  //   // for await (const { cid } of results) {
  //   //   // CID (Content IDentifier) uniquely addresses the data
  //   //   // and can be used to get it again.
  //   //   console.log(cid.toString())
  //   // }
  //
  //   // const { cid } = await ipfs.add('Hello world')
  //   // console.info(cid)
  //
  //
  //
  //
  // }


}
}

// Auto-install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
