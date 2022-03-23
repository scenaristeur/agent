<template>
  <div id="graph" ref="graph">Loading graph...
  </div>
</template>

<script>

export default {
  name: "VisualisationView",
  data(){
    return {
      graph: null
    }
  },
  mounted(){
    this.graph = this.$graphInit({domElement: this.$refs.graph})
  }

}
</script>

<style>

</style>
