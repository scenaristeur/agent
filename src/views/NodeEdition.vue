<template>
  <div>
    <b-container v-if="tempNode != null">
      <b-button v-b-toggle.collapse-1 variant="primary">{{tempNode.name || tempNode.id}}</b-button>
      <b-collapse id="collapse-1" class="mt-2">


        Node edition
        <b-row>
          <b-col cols="10">
            <b-form-input v-model="tempNode.name" placeholder="name"></b-form-input>
          </b-col>
          <b-col cols="2">

            <b-form-input type="color" v-model="tempNode.color" size="sm"></b-form-input>
          </b-col>
        </b-row>
        <b-form-input v-model="tempNode.type" placeholder="type"></b-form-input>
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
        <!--
        <NodeLinks v-model="tempNode.links"/>
        <NodeProperties v-model="tempNode.properties"/> -->

        <b-button @click="tempNode = null">Cancel</b-button>
        <b-button @click="save" variant="primary">Save</b-button>
        <hr>
      </b-collapse>
      <!-- {{ tempNode }} -->
    </b-container>
  </div>
</template>

<script>

export default {
  name: "NodeEdition",

  data(){
    return {
      tempNode: null,
      graphProps: ['__threeObj', 'index', 'x', 'y', 'z', 'vx', 'vy', 'vz'],
      jsonldProps: ['@context', 'id']
    }
  },
  created(){

  },
  methods:{
    async save(){
      console.log(this.tempNode)
      await this.$store.dispatch('core/saveNode', this.tempNode)
      this.$store.commit('core/setCurrentNode', null)
    }

  },
  watch:{
    currentNode(){
      this.tempNode = this.currentNode
      let tempProps = this.tempNode != null ? this.tempNode.properties : []
      let tempLinks = this.tempNode != null ? this.tempNode.links : []
      this.$store.commit('core/setNodeProperties', tempProps)
      this.$store.commit('core/setNodeLinks', tempLinks)
    }
  },
  computed: {
    currentNode() {
      return this.$store.state.core.currentNode
    },
    graph() {
      return this.$store.state.core.graph
    },
    nodeLinks() {
      return this.$store.state.core.nodeLinks
    },
  },


}
</script>

<style scoped>

</style>
