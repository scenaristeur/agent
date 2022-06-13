<template>
<div id="graph" width="100px" ref="graph">Loading graph...</div>
</template>

<script>
export default {
  name: "GraphView",
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
      return this.$store.state.graph3D.nodes
    },
    links() {
      return this.$store.state.graph3D.links
    },
    graph() {
      return this.$store.state.graph3D.graph
    }
  },
}
</script>

<style scoped>
.node-label {
  font-size: 12px;
  padding: 1px 4px;
  border-radius: 4px;
  background-color: rgba(0,0,0,0.5);
  user-select: none;
}
</style>
