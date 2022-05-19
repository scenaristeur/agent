<template>
    <div id="graph" ref="graph">Loading graph...</div>
</template>
<script>
export default {
  name: "VisualisationView",
  mounted(){
    this.$graphInit({domElement: this.$refs.graph})
  },
  methods:{
    update(){
      if (this.graph != undefined){
        let nodes = this.nodes.map(a => {return {...a}})
        let links = this.links.map(a => {return {...a}})
        this.graph.graphData({nodes: nodes, links: links})
        console.log(this.graph.graphData())
      }
    }
  },
  watch:{
    nodes(){
      this.update()
    },
    links(){
      this.update()
    },
    graph(){
      this.update()
    }
  },
  computed: {
    nodes() {
      return this.$store.state.core.nodes
    },
    links() {
      return this.$store.state.core.links
    },
    graph() {
      return this.$store.state.core.graph
    }
  },
}
</script>

<style>
.node-label {
  font-size: 12px;
  padding: 1px 4px;
  border-radius: 4px;
  background-color: rgba(0,0,0,0.5);
  user-select: none;
}
/* helix */
a {
  color: #8ff;
}



.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
  border: 1px solid rgba(127,255,255,0.25);
  font-family: Helvetica, sans-serif;
  text-align: center;
  line-height: normal;
  cursor: default;
}

.element:hover {
  box-shadow: 0px 0px 12px rgba(0,255,255,0.75);
  border: 1px solid rgba(127,255,255,0.75);
}

  .element .number {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: rgba(127,255,255,0.75);
  }

  .element .symbol {
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    font-size: 60px;
    font-weight: bold;
    color: rgba(255,255,255,0.75);
    text-shadow: 0 0 10px rgba(0,255,255,0.95);
  }

  .element .details {
    position: absolute;
    bottom: 15px;
    left: 0px;
    right: 0px;
    font-size: 12px;
    color: rgba(127,255,255,0.75);
  }


</style>
