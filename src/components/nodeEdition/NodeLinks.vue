<template>
  <div>
    Links
    {{ nodeLinks }}
    <hr>

    <b-form-select
    v-model="selected"
    value-field="id"
    text-field="name"
    :options="graphData.nodes"
    ></b-form-select>

    <!-- {{graphData.nodes}} -->


  </div>
</template>

<script>
export default {
  name: "NodeLinks",
  data(){
    return {
      selected: null
    }
  },
  watch:{
    selected(){
      console.log("selected",this.selected)
    },
    graphData(){
      console.log("GRAPHDATA", this.graphData)
    }
  },
  computed: {
    // currentNode() {
    //   return this.$store.state.core.currentNode
    // },
    nodeLinks() {
      return this.$store.state.core.nodeLinks
    },
    graphData() {
      return this.$store.state.core.graph.graphData()
    }
  },
}
</script>

<style scoped>

</style>
