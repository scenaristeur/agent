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
      if (this.graph != undefined){
        this.graph.graphData({nodes: this.nodes, links: []})
      }

    }
  },
  watch:{
    nodes(){
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
    graph() {
      return this.$store.state.core.graph
    }
  },

}
</script>

<style>

</style>
