<template>
  <b-card>
    <div>
      <b-button-toolbar key-nav aria-label="Toolbar with button groups">
        <b-button-group class="mx-1">
          <LocalConnector />
        </b-button-group>

        <b-input-group size="sm">
          <b-form-input v:model="currentPath" class="text-right mt-1"></b-form-input>
          <b-button :disabled="pod == null" size="sm" variant="primary" @click="saveBrainToSolid" title="Save to Solid pod"><b-icon-cloud-upload></b-icon-cloud-upload></b-button>
        </b-input-group>
<!-- 
        <b-button-group class="mx-1">



          <b-button>Edit</b-button>
          <b-button>Undo</b-button>
          <b-button>Redo</b-button>
        </b-button-group>
        <b-button-group class="mx-1">
          <b-button>&rsaquo;</b-button>
          <b-button>&raquo;</b-button>
        </b-button-group> -->
      </b-button-toolbar>
    </div>
<!-- brains : {{ brains }} -->
    <!-- <b-button :disabled="pod == null" size="sm" variant="primary" >Save to Solid pod</b-button> -->
    <!-- <small><i>podbrowser</i></small>
    {{pod}} -->

  </b-card>
</template>

<script>
export default {
  name: "PodBrowser",
  components: {
    // 'ToolbarView': ()=>import('@/views/ToolbarView'),
    'LocalConnector': ()=>import('@/views/connectors/LocalConnector'),
  },
  data(){
    return{
      // currentPath: ""
    }
  },
  methods:{
    saveBrainToSolid(){
      this.$saveBrainToSolid()
    },
  },
  watch:{
    // pod(){
    //   console.log("pod",this.pod)
    //   this.currentPath = this.pod != null ? this.pod.brains : ""
    // }
  },
  computed: {
    brains(){
      return this.$store.state.core.brains
    },
    pod(){
      return this.$store.state.solid.pod
    }
  }
}
</script>

<style>

</style>
