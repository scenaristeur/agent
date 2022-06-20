<template>
  <div>
    <b-button @click="download" variant="primary">
      <b-icon-file-arrow-down></b-icon-file-arrow-down>
    </b-button>
    <b-button @click="openFileUpload()" variant="primary">
      <b-icon-file-arrow-up></b-icon-file-arrow-up>
    </b-button>
    <input ref="fileUpload" type="file" multiple hidden @change="loadFiles" />
  </div>
</template>

<script>
import { LocalConnector } from "./connector/local.js"
export default {
  name: "LocalConnectorConnector",
  data(){
    return {
      connector : new LocalConnector(/*options*/)
    }
  },
  mounted(){
    console.log(this.connector)
  },
  methods: {
    async loadFiles(event){
      const files = event.target.files
      for(const file of files) {
        this.connector.upload(file, this.processFile)
      }
    },
    async processFile(f){
      console.log(f)
      console.log(f.name)
      let g = JSON.parse(f)
      console.log()
      for await (let n of g.nodes){
        console.log(n)
        await this.$newNode(n)
        //await context.dispatch('saveNode', n)
        await this.$store.dispatch('core/saveNode',n)
        //this.$soukai_create(n)
      }
      //
      // for(let l of g.links){
      //   this.$addLink(l)
      //   //this.$soukai_create(n)
      // }
      console.log("end")
      await this.$store.dispatch('core/getNodes')

    },
    openFileUpload(){
      this.$refs.fileUpload.click()
    },
    download(){
      //https://github.com/scenaristeur/ipgs/blob/4436a12ccdb2b3de9c02a34fc2a699ccf9c68bf2/src/components/network/ExportModal.vue
      console.log("download"/*,  this.$store.state.soukai.neurones*/)
      let graphData = {format: "json",
      content: {
        nodes: this.$store.state.core.nodes,
        links: this.$store.state.core.links,
        //  neurones: this.$store.state.soukai.neurones
      }}
      this.connector.downloadFile(graphData)
    },
    // upload(){
    //   //https://github.com/scenaristeur/ipgs/blob/4436a12ccdb2b3de9c02a34fc2a699ccf9c68bf2/src/components/network/ImportModal.vue
    //   console.log("upload")
    // }
  }
}
</script>

<style>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: 'Uplaod a brain';
}
</style>
