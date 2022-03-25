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
        <div v-for="p in Object.keys(currentNode)" :key="p">

          <div v-if="!jsonldProps.includes(p) && !graphProps.includes(p) && p != 'reverse'">
            <PropertieView :p="p" :v="currentNode[p]"/>
          </div>
        </div>

        <hr>

        <b-button @click="tempNode = null">Cancel</b-button>
        <b-button @click="save" variant="success">Save</b-button>

        <hr>
        <div v-if="currentNode.reverse != undefined">
          <b-button size="sm" v-b-toggle.collapse-backlinks variant="light">Backlinks</b-button>
          <b-collapse id="collapse-backlinks" class="mt-2">

            <div v-for="(p, j) in Object.keys(currentNode.reverse)" :key="j">
              <PropertieView :p="p" :v="currentNode.reverse[p]"/>
            </div>
          </b-collapse>
        </div>

        <b-button @click="remove" variant="danger">Remove this node</b-button>


      </b-collapse>

    </b-container>
  </div>
</template>

<script>

export default {
  name: "NodeEdition",
  components: {
    'PropertieView': ()=>import('@/views/PropertieView'),
  },
  data(){
    return {
      tempNode: null,
      graphProps: ['__threeObj', '__obj__','index', 'x', 'y', 'z', 'vx', 'vy', 'vz'],
      jsonldProps: ['@context', 'id']
    }
  },

  methods:{
    async save(){
      console.log(this.tempNode)
      await this.$store.dispatch('core/saveNode', this.tempNode)
      await this.$store.dispatch('core/getNodes') // pose problème de rafraichissement, certainement car on a enlevé __ob & __threeObj
      this.$store.commit('core/setCurrentNode', null)
    },
    async remove(){
      if (confirm('Are you sure you want to remove this node?')) {
        // Save it!
        console.log('ok to remove.', this.tempNode);
        await this.$store.dispatch('core/removeNode', this.tempNode)
        this.$store.commit('core/setCurrentNode', null)
      }
    }


  },
  watch:{
    currentNode(){
      this.tempNode = this.currentNode
      console.log(this.tempNode)
    }
  },
  computed: {
    currentNode() {
      return this.$store.state.core.currentNode
    },
    graph() {
      return this.$store.state.core.graph
    },
  },


}
</script>

<style scoped>

</style>
