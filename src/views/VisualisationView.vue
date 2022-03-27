<template>
  <div>
    <!-- <b-button @click="saveBrain">save brain</b-button> -->
    <b-button @click="saveBrainToSolid">Save brain to Solid</b-button>
    <b-button @click="loadBrainFromSolid">Load brain from Solid</b-button>
    <b-button @click="clear">Clear</b-button>
    <SolidLogin />
    
    <div id="graph" ref="graph">Loading graph...
    </div>
  </div>
</template>

<script>

export default {
  name: "VisualisationView",
  components: {
    'SolidLogin': ()=>import('@/components/SolidLogin'),
  },
  data(){
    return {
      // graph: null
    }
  },
  mounted(){
    this.$graphInit({domElement: this.$refs.graph})
    this.$checkSolidSession()
  },
  methods:{
    saveBrain(){
      this.$store.dispatch('core/saveBrain')
    },
    saveBrainToSolid(){
      this.$saveBrainToSolid()
    },
    loadBrainFromSolid(){
      this.$loadBrainFromSolid()
    },
    clear(){
      if (confirm('Are you sure you want to remove all nodes?')) {
        this.$store.dispatch('core/removeAllNodes')
        this.$store.commit('core/setCurrentNode', null)
      }
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
