<template>
  <b-modal id="modal-save" title="Save Brain" size="lg">
    <b-button @click="saveBrainToSolid">to Solid Pod</b-button>

    <b-button @click="saveNodesToIpfs" :disabled="ipfsNode == null ? true : false">to IPFS</b-button>
    <b-button @click="saveBrainToFile" disabled>to File</b-button>
    <b-button @click="saveBrainToGun" >to GunDb</b-button>
    <b-button @click="saveBrainToMatrixCrdt" disabled>to Matrix-Crdt</b-button>



    ipfs_cids:

    <div v-if="ipfs_cids.length > 0" >
      <b-button  @click="save_cids">Save Cids</b-button>
      <b-button @click="pinit">Pin it</b-button>
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
</template>

<script>
export default {
  name: "SaveBrain",
  methods:{
    pinit(){
      console.log(this.ipfs_cids)
    },
    save_cids(){
      console.log(this.ipfs_cids)
      this.download(JSON.stringify(this.ipfs_cids), 'ipfs_cids_'+Date.now()+'.json', 'application/json');
    },
    saveBrainToSolid(){
      this.$saveBrainToSolid()
    },
    saveNodesToIpfs(){
      console.log("save")
      this.$saveNodesToIpfs()
    },
    saveBrainToGun(){
      console.log("save")
      // console.log(this.$gun)

    // this.$gun.get('pin').once((node) => { // Retrieve the text value on startup
    //   console.log(node)
    // })
      this.$saveBrainToGun(this.$gun)
    },
    saveBrainToMatrixCrdt(){
      console.log("save")
    },
    saveBrainToFile(){
      console.log(this.ipfs_cids)
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

</style>
