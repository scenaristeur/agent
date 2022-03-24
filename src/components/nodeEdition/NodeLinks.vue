<template>
  <div>

    <div v-for="(p) in Object.keys(currentNode)" :key="p">
      <!-- <hr> -->
      <div v-if="jsonldProps.includes(p)">
        <!-- jsonldProp : {{p}}<br> -->
        <!-- value {{currentNode[p]}}<br> -->
      </div>
      <div v-else-if="graphProps.includes(p)">
        <!-- graphProp : {{p}} -->
      </div>
      <div v-else>

       <b> {{p}}</b> ({{ typeof currentNode[p]}}) :
        {{currentNode[p]}} <b-button @click="addValue(p)" variant="outline-primary" size="sm">+</b-button>
      </div>

    </div>




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
      selected: null,
      graphProps: ['__threeObj', 'index', 'x', 'y', 'z', 'vx', 'vy', 'vz'],
      jsonldProps: ['@context', 'id']
    }
  },
  methods:{
    addValue(p){
      console.log("addValue",p)
      console.log(this.currentNode[p], typeof this.currentNode[p])
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
    currentNode() {
      return this.$store.state.core.currentNode
    },
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
