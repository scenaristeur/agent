let worlds = [
  {
    name: "gundb",
    onCreated: {action: "gunListen", params: "boop"},
    onMounted: {action: "gunListen", params: "blop"}, // brains
    installed : null,
    version: null,
    state: null,
    active: true
  },
  {name: "browser"},
  {name: "graph3d"},
  {name: 'indexeddb'},
  {name: "Solid Public"},
  {name: "Solid Pod"},
  {name: "Solid Friends"},
  {name: "Solid Notification"},
  {name: "Wikidata"},
  {name: "realtime"},
  {name: "automerge"},
  {name: "ipfs"},
  {name: "pinata"},
  {name: "safe"},
  {name: "deepweb"},
  {name: "excel/ods"},
  {name: "notion"},
  {name: "upload"},
  {name: "url_param"},
  {name: "Persée"},
  {name: "sparqlanything"},
  {name: "semapps"},
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
