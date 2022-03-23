//https://github.com/vasturiano/3d-force-graph
// import ForceGraph3D from '3d-force-graph';
// import SpriteText from 'three-spritetext';
// import * as THREE from "three";

//import { v4 as uuidv4 } from 'uuid';
import { Base } from "./base.js"

export { Graph }

class Graph extends Base {
  constructor(options = {}) {
    super(options)
    options['type'] == undefined ? this['type'] = "graph": ""
    // Object.assign(this, modele);
    // this.options = options

    // this._data = Object.assign({}, modele)

    //console.log(this)
    // ...
  }
}
