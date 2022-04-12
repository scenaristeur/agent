<template>
  <div>
    <vue-fab
    :mainBtnColor="mainBtnColor">
    <fab-item
    v-for="(item, idx) in menu"
    :key="idx"
    :idx="idx"
    :title="item.title"
    :color="item.color"
    :icon="item.icon"
    @clickItem="clickItem" />
  </vue-fab>
  <!-- <UploadFile ref="uploadfile" /> -->
  <input type="file" ref="uploader" style="display: none"  multiple="multiple" @change="inputChanged">
</div>
</template>

<script>
export default {
  name: "FabMenu",
  components: {
    // 'UploadFile': ()=>import('@/views/UploadFile'),
  },
  data(){
    return {
      files: [],
      menu: [
        {
          icon: 'psychology',
          title: 'Add a neurone',
          color: '#9900ff'
        },
        {
          icon: 'add_photo_alternate',
          title: 'Add a media',
          color: '#ff9900'
        },
        {
          icon: 'toc',
          title: 'External source',
          color: '#ff0099'
        },
        {
          icon: 'terminal',
          title: 'Terminal',
          color: '#999999'
        }
      ],
      mainBtnColor: '#3eaf7c'
    }
  },
  methods:{
    clickItem: function (item) {
      switch (item.idx) {
        case 0:
        this.$store.dispatch('core/newNode')
        break;
        case 1:
        this.$refs.uploader.click()
        break;
        case 2:
        this.$bvModal.show("modal-external-source")
        break;
        case 3:
        this.$store.commit('core/toggleTerminal')
        break;
        default:
        window.alert(item.idx)
      }
    },
    async processFiles(){
      console.log(this.files)
      let app = this
      const filePromises = Array.from(this.files).map(async function(f) {
        console.log(f)
        // Return a promise per file
        app.$spinnerAdd({id: "loading "+f.name})
        return new Promise( function(resolve, reject) {
          const reader = new FileReader();
          reader.readAsDataURL(f);
          reader.onload = async function () {
            //let base64 = reader.result
            f.base64 = await reader.result
            console.log(f)
            let node = await app.$newNode(f)
            //  console.log(reader.result);//base64encoded string

            await app.$store.dispatch('core/saveNode', node)
            app.$spinnerRemove({id: "loading "+f.name})

            resolve(node)
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
            reject(error)
          };
        });
      });

      // Wait for all promises to be resolved
      let medias =   await Promise.all(filePromises);
      console.log(medias)
      this.files = []
      await this.$store.dispatch('core/getNodes')
      console.log(medias[0].id)
      let id = medias[0].id

      let n = await this.$store.state.core.nodes.find(n => n.id == id)
            this.$store.commit ('core/setCurrentNode', n)


// let node = await this.$store.state.core.graph.graphData().nodes.find(n => n.id == id)
// console.log(n, node)
//       const distance = 40;
//       let pos = {x: distance, y: distance, z: distance}
//       // if(node.x != 0 && node.y != 0 && node.z != 0){
//       //   console.log(pos, node.x, node.y, node.z)
//       //   const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
//       //   console.log(distRatio)
//       //   pos = { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
//       //   console.log(pos)
//       // }
//       console.log(pos)
//       this.$store.state.core.graph.cameraPosition(
//         pos, // new position
//         node, // lookAt ({ x, y, z })
//         3000  // ms transition duration
//       );
      // console.log(store.state.core.graph)
      //  let n = store.state.core.nodes.find(n => n.id == node.id)





      // console.log(n)
      // this.$store.commit('core/setCurrentNode', n)
      // console.log(this.$store.state.core.graph)//.onNodeClick(n)
      //  this.$store.state.core.graph.zoomToFit(0,10,n => n.id = id)


    },
    inputChanged(){
      // console.log(e)
      // console.log(this.$refs.uploader)
      this.files = this.$refs.uploader.files
    }
  },
  watch:{
    files(){
      if (this.files.length > 0){
        this.processFiles()
      }
    }
  },






}
</script>

<style>

</style>
