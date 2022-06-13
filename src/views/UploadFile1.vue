<template>
  <b-form-file ref="uploader" multiple v-model="files" size="sm">
    <!-- <template slot="file-name" slot-scope="{ names }">
      <b-badge variant="dark">{{ names[0] }}</b-badge>
      <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
        + {{ names.length - 1 }} More files
      </b-badge>
    </template> -->
  </b-form-file>
  <!-- <div>

      <file-select v-model="files"></file-select>

   <p v-if="files">{{files}}</p>
 </div> -->
</template>

<script>
export default {
  name: "UploadFile",
  // components: {
  //   'FileSelect': ()=>import('@/components/FileSelect'),
  // },
  data(){
    return{
      files: []
    }
  },
  methods:{
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
