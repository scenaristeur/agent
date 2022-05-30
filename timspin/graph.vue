<template>
  <div>
    <div id="3d-graph"></div>
    <div id="menu">
      <button @click="toggleTimeNodes">Test Spiral</button>
      <button @click="addNode">Add node</button>
    </div>
  </div>
</template>

<script>
import ForceGraph3D from '3d-force-graph';
import { Object3D, Vector3, Mesh } from 'three';
import {
  CSS3DRenderer,
  CSS3DObject,
} from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { v4 as uuidv4 } from 'uuid';

const steps = [
  { name: '10 secondes', facteur: 10 },
  { name: '30 secondes', facteur: 30 },
  { name: '1 minute', facteur: 60 },
  { name: '5 minutes', facteur: 300 },
  { name: '10 minutes', facteur: 600 },
  { name: '15 minutes', facteur: 900 },
  { name: '30 minutes', facteur: 1800 },
  { name: '1 heure', facteur: 3600 },
  { name: '4 heures', facteur: 14400 },
  { name: '8 heures', facteur: 28800 },
  { name: '12 heures', facteur: 43200 },
  { name: '24 heures', facteur: 86400 },
  { name: '3 jours', facteur: 259200 },
  { name: '5 jours', facteur: 432000 },
  { name: '1 semaine', facteur: 604800 },
  { name: '2 semaines', facteur: 1209600 },
  { name: '28 jours', facteur: 2419200 },
  { name: '1 trimestre (28j*3)', facteur: 7257600 },
  { name: '1 semestre(365j/2)', facteur: 15768000 },
  { name: '1 an', facteur: 31536000 },
  { name: '5 ans', facteur: 157680000 },
  { name: '10 ans', facteur: 315360000 },
  { name: '15 ans', facteur: 473040000 },
  { name: '25 ans', facteur: 788400000 },
  { name: '50 ans', facteur: 1576800000 },
  { name: '1 siècle', facteur: 3153600000 },
  { name: '10 siècles', facteur: 31536000000 },
  // {name: "100 siècles", facteur: 315360000000},
  // {name: "1000 siècles", facteur: 3153600000000},
];

export default {
  name: 'Graph',
  data() {
    return {
      counting: false,
      graph: null,
      nodes: [],
      links: [],
      lastZero: null,
    };
  },
  mounted() {
    // const N = 3;
    // const gData = {
    //   nodes: [...Array(N).keys()].map((i) => ({ id: i , name: i})),
    //  links: [...Array(N).keys()]
    //  .filter((id) => id)
    //  .map((id) => ({
    //    source: id,
    //   target: Math.round(Math.random() * (id - 1)),
    //   })),
    // };
    console.log(this.counting);
    clearInterval(this.counting);
    this.counting = false;

    this.graph = ForceGraph3D({ extraRenderers: [new CSS3DRenderer()] })(
      document.getElementById('3d-graph')
    )
    .nodeLabel('name')
    .nodeAutoColorBy('type')
    .onNodeClick((node) => this.onNodeClick(node))
    //.nodeThreeObjectExtend(true)
    .nodeThreeObject((node) => this.nodeThreeObject(node));

    //.graphData(gData);
    //this.initTimeNodes()
  },
  methods: {
    addNode() {
      let N = 5;
      let link = {
        source: this.nodes[0].id,
        target: this.nodes[5].id,
        label: 'ola',
      };
      this.links = [...this.links, link];
      let id = uuidv4();
      let node = { id: id, name: id, x: 0, y: 0, z: 0 };
      this.nodes.push(node);

      //      let zero = this.nodes.find((n) => n.idx == 0);
      //    console.log(zero);
      let link2 = { source: id, target: this.lastZero, label: 'created' };
      this.links.push(link2);
      // console.log(node, link);
      //console.log(this.links)
    },

    onNodeClick(node) {
      console.log('node', node);
    },
    updateTimeNodes() {
      let nodes = [];
      let date = new Date();
      let locale = date.toLocaleString();
      let st = Math.round(date.getTime() / 1000) | 0;
      let ts_node = { id: st, name: locale, type: 'timeNode', idx: 0 };
      this.lastZero = st;
      nodes.push(ts_node);
      steps.forEach(async (step, i) => {
        // console.log(step);
        let idx = i + 1;
        let f = step.facteur;
        let before_id = ts_node.id - f;
        let after_id = ts_node.id + f;
        let beforeNode = {
          id: before_id,
          name: '-' + step.name,
          step: step,
          idx: -idx,
          type: 'timeNode',
        };
        let afterNode = {
          id: after_id,
          name: step.name,
          step: step,
          idx: idx,
          type: 'timeNode',
        };
        nodes.push(beforeNode);
        nodes.push(afterNode);
      });

      let otherNodes = this.nodes.filter((n) => n.type != 'timeNode');
      console.log(otherNodes.length);
      this.nodes = [];
      this.nodes = otherNodes.concat(nodes);

      console.log('nodes:', this.nodes.length);
    },

    toggleTimeNodes() {
      let app = this;
      if (this.counting == false) {
        this.counting = setInterval(() => {
          app.updateTimeNodes();
        }, 1000);
        console.log('start');
      } else {
        // console.log(this.counting);
        clearInterval(this.counting);
        this.counting = false;
        console.log('end');
      }
    },
    updateGraph() {
      console.log('update', this.nodes.length);
      this.graph.graphData({ nodes: this.nodes, links: this.links });
      this.graph.refresh();
    },
    nodeThreeObject(node) {
      if (node.type == 'timeNode') {
        //let timeNodes = this.nodes.filter(n => n.type == "timeNode")
        //let i = node.idx //timeNodes.length-1
        const vectorHelix = new Vector3();
        const element = document.createElement('div');
        element.className = 'element';
        element.style.backgroundColor =
        node.idx == 0
        ? 'rgba(127,0,0,' + (Math.random() * 0.5 + 0.5) + ')'
        : 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.5) + ')';
        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = node.name;
        element.appendChild(number);
        const name = document.createElement('div');
        name.className = 'symbol';
        name.textContent = node.idx;
        element.appendChild(name);
        const details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = new Date(node.id * 1000).toLocaleString();
        element.appendChild(details);
        const thetaHelix = node.idx * 0.175 + Math.PI * 2;
        const y = -(node.idx * 8) + 450;
        const objectCSS = new CSS3DObject(element);
        objectCSS.name = node.name;
        objectCSS.position.setFromCylindricalCoords(900, thetaHelix, y);
        node.fx = objectCSS.position.x;
        node.fy = objectCSS.position.y;
        node.fz = objectCSS.position.z;
        vectorHelix.x = objectCSS.position.x * 2;
        vectorHelix.y = objectCSS.position.y;
        vectorHelix.z = objectCSS.position.z * 2;
        objectCSS.lookAt(vectorHelix);
        element.parent = objectCSS;
        return objectCSS;
      }
    },
  },
  watch: {
    nodes() {
      this.updateGraph();
    },
    links() {
      this.updateGraph();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#menu {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}
button {
  color: rgba(127, 255, 255, 0.75);
  background: transparent;
  outline: 1px solid rgba(127, 255, 255, 0.75);
  border: 0px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: rgba(0, 255, 255, 0.5);
}

button:active {
  color: #000000;
  background-color: rgba(0, 255, 255, 0.75);
}

.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  font-family: Helvetica, sans-serif;
  text-align: center;
  line-height: normal;
  cursor: default;
}

.element:hover {
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
  border: 1px solid rgba(127, 255, 255, 0.75);
}

.element .number {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

.element .symbol {
  position: absolute;
  top: 40px;
  left: 0px;
  right: 0px;
  font-size: 60px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
}

.element .details {
  position: absolute;
  bottom: 15px;
  left: 0px;
  right: 0px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}
</style>
