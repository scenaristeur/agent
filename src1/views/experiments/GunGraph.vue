<template>
  <div>
    <b-button v-b-modal.modal-gun-graph>New Gundb Graph</b-button>
    <b-button @click="saveBrainToGun" >to GunDb</b-button>
    <b-modal id="modal-gun-graph" title="Gun Graph" size="lg">
      <p class="my-4">Create and share a Gun Graph!</p>

      <!-- <b-button @click="explore">Explore</b-button> -->
      <!-- <b-button @click="create">create Brain</b-button> -->
      <b-input placeholder="rootNode (default: brains)" v-model="rootNode" />
      <b-button @click="updateRootNode">updateRootNode</b-button>
      <b-input-group>
        <b-input placeholder="brain name" v-model="brain.name" />
        <b-button @click="clear" variant="outline-danger">X</b-button>
      </b-input-group>

      <b-button @click="createBrain">create Brain</b-button>
      <b-row>
        <b-col lg="5" class="my-1">
          <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          >
          <b-input-group size="sm">
            <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
        label="Per page"
        label-for="per-page-select"
        label-cols-sm="6"
        label-cols-md="4"
        label-cols-lg="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
        >
        <b-form-select
        id="per-page-select"
        v-model="perPage"
        :options="pageOptions"
        size="sm"
        ></b-form-select>
      </b-form-group>
    </b-col>

    <b-col sm="7" md="6" class="my-1">
      <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="fill"
      size="sm"
      class="my-0"
      ></b-pagination>
    </b-col>
  </b-row>

  <b-table striped hover :items="gunBrains"
  :fields="fields"
  :sort-by.sync="sortBy"
  :sort-desc.sync="sortDesc"
  responsive="sm"
  :current-page="currentPage"
  :per-page="perPage"
  :filter="filter"
  :filter-included-fields="filterOn"
  stacked="md"
  show-empty
  small
  @filtered="onFiltered"
  selectable
  @row-selected="onRowSelected"
  select-mode="single"
  ></b-table>

  <b-button @click="gunSearch">Gun Search</b-button>

</b-modal>
</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  name: "GunGraph",
  data(){
    return{

      brain: {type: "brain", source_type: "gundb", nodes: {}, edges: {}},
      sortBy: 'created',
      sortDesc: true,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      filter: null,
      filterOn: [],
      fields: [
        { key: 'name', sortable: true },
        { key: 'creator', sortable: true },
        { key: 'created', sortable: true },
        { key: 'id', sortable: false }
      ],
    }
  },
  created(){


  },

  methods:{
    saveBrainToGun(){
      console.log("save")
      this.$saveBrainToGun()
    },
    onRowSelected(row){
      let obj = row[0]
      console.log(obj)
      this.$store.commit('core/setBrain', obj)
      this.$bvModal.hide('modal-gun-graph')
    },
    updateRootNode(){
      this.$store.commit('gun/setRootNode', this.rootNode)
    },
    // async explore(){
    //   let gunNodes = await this.$gunExplore('brains')
    //   console.log("gunNodes", gunNodes)
    // },
    // async create(){
    //   let brain = await this.$createBrain({name: "test", type: "machin"})
    //   console.log("created", brain)
    // },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    gunSearch(){
      this.$gunSearch()
    },
    async createBrain(){
    //  let path = 'brains'
      console.log(this.brain)
      this.brain.id = uuidv4()
      this.brain.created = Date.now()
      this.brain.creator = "Spoggy"
      this.brain[".pretty_prop"] = "boop"
      await this.$gunSet(this.brain)
      //this.brain.name = ""
      //this.clear()
    },
    clear(){
      this.brain.name = ""
    }
  },
  watch:{
    gunBrains() {
      console.log(this.gunBrains)
      // Set the initial number of items
      this.totalRows = this.gunBrains.length
      this.clear()
    },
  },
  computed: {
    gunBrains() {
      return this.$store.state.gun.gunBrains
    },
    rootNode() {
      // // getter
      // get() {
        return this.$store.state.gun.rootNode
      // },
      // // setter
      // set(newRootNode) {
      //   this.$store.commit('gun/setRootNode', newRootNode)
      // }
    }
  }
}
</script>

<style>

</style>
