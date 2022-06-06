let worlds = [
  {
    name: "gundb",
    onCreated: {action: "$gunListen", params: "brains"},
    onMounted: {action: "$gunListen", params: "blop"}, // brains
    installed : null,
    version: null,
    state: null,
    active: false
  },
  {name: "browser"},
  {name: "graph3d"},
  {name: 'indexeddb'},
  {name: "Solid Public"},
  {name: "Solid Pod"},
  {name: "Solid Friends", active: false},
  {name: "Solid Notification"},
  {name: "Wikidata"},
  {name: "realtime"},
  {name: "automerge"},
  {name: "ipfs", onCreated: {action: "$initIpfs"}, active: true},
  {name: "pinata"},
  {name: "safe"},
  {name: "darkweb"},
  {name: "excel/ods"},
  {name: "notion"},
  {name: "upload"},
  {name: "url_param"},
  {name: "Persée"},
  {name: "sparqlanything"},
  {name: "semapps"},
  {name: "websocket"},
  {name: "socket.io"},
  {name: "matrix-crdt"},
  {name: "jmv"}
]


export { Galaxy }

class Galaxy {
  constructor() {

  }
  init(){
    this.worlds = worlds
  }


}
