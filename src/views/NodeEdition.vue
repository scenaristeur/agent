<template>
  <div>
    <b-container v-if="tempNode != null">
      Node edition
      <b-row>
        <b-col cols="10">
          <b-form-input v-model="tempNode.name" placeholder="name" autofocus></b-form-input>
        </b-col>
        <b-col cols="2">

          <b-form-input type="color" v-model="tempNode.color" size="sm"></b-form-input>
        </b-col>
      </b-row>

      <NodeLinks v-model="tempNode.links"/>
      <NodeProperties v-model="tempNode.properties"/>

      <b-button @click="tempNode = null">Cancel</b-button>
      <b-button @click="save" variant="primary">Save</b-button>
      <hr>

      {{ tempNode }}
    </b-container>
  </div>
</template>

<script>

export default {
  name: "NodeEdition",
  components: {
    'NodeLinks': ()=>import('@/components/nodeEdition/NodeLinks'),
    'NodeProperties': ()=>import('@/components/nodeEdition/NodeProperties'),
  },
  data(){
    return {
      tempNode: null
    }
  },
  created(){

  },
  methods:{
    save(){
      console.log(this.tempNode)
      this.$store.dispatch('core/saveNode', this.tempNode)
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
    }
  },


}
</script>

<style scoped>

</style>
