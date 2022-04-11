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
  <input type="file" ref="uploader" style="display: none">
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
        default:
        window.alert(item.idx)
      }
      },
    async processFiles(){
      console.log(this.files)
      let app = this
      const filePromises = this.files.map(async function(f) {
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
    },
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
