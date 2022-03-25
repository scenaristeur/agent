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
          <!-- <div v-if="jsonldProps.includes(p)">

        </div>
        <div v-else-if="graphProps.includes(p)">

      </div> -->
      <div v-if="!jsonldProps.includes(p) && !graphProps.includes(p) && p != 'reverse'">


        <div v-if="typeof currentNode[p] == 'object'">

          <b> {{p}}</b> :
          <div v-if="Array.isArray(currentNode[p])">
            <ul>
              <li v-for="(v, i) in currentNode[p]" :key="i">
                <!-- {{i}} : {{v}} -->
                <b-button size="sm" @click="switchTo(v.id)" variant="outline-primary">{{v.name || v.id}}</b-button>
              </li>
            </ul>

          </div>
          <div v-else>

            <b-button v-if="currentNode[p].id != undefined" size="sm" @click="switchTo(currentNode[p].id)" variant="outline-primary">{{currentNode[p].name || currentNode[p].id}}</b-button>
            <div v-else>
              {{currentNode[p]}}
            </div>
          </div>

        </div>
        <div v-else>
          <b> {{p}}</b> ({{ typeof currentNode[p]}}) :
          {{currentNode[p]}}
        </div>

        <!-- <b-button @click="addValue(p)" variant="outline-primary" size="sm">+</b-button> -->
      </div>


    </div>


    <b-button @click="tempNode = null">Cancel</b-button>
    <b-button @click="save" variant="primary">Save</b-button>

    <div v-if="currentNode.reverse != undefined">
      <b>BackLinks:</b>   {{currentNode.reverse}}
    </div>




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

  methods:{
    async save(){
      console.log(this.tempNode)
      await this.$store.dispatch('core/saveNode', this.tempNode)
      await this.$store.dispatch('core/getNodes') // pose problème de rafraichissement, certainement car on a enlevé __ob & __threeObj
      this.$store.commit('core/setCurrentNode', null)
    },
    switchTo(id){
      this.$store.dispatch('core/switchTo',id)
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
    },
  },


}
</script>

<style scoped>

</style>
