<template>
  <b-navbar id="navbar" toggleable="lg" type="dark" variant="info">
    <!-- <b-navbar-brand href="#">NavBar</b-navbar-brand> -->

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
<SpinnerComp />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item @click="showBrainLoader">brains</b-nav-item>
        <b-nav-item @click="saveBrain">save</b-nav-item>

        <ShareBrain style="float:left"/>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown text="graph" right>
          <b-dropdown-item @click="clear">clear</b-dropdown-item>
          <b-dropdown-item disabled>Reset camera</b-dropdown-item>
          <b-dropdown-item @click="show_node_name = !show_node_name" disabled>show node name {{ show_node_name}}</b-dropdown-item>
          <b-dropdown-item @click="show_link_label = !show_link_label" disabled>show link label {{show_link_label}}</b-dropdown-item>
      </b-nav-item-dropdown>

<SolidLogin />
</b-navbar-nav>
</b-collapse>

<b-modal id="modal-save" title="Save Brain" size="lg">
      <b-button @click="saveBrainToSolid">to Solid Pod</b-button>

      <b-button @click="saveNodesToIpfs" :disabled="ipfsNode == null ? true : false">to IPFS</b-button>
      <b-button @click="saveBrainToFile" disabled>to File</b-button>
      <b-button @click="saveBrainToGun" disabled>to GunDb</b-button>
      <b-button @click="saveBrainToMatrixCrdt" disabled>to Matrix-Crdt</b-button>

      ipfs_cids:

<div v-if="ipfs_cids.length > 0" >
<b-button  @click="save_cids">Save Cids</b-button>
</div>
<ul>
<li v-for="c of ipfs_cids" :key="c.cid">
<a :href="'https://ipfs.io/ipfs/'+c.cid" target="_blank">{{c.name}}</a>
</li>
</ul>
{{ipfs_cids}}
<hr>
  ipfsNode : {{ipfsNode}}
  </b-modal>

</b-navbar>
</template>

<script>


export default {
  name: "NavBar",
  components: {
    'SolidLogin': ()=>import('@/components/SolidLogin'),
    'SpinnerComp': ()=>import('@/components/SpinnerComp'),
      'ShareBrain' : ()=> import('@/components/ShareBrain.vue')
    },
  data(){
    return{
      show_node_name: true,
      show_link_label: true
    }
  },
  methods:{
    save_cids(){
      console.log(this.ipfs_cids)
      this.download(JSON.stringify(this.ipfs_cids), 'ipfs_cids_'+Date.now()+'.json', 'application/json');
    },
    download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    },
    saveNodesToIpfs(){
        console.log("save")
        this.$saveNodesToIpfs()
    },
    saveBrainToGun(){
        console.log("save")
    },
    saveBrainToMatrixCrdt(){
        console.log("save")
    },
    // newNeurone(){
    //   this.$store.dispatch('core/newNode')
    // },
    saveBrain(){
        this.$bvModal.show('modal-save')
    },
    saveBrainToSolid(){
      this.$saveBrainToSolid()
    },
    showBrainLoader(){
      this.$store.commit('core/setShowBrainLoader', true)
    },
    saveBrainToFile(){
      console.log(this.ipfs_cids)
    },
    // newAutomerge(){
    //   this.$store.dispatch('automerge/newDoc')
    // },
    // addItem(){
    //   let text = "blah"
    //   this.$store.dispatch('automerge/addItem', text)
    // },
    clear(){
      if (confirm('Are you sure you want to remove all nodes?')) {
        this.$store.dispatch('core/removeAllNodes')
        // let div1 = document.querySelectorAll(".node-label")
        // let css2dRenderer = div1[0].parentNode
        // console.log(div1[0].parentNode)
        // // console.log(div1)
        // div1.forEach((n) => {
        //   css2dRenderer.removeChild(n)
        // });

        this.$store.commit('core/setCurrentNode', null)
      }
    },
  },
  computed: {
    ipfsNode() {
      return this.$store.state.core.ipfsNode
    },
    ipfs_cids() {
      return this.$store.state.core.ipfs_cids
    },
  }
}
</script>

<style>
#navbarTest{
  z-index: 1000;
  position: absolute;
  left: 0px;
  width: 100%;
  top: 0px;
}
</style>
