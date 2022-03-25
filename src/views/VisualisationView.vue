<template>
  <div>
    <b-button @click="saveBrain">save brain</b-button>
    <div id="graph" ref="graph">Loading graph...
    </div>
  </div>
</template>

<script>

export default {
  name: "VisualisationView",
  data(){
    return {
      // graph: null
    }
  },
  mounted(){
    this.$graphInit({domElement: this.$refs.graph})
  },
  methods:{
    saveBrain(){
      this.$store.dispatch('core/saveBrain')
    },
    update(){
      console.log(/*this.graph,*/ this.nodes)

      if (this.graph != undefined){
        let nodes = this.nodes.map(a => {return {...a}})
        let links = this.links.map(a => {return {...a}})
        this.graph.graphData({nodes: nodes, links: links})
        console.log(this.nodes)
      }

    }
  },
  watch:{
    nodes(){
      console.log(this.nodes)
      this.update()
    },
    links(){
      console.log(this.links)
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
</style>
