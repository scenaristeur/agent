<template>
  <div>
    <b-container v-if="tempNode != null">
      Node edition
      <b-row>
        <b-col cols="10">
          <b-form-input v-model="tempNode.name" placeholder="name"></b-form-input>
        </b-col>
        <b-col cols="2">

          <b-form-input type="color" v-model="tempNode.color" size="sm"></b-form-input>
        </b-col>
      </b-row>


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
      this.$store.commit('core/addNode', this.tempNode)
      this.$store.commit('core/setCurrentNode', null)
    }

  },
  watch:{
    currentNode(){
      this.tempNode = this.currentNode
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
