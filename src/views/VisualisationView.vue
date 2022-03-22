<template>
  <div id="graph" ref="graph">Loading graph...
  </div>
</template>

<script>
import ForceGraph3D from '3d-force-graph';
export default {
  name: "VisualisationView",
  data(){
    return {
      Graph: null
    }
  },
  mounted(){

    const N = 300;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        source: id,
        target: Math.round(Math.random() * (id-1))
      }))
    };

    let graphDiv = this.$refs.graph
    this.Graph = ForceGraph3D()(graphDiv).graphData(gData);
  }

}
</script>

<style>

</style>
